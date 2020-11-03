const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const database = require('../config/DbConnection')
const mongoose = require('mongoose')

const model = new mongoose.model('User', database)
passport.use(
    new localStrategy(
        (username, password, done) => {
            model.findOne({ 'Email': username, 'Phone': password }, async(err, result) => {
                if (err) {
                    console.log(err);
                    return done(err)
                }
                if (!result) {
                    console.log("User Not Found")
                    return done(null, false);
                } else {
                    return done(null, result)
                }
            })
        }
    )
)