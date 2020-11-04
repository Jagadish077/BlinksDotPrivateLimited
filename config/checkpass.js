const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const database = require('../config/DbConnection')
const mongoose = require('mongoose')

const model = new mongoose.model('User', database)
passport.use(
    new localStrategy({passReqToCallback: true},
        (req, username, password, done) => {
            model.findOne({ 'Email': username, 'Phone': password }, async(err, result) => {
                if (err) {
                    console.log(err);
                    return done(err)
                }
                if (!result) {
                    console.log("User Not Found")
                    return done(null, false, req.flash('error', "User Not Found...!"));
                } else {
                    return done(null, result)
                }
            })
        }
    )
)