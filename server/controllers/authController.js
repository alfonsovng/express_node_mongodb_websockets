const debug = require('debug')('server:controllers:authController');

const bcrypt = require('bcryptjs');
const passport = require('passport');
const Usuari = require('../models/usuariModel');

const AuthController = {
    get_login:(req, res, next)=>{
        res.render('auth/login')
    },
    get_register:(req, res, next)=>{
        res.render('auth/register')
    },
    post_register:(req, res, next)=>{
        const { nom, email, contrasenya, contrasenya2 } = req.body;
        let errors = [];

        if (!nom || !email || !contrasenya || !contrasenya2) {
            errors.push({ msg: 'Please enter all fields' });
        }

        if (contrasenya != contrasenya2) {
            errors.push({ msg: 'Passwords do not match' });
        }

        if (contrasenya.length < 6) {
            errors.push({ msg: 'Password must be at least 6 characters' });
        }

        if (errors.length > 0) {
            res.render('register', {
            errors,
            nom,
            email,
            contrasenya,
            contrasenya2
            });
        } else {
            Usuari.findOne({ email: email }).then(usuari => {
            if (usuari) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                errors,
                nom,
                email,
                contrasenya,
                contrasenya2
                });
            } else {
                const newUser = new Usuari({
                nom: nom,
                cognoms: "cognoms random",
                data_naixement: new Date(),
                email: email,
                contrasenya: contrasenya,
                idiomes: ['ca']
                });

                bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.contrasenya, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.contrasenya = hash;
                    newUser
                    .save()
                    .then(user => {
                        req.flash(
                        'success_msg',
                        'You are now registered and can log in'
                        );
                        res.redirect('/auth/login');
                    })
                    .catch(err => console.log(err));
                });
                });
            }
            });
        }
    },
    post_login:(req, res, next)=>{
        debug("post_login")
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true
          })(req, res, next);
    },
    logout:(req, res, next)=>{
        req.logout();
        req.flash('success_msg', 'You are logged out');
        res.redirect('/auth/login');
    }
}

module.exports = AuthController;