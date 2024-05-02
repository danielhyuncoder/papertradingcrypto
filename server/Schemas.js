const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: String,
    email: String,
    accountNumber:Number,
    accounts: [{
        name:String,
        beginningBal:Number,
        id: String     
    }]
})

const accountSchema = new mongoose.Schema({
    name:String,
    balance:Number,
    coins:Number,
    owner: String,
    holdings: [{
        name: String,
        amount: Number,
        imageURL: String
    }]
})

const Users=mongoose.model("users", userSchema);
const Accounts=mongoose.model("accounts", accountSchema);

module.exports={Users,Accounts}
