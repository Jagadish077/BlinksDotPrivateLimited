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
        // if(req.session.errors){
        //     res.json(req.session.errors)
        // }
        let erors;
        if(req.session.success){
            JSON.parse(erors)
        }
        // const errorsModified = JSON.stringify(parsed)
        const datas = JSON.stringify(erors)
       res.render('contactus', {errors: datas})
    
})
app.post('/contactus',[validateUser],(req, res) => {
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
            req.session.success = true;
            req.session.errors = false
            res.redirect('/')
        }
    })
        
    
})

app.post('/login', (req, res) => {
    res.render('message', {leyout: "mainHome"})
})
app.get('/about', (req, res) => {
    console.log(req.body)
    res.render('about', {layout: "mainHome.hbs"})
})

app.get('/services', (req, res) => {
    res.render('services', {layout: 'mainHome'})
})

module.exports = app;