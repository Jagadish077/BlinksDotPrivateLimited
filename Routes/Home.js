const express = require('express')

const app = express.Router()


app.get('/', (req, res) => {
    res.render('home.hbs', {layout: "mainHome.hbs"})
})

module.exports = app;