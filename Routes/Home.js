const express = require('express')
const mongoose = require('mongoose')
const mongo = require('../config/DbConnection')
const passport = require('passport')
const emailExistant = require('kickbox').client('live_dd2afe28968ef087490c621a18c2d5bc89a2336538fa8af041af4845f0fbc94a').kickbox();
require('../config/checkpass')
const {validationResult} = require('express-validator')
const app = express.Router()
const validateUser = require('../config/validate')
const userModel = new mongoose.model('User', mongo);



app.get('/', (req, res) => {
    res.render('home.hbs', {layout: "mainHome.hbs", message: req.flash('error')})
})

app.get('/contactus', (req, res) => {

       res.render('contactus')
    
})
app.post('/contactus',[validateUser], async(req, res) => {
    const userDatas = {
        FirstName: req.body.firstname,
        LastName: req.body.lastname,
        Email: req.body.email,
        Phone: req.body.phone,
        Change: req.body.change,
        Message: req.body.message1
    }
    const data = new userModel(userDatas);
    const checkuser = await userModel.findOne({'Email': req.body.email, 'Phone': req.body.phone}, async(err, res) => {
        if(err){
            console.log(err) 
        }else{
            console.log(res)
            return res;
        }
    })
    emailExistant.verify( req.body.email, {timeout: 600 },function (err, response) {
            const emailstatus = response.body.reason
            const emaildeliverable = response.body.result
            if(err){
                console.log(err)
            }else{
                // console.log(response)
                // console.log(emailstatus)
                // console.log(emaildeliverable);
                if(emailstatus === 'accepted_email' && emaildeliverable === 'deliverable') {
                    if(!checkuser){
                        data.save((err, datas) => {
                            if(err) {
                                console.log(err);
                            }else{
                                req.session.success = true;
                                req.session.errors = false
                                res.redirect('/')
                            }
                        })
                    }else{
                        const useralredyexist = "User Already exist...!";
                        res.render('contactus', {userError: useralredyexist})
                    }
                }else{
                    const emailinvalid = "Email Does not exists / Try using Gmail...!"
                   res.render('contactus', {email: emailinvalid}) 
                }
            }
            
            
        });
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/messages',
    failureRedirect: '/#login',
    failureFlash: true
}))
app.get('/about', (req, res) => {
    console.log(req.body)
    res.render('about', {layout: "mainHome.hbs"})
})

app.get('/services', (req, res) => {
    res.render('services', {layout: 'mainHome'})
})

app.get('/messages', (req, res) => {
    res.render('message', {layout: 'mainHome'})
})

module.exports = app;