const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.load();
const uri = process.env.URI;
const User = require("./user");
const Poll = require("./poll");
const jwtsecret = "mysecretkey"; // ключ для подписи JWT
const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp
const passport = require('./passport');
const lib = require('./lib');

const web3API = require('web3');

//const web3 = new web3API(new web3API.providers.HttpProvider('http://localhost:8008'));

//web3.eth.defaultAccount = web3.eth.accounts[0];

//pollAbi = web3.eth.contract(lib.poll.abi);

//accountAbi = web3.eth.contract(lib.account.abi);
const web3 = null;
mongoose.connect(uri, function(err) {
	if (err) throw err;

	/*var newUser = new User({
		_id: new mongoose.Types.ObjectId(),
		username: "admin",
		password: "admin101",
		permissions: "admin",
		firstname: "Administrator",
		lastname: "Blockchain"
	})

	newUser.save(function(err) {
		if (err) throw err;

		console.log('New user saved.');
	})*/

	// Authenticate User
	router.post("/authenticate", async(request, response) => {
		await passport.authenticate('local', function (err, user) {
			if (user == false) {
				response.send({ error: 'Invalid password or username' });
			} else {
				//--payload - информация которую мы храним в токене и можем из него получать
				const payload = {
					id: user._id,
					username: user.username,
					permissions: user.permissions
				};
				const token = jwt.sign(payload, jwtsecret); //здесь создается JWT
				response.send({user: user.username, token: token});
			}
		})(request, response);
	});

	// Get Users list
	router.get("/users", async(request, response) => {
		await passport.authenticate('jwt', (err, user) => {
			if (user && user.permissions === "admin") {
				User.find({permissions: "user"}, (err, users) => {
					if (err) throw err;

					response.send(users);
				})
			} else {
				response.status(500).send({ error: "You don't have permissions for this action" });
			}
		})(request, response)
	});

	// Check User's token
	router.get("/checkUser", async(request, response) => {
		await passport.authenticate('jwt', (err, user) => {
			if (err) throw err;

			if (user) {
				response.send({ exists: true });
			} else {
				response.send({ exists: false });
			}
		})(request, response)
	});

	// Get User's notifications
	// TODO

	// Create User
	router.put("/createUser", async(request, response) => {
		await passport.authenticate('jwt', (err, user) => {
			if (user && user.permissions === "admin") {
				if (!request.body.username || !request.body.password) {
					response.status(500).send({ error: "Имя пользователя или пароль не заполнены." });
				} else {
					checkIfUserExists(request.body.username).then(() => {
						const contract = accountAbi.new({
							from: web3.eth.accounts[0],
							data: lib.account.data,
							gas: '4700000'
						}, function (e, contract) {
							if (e) {
								throw e;
							}
							if (typeof contract.address !== 'undefined') {
								console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
								console.log(contract.address);
								var newUser = new User({
									_id: new mongoose.Types.ObjectId(),
									username: request.body.username,
									password: request.body.password,
									firstname: request.body.firstname,
									lastname: request.body.lastname,
									address: contract.address,
									permissions: "user"
								})
								newUser.save(function(err) {
									if (err) throw err;

									console.log('New user ', request.body.username, ' saved.');
									response.send();
								})
							}
						});
					}, (err) => {
						response.status(500).send({ error: "Пользователь с таким именем существует"});
					});
				}
			} else {
				response.status(500).send({ error: "You don't have permissions for this action" });
			}
		})(request, response)
	});

	// Get Polls list
	router.get("/polls", (request, response) => {
		Poll.find({status: "active"}, (err, polls) => {
			if (err) throw err;

			response.send(polls);
		});
	});

	// Get Bch Poll
	router.ws("/poll", (ws, request) => {
		Poll.findOne({name: request.query.name}, (err, poll) => {
			if (err) throw err;
			console.log('here we go address: ', poll.name, poll.address, request.query.name);
			const contract = pollAbi.at(poll.address);
			const answers = [];
			const count = contract.getAnswersCount();
			console.log('count', count);
			for (let i = 0; i < count; i++) {
				let obj = contract.getCounts(i);
				console.log(i, ': ', obj);
				answers.push(obj);
			}
			const sendpoll = {
				address: poll.address,
				answers: answers
			}
			ws.send(JSON.stringify(sendpoll));
			contract.Voted((err, result) => {
				console.log('event triggered for poll:', poll.name);
				if (result.args.result === "success") {
					const index = answers.findIndex(answer => answer[0] === result.args.answer);
					let obj = contract.getCounts(index);
					console.log('voted by ', result.args._from, ': ', obj[0]);
					const sendpoll = {
						count: obj[1],
						index: index
					}
					ws.send(JSON.stringify(sendpoll), (err) => {
						console.log('error while sending');
					});
				}
			})
		})
	});

	router.post("/vote", async(request, response) => {
		await passport.authenticate('jwt', (err, user) => {
			Poll.findOne({name: request.body.name}, (err, poll) => {
				if (err) throw err;

				if (poll) {
					const userContract = accountAbi.at(user.address);
					userContract.vote(poll.address, request.body.answer.answer);
					console.log('voting ' , request.body.name, ' answer ', request.body.answer.answer);
					userContract.UserVoted((err, result) => {
						console.log('event triggered vote by user: ', userContract.address);
						response.send();
					})
				} else {
					response.status(400).send();
				}
			})
		})(request, response)
	});

	// Create Poll
	router.put("/createPoll", async(request, response) => {
		await passport.authenticate('jwt', (err, user) => {
			if (user && user.permissions === "admin") {
				if (!request.body.name) {
					response.status(500).send({ error: "Name and address of poll are required." });
				} else {
					const contract = pollAbi.new(
						request.body.name,
						{
							from: web3.eth.accounts[0],
							data: lib.poll.data,
							gas: '4700000'
						}, function (e, contract) {
							if (e) {
								throw e;
							}
							if (typeof contract.address !== 'undefined') {
								console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
								console.log(contract.address);
								request.body.answers.forEach((ans) => {
									contract.addAnswer(ans);
									console.log('Answer added: ', ans);
								});
								var newPoll = new Poll({
									_id: new mongoose.Types.ObjectId(),
									name: request.body.name,
									address: contract.address,
									status: "active",
									startDate: new Date()
								})
								newPoll.save(function(err) {
									if (err) throw err;

									console.log('New poll ', request.body.name, ' saved.');
									response.send();
								})
							}
						}
					);
				}
			} else {
				response.status(500).send({ error: "You don't have permissions for this action" });
			}
		})(request, response)
	});

	// Change user's password
	router.put("/changePassword", async(request, response) => {
		await passport.authenticate('jwt', (err, user) => {
			if (user && user.permissions === "admin") {
				if (!request.body.username || !request.body.password) {
					throw "Empty username or/and password";
				}
				User.findOne({username: request.body.username}, (err, user) => {
					if (user) {
						user.password = request.body.password;
						user.save();
						console.log("Password of ", request.body.username, " was changed.")
						response.send();
					} else {
						response.status(500).send({ error: "No such user"});
					}
				})
			} else {
				response.status(500).send({ error: "You don't have permissions for this action" });
			}
		})(request, response)
	});

	// Remove User
	router.delete("/deleteUser", async(request, response) => {
		await passport.authenticate('jwt', (err, user) => {
			if (user && user.permissions === "admin") {
				User.remove({username: request.query.username}, (err) => {
					if (err) throw err;
					console.log('User ', request.query.username, ' removed.')
					response.send();
				})
			} else {
				response.status(500).send({ error: "You don't have permissions for this action" });
			}
		})(request, response)
	});
});

function checkIfUserExists(username) {
	var exists = new Promise((resolve, reject) => {
		User.find({ username: username}, (err, users) => {
			if (err) throw err;

			users.length ? reject() : resolve();
		});
	});

	return exists;
}

module.exports = router;