const express = require('express');
const controller = require('../db/controllers/controller');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.post('/login', (req, res) => {
    let { email, pass } = req.body;
    let errors = [];

    controller.checkPassword(email, pass)
        .then(exists => {
            if (exists.code === 200) {
                res.send('Successful login');
            }
            else if (exists.code === 400){
                errors.push("The password is incorrect");
                res.render('login.ejs',{ errors });
            }
            else {
                errors.push("This email is not registered. Please sign up");
                res.render('login.ejs', { errors });
            }
        })
        .catch(err => {
            console.log(err);
            errors.push("Internal server error. Please try at a later time");
            res.render('login.ejs', { errors });
        });
});

router.get('/sample', (req, res) => {

});

router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

router.post('/signup', (req, res) => {
    let { name, email, pass, pass2 } = req.body;
    let errors = [];

    if (pass !== pass2) {
        errors.push("Passwords do not match");
        res.render('signup.ejs', { errors });
    }
    else {
        controller.createUser(name, email, pass)
            .then(result => {
                res.send("Successfully created " + JSON.stringify(result));
            })
            .catch(err => {
                res.send(err);
            });
    }
})

router.get('/contact', (req, res) => {

});

module.exports = router;