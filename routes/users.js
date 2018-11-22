var express = require('express');
var router = express.Router();
var users = require('../utls/baza');
const uuid = require('uuid/v1');
const crypt = require('../utls/crypto');
//const passport = require('passport'),
    //config = require('../config/passport.cred'),
   // sanitizeUser = require('../util/sanitizeUser'),
  //  jwt = require('jsonwebtoken');




router.get('/register', function(req, res, next) {
    res.render('register', { title: 'register', taskic: '' });

    console.log(crypt.decrypt(crypt.encrypt("nesto")));
});

router.post('/register', function (req, res, next) {
    //let postoji = false;
    let useric = req.body.username;
    let pasic = req.body.password;
    let todoic = [];
    if(users.length === 0) {
        if(pasic === req.body.password2) {
            pasic = crypt.encrypt(pasic);
            console.log("Pass je kriptiran ", pasic);
            users.push({
                user: useric,
                pass: pasic,
                cookieID: '',
                tasks: todoic
            });
            res.redirect('/users/login');
        } else {
            res.redirect('/users/register');
        }
    } else {
       // for(let i=0; i<users.length; i++) {
            if(pasic === req.body.password2) {
                pasic = crypt.encrypt(pasic);
                console.log("Pasic kriptovan ", pasic);
                users.push({
                    user: useric,
                    pass: pasic,
                    cookieID: '',
                    tasks: todoic
                });
                res.redirect('/users/login');
            } else {
                res.redirect('/users/register')
            }
        //}
    }
    //res.render('register', { title: 'Register' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login', taskic: '' });
});


router.post('/login', function (req, res, next) {
    let logovan =  false;
    let paso = req.body.password;
    if(users.length === 0) {
        logovan = false;
        console.log('Niz je prazan');
    }

    else {
        if(req.cookies !== null)
            res.clearCookie('_id');
        for (var i = 0; i < users.length; i++) {
            if (users[i].user === req.body.username) {

                if(users[i].pass === crypt.encrypt(paso)) {
                    logovan = true;
                    console.log("Prosao je password");


                    users[i].cookieID = uuid();
                    res.cookie("_id", users[i].cookieID);

                }

            }
        }

    }
    if(!logovan)
        res.redirect('/users/register');
    else
        res.redirect('/todo');

});

router.post('/logout', function(req,res,next) {
    console.log(req.cookies);

    users.forEach(user => {
        if(user.cookieID === req.cookies.userData)
            user.cookieID === null;
    });
    res.clearCookie('userData').redirect('/users/register');

});






module.exports = router;
