const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const debug = require('debug')('server:config:passport');

// Load User model
const Usuari = require('../models/usuariModel');

module.exports = function(app) {
  passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'contrasenya' }, (email, contrasenya, done) => {
      debug("email: ", email)
      // Match user
      Usuari.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(contrasenya, user.contrasenya, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(usuari, done) {
    done(null, usuari.email);
  });

  passport.deserializeUser(async function(email, done) {
    try {
      const usuari = await Usuari.findOne({email: email}) 
      done(null, usuari);
    } catch (err) {
      done(err, null);
    }
  });

  // Express session
  app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
};
