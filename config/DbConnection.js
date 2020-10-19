const mongoose = require('mongoose')
const dburi1 = "mongodb+srv://blinksdot:Qwerty@123@cluster0.ywuad.mongodb.net/UserData?retryWrites=true&w=majority"

mongoose.connect(dburi1, {useNewUrlParser: true, useUnifiedTopology: true},(err)=> {
    if(err){
        console.log(err)
    }else{
        console.log("connected");
    }
})

const userSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Phone:{
        type: Number,
        required: true
    },
    Change:{
        type: String,
        required: true
    },
    Message:{
        type: String,
        required: true
    }
})




module.exports = userSchema;