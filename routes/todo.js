var express = require('express');
var router = express.Router();
var users = require('../utls/baza');



router.get('/',  (req, res, next) => {
    let usr = users.filter(user => user.cookieID === req.cookies._id);
    console.log(usr[0]);
    res.render('todo', {title: "Get todo", taskic: usr[0].tasks });
});

router.post('/task', function (req, res, next) {

    users.forEach(user => {
        //console.log("Unutar todo: ", req.cookies.userData);
        if (user.cookieID === req.cookies._id) {
            user.tasks.push(req.body.todo);
            console.log("Ovo ti ja ispisujem ", user);
            res.redirect('/todo');

        }

    });


});

module.exports = router;