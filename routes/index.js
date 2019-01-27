const express = require('express');
const Busboy = require('connect-busboy');
const controller = require('../db/controllers/controller');
const multer  = require('multer');
let upload = multer();

const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.name) {
        res.render('dashboard.ejs', { name: req.session.name });
    }
    else {
        res.render('index.ejs');
    }
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.post('/login', (req, res) => {
    if (req.session.name) {
        res.redirect('/');
    }
    else{
        let { email, pass } = req.body;
        let errors = [];
    
        controller.checkPassword(email, pass)
            .then(result => {
                if (result.code === 200) {
                    req.session.name = result.name;
                    req.session.email = email;
                    res.redirect('/');
                }
                else if (result.code === 400) {
                    errors.push("The password is incorrect");
                    res.render('login.ejs', { errors });
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
    }
    
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }
        })
    }
    res.redirect('/');
});

router.get('/create', (req,res) => {
    if (! req.session.name) {
        res.redirect('/');
    }
    else{
        res.render('create-blog.ejs');
    }

});

router.post('/create', upload.single('blogimage'), (req, res)=>{
    let { title,subtitle,content } = req.body;
    let file = req.file;
    let errors = [];

    if ( !title || !subtitle || !content ){
        errors.push("Please fill out all the fields. Image is optional");
        res.render('create-blog.ejs',{ errors })
    }
    else{
        controller.createBlog( title, subtitle, content, req.session.name, file);
        res.send("Blog created successfully");
    }
       
});

router.get('/sample', (req, res) => {

});

router.get('/signup', (req, res) => {
    if (req.session.name) {
        res.render('/');
    }
    else{
        res.render('signup.ejs');
    }
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
});

router.get('/contact', (req, res) => {

});

module.exports = router;