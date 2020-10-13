const express = require('express')

const app = express.Router()


app.get('/', (req, res) => {
    res.render('Home', {layout: "MainHome"})
})

module.exports = app;