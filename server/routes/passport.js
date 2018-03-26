const passport = require('passport');
const User = require("./user");
const jwtsecret = "mysecretkey"; // ключ для подписи JWT
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT

passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	session: false
	},
	function (username, password, done) {
	User.findOne({username}, (err, user) => {
		if (err) {
			return done(err);
		}

		if (!user || !user.checkPassword(password)) {
			return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
		}
		return done(null, user);
	});
}));

// Ждем JWT в Header

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: jwtsecret
};

passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
	User.findById(payload.id, (err, user) => {
		if (err) {
			return done(err)
		}
		if (user) {
			done(null, user)
		} else {
			done(null, false)
		}
	})
}));

module.exports = passport;