const mongoose = require('mongoose');
const crypto = require('crypto');

var userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	username: String,
	permissions: String,
	address: String,
	passwordHash: String,
	salt: String,
	firstname: String,
	lastname: String
}, { collection: 'userlist' });

userSchema.virtual('password')
.set(function (password) {
	this._plainPassword = password;
	if (password) {
		this.salt = crypto.randomBytes(128).toString('base64');
		this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
	} else {
		this.salt = undefined;
		this.passwordHash = undefined;
	}
})

.get(function () {
	return this._plainPassword;
});

userSchema.methods.checkPassword = function (password) {
	if (!password) return false;
	if (!this.passwordHash) return false;
	return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};

var User = mongoose.model('User', userSchema);

module.exports = User;