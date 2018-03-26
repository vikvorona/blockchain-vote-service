const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.load();
const uri = process.env.URI;
const User = require("./user");
const jwtsecret = "mysecretkey"; // ключ для подписи JWT
const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp
const passport = require('./passport');

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

	// Create User
	router.put("/createUser", async(request, response) => {
		await passport.authenticate('jwt', (err, user) => {
			if (user && user.permissions === "admin") {
				if (!request.body.username || !request.body.password) {
					response.status(500).send({ error: "Имя пользователя или пароль не заполнены." });
				}
				checkIfUserExists(request.body.username).then(() => {
					var newUser = new User({
						_id: new mongoose.Types.ObjectId(),
						username: request.body.username,
						password: request.body.password,
						firstname: request.body.firstname,
						lastname: request.body.lastname,
						address: request.body.address,
						permissions: "user"
					})
					newUser.save(function(err) {
						if (err) throw err;

						console.log('New user ', request.body.username, ' saved.');
						response.send();
					})
				}, (err) => {
					response.status(500).send({ error: "Пользователь с таким именем существует"});
				});
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
})

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