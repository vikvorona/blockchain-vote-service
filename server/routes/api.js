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
		firstname: "Administrator",
		lastname: "Blockchain"
	})

	newUser.save(function(err) {
		if (err) throw err;

		console.log('New user saved.');
	})*/

	// Not used yet
	router.get("/:user", function (request, response) {
		collection.find({ user : request.params.user }).toArray(function (err, docs) {
			if (err){
				response.send("An error occured")
			}else{
				response.send(docs)
			}
		})
	});

	// Authenticate User
	router.post("/authenticate", async(request, response) => {
		await passport.authenticate('local', function (err, user) {
			if (user == false) {
					response.send({error: 'Invalid password or username'});
			} else {
				//--payload - информация которую мы храним в токене и можем из него получать
				const payload = {
					id: user.id,
					displayName: user.username,
				};
				const token = jwt.sign(payload, jwtsecret); //здесь создается JWT
				response.send({user: user.username, token: 'JWT ' + token});
			}
		})(request, response);
	});

	// Create User
	router.put("/createUser", function (request, response) {
		if (!request.body.username || !request.body.password) {
			throw "Empty username or/and password";
		}
		var newUser = new User({
			_id: new mongoose.Types.ObjectId(),
			username: request.body.username,
			password: request.body.password,
			firstname: request.body.firstname,
			lastname: request.body.lastname
		})
		newUser.save(function(err) {
			if (err) throw err;

			console.log('New user saved.');
		})
	});
})

module.exports = router;