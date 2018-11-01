var express = require('express');
var router = express.Router();


var users = require('../utls/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', taskic: '' });
});


router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login', taskic: '' });
});

router.post('/logout', function(req,res,next) {
    console.log(req.cookies);

    /*delete res.cookie['connect.sid'];
    delete req.cookies['connect.sid'];*/
    req.cookies['connect.sid'] ='';
    res.clearCookie('userData');
    res.redirect('/');
})

router.post('/login', function (req, res, next) {
        let logovan =  false;
        if(users.length === 0) {
          res.redirect('/register');
            console.log('Niz je prazan');
        }
        for (var i = 0; i < users.length; i++) {
            if (users[i].user === req.body.username) {
                console.log("login",users[i]);
                console.log(req.body.username);
                if(users[i].pass === req.body.password) {
                    logovan = true;
                    console.log("Prosao je password");
                    console.log('Users. user ' + users[i].user);
                    res.cookie("userData", users[i].user);
                    users[i].cookieID = users[i].user;
                    console.log("cookie: ",req.cookies);
                    console.log("user",users);
                    res.render('todo', {title: 'todododo', taskic: ''});
                }
            }

        }

        console.log(users);
        if(!logovan)
            res.render('login', {title: 'Login', taskic: ''});

});

router.post('/login/todo', function (req, res, next) {


    users.forEach(user => {
            console.log("Unutar todo: ",req.cookies.userData);
            if(user.cookieID === req.cookies.userData) {
                user.tasks.push(req.body.todo);
                console.log(user);
                res.render('todo', {title: 'To do', taskic: user.tasks});
            }

    });
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'register', taskic: '' });
});

router.post('/register', function (req, res, next) {
    let postoji = false;
    let useric = req.body.username;
    let pasic = req.body.password;
    let todoic = [];
    if(users.length === 0) {
      if(pasic === req.body.password2) {
          users.push({
              user: useric,
              pass: pasic,
              cookieID: '',
              tasks: todoic
          });
          res.redirect('/login');
      } else {
        res.render('error');
      }
    } else {
      for(let i=0; i<users.length; i++) {
          if(pasic === req.body.password2) {
              users.push({
                  user: useric,
                  pass: pasic,
                  cookieID: '',
                  tasks: todoic
              });
              res.redirect('/login');
          } else {
              res.render('error')
          }
      }
    }
    res.render('register', { title: 'Register' });
});




module.exports = router;
