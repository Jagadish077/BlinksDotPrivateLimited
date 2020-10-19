const express = require('express')
const mongoose = require('mongoose')
const mongo = require('../config/DbConnection')
const {validationResult} = require('express-validator')
const app = express.Router()
const validateUser = require('../config/validate')
const userModel = new mongoose.model('User', mongo);
app.get('/', (req, res) => {
    res.render('home.hbs', {layout: "mainHome.hbs"})
})

app.get('/contactus', (req, res) => {
    res.render('contactus', {layout: "mainHome.hbs", title: 'form validation', succes: false, errors: req.session.errors})
})
app.post('/contactus',[validateUser], async(req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()){
            console.log(errors)
            console.log(req.headers);
           res.render('contactus', {layout: "mainHome.hbs"})
        }
        const userDatas = {
            FirstName: req.body.firstname,
            LastName: req.body.lastname,
            Email: req.body.email,
            Phone: req.body.phone,
            Change: req.body.change,
            Message: req.body.message1
        }
        const data = new userModel(userDatas);
        data.save((err, datas) => {
            if(err) {
                console.log(err);
            }else{
                res.redirect('/')
            }
        })
    
})
app.get('/about', (req, res) => {
    console.log(req.body)
    res.render('about', {layout: "mainHome.hbs"})
})

module.exports = app;