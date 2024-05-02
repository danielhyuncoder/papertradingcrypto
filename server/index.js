const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {authenticate} = require('./middlewares.js')
const {Users, Accounts}=require('./Schemas.js')
require('dotenv').config();

const app=express();
app.use(cors())
app.use(express.json());
app.use(authenticate);

mongoose.connect(`mongodb+srv://user:${process.env.key}@cluster0.2fcyyff.mongodb.net/`);

app.post('/userinfo', (req, res)=>{
    Users.find({uid: req.query.uid}).then(data=>{
   
        if (data.length===0){
            Users.create(req.body).catch(err=>{});
            res.status(200).send("Sucessful")
        } else {
            res.status(400).send("User Data already created.")
        }
    })
})
app.get('/account', (req, res)=>{
    Accounts.find({_id: req.query.id}).catch(err=>{}).then(data=>{
        res.status(200).send(data);
    })
})
app.get('/userdata',(req,res)=>{
    Users.find({uid: req.query.uid}).then(data=>{
        res.status(200).send(data)
    })
})
app.post('/new/account', (req,res)=>{
    Users.find({_id: req.query.id}).catch(err=>{}).then(d=>{
         let cond = d[0].accountNumber<5
         if (cond){
            Accounts.create({name: req.body.name, balance:req.body.balance, coins: req.body.coins, owner: req.body.uid}).catch(err=>{}).then(r=>{
                let d=r;
                Users.updateOne({_id: req.query.id}, {$push: {accounts: {name: req.body.name, beginningBal:req.body.balance, coins: req.body.coins, id: d._id}}, $inc: {accountNumber: 1}}).catch(err=>{
                    res.status(400).send("Error in creating new account");
                }).then(r=>{
                    res.status(200).send("Sucessful")
                })
            });
            
         } else {
            res.status(400).send("Maximum Account Number Reached.")
         }
    })
})
app.post('/remove/account', (req, res)=> {
    Users.find({uid:req.body.uid}).catch(err=>{}).then(d=>{
        if (d.length===0) {
            res.status(400).send("Error, No user found");
        } else {
            let r = d[0].accounts;
            r=r.filter(item=>item.id!==req.body.id);
            Users.updateOne({uid: req.body.uid}, {$set: {accounts: r}, $inc: {accountNumber: -1}}).catch(err=>{
                res.status(400).send(err);
            });
            
            Accounts.deleteOne({_id: req.body.id}).catch(err=>{
                res.status(400).send(err);
            })
            res.status(200).send("Sucessful");
            
        }
    })
})
app.post('/buy/coin', (req, res)=>{
    Accounts.find({_id: req.query.id}).then(data=>{
        if (data.length===0){
            res.status(400).send("Account Not Found.");
        } else {
            let d = data[0];
            if (d.balance>=req.body.amount*req.body.price){
                let b = false;
                for (let i=0;i<d.holdings.length;i++){
                    if (d.holdings[i].name===req.body.coinname){
                        b=true;
                        d.holdings[i].amount+=parseFloat(req.body.amount);
                        Accounts.updateOne({_id: d._id}, {$set: {balance: d.balance-req.body.amount*req.body.price,holdings: d.holdings}}).then(r=>{
                        });
                        res.status(200).send("Sucessfully Purchased");
                        break;
                    }
                }
                if (!b){
                    Accounts.updateOne({_id: d._id}, {$set: {balance: d.balance-req.body.amount*req.body.price}, $push: {holdings: {name: req.body.coinname, amount: parseFloat(req.body.amount), imageURL: req.body.imgURL}}}).then(r=>{
                    });
                    res.status(200).send("Sucessfully Purchased")
                }
            } else {
                res.status(400).send("Insufficient Balance");
            }
        }
    })
});
app.post('/sell/coin', (req, res)=>{
    Accounts.find({_id: req.query.id}).then(data=>{
        if (data.length===0) {
            res.status(400).send("user not found")
        } else {
            let d = data[0];
            for (let i =0;i<d.holdings.length;i++){
                if (d.holdings[i].name===req.body.name){
                    if (d.holdings[i].amount >= req.body.amount){
                        d.holdings[i].amount-=parseFloat(req.body.amount);
                        if (d.holdings[i].amount<=0) {
                             d.holdings=d.holdings.filter(holding=>holding.name!==d.holdings[i].name);
                        }
                        Accounts.updateOne({_id: req.query.id}, {$set: {holdings: d.holdings}, $inc: {balance: req.body.amount*req.body.price}}).then(d=>{
                            res.status(200).send("Sucessfully sold")
                        })
                    } else {
                        res.status(400).send("insufficient balance");
                    }
                    break;
                }
            }
            /*
               amount,
               price,
            
            */
        }
    })
})
app.listen(4000);