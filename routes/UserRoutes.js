const { Console } = require('console');
const express = require('express');
const userModel = require('../model/User');
const app = express();


//get all user
app.get('/users', async (req, res) => {
    const users = await userModel.find({});
    try {
      console.log(users[0].name)
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send(err);
    }
});

//get user by username
app.get('/users/:username', async (req, res) => {
    const username = req.params.username
    const users = await userModel.find({username :username}).select();

    try {
        res.status(200).send(users);
      } catch (err) {
        res.status(500).send(err);
        Console.log("cannot find user")
      }
});

app.post('/', async (req, res) => {
  const user = new userModel(req.body)

  try {
      await user.save()
      res.send(user)
  } catch (err) {
      res.status(500).send({error: err.toString()})
  }
})

//register auth
app.post('/register', async (req, res) => {
    const userExist = await userModel.findOne({username: req.body.username})
    if(userExist){
      res.json({ message: 'Username already exist'})
    }else{
      try{
        const newUser = new User({
          username: req.body.username,
          password: req.body.password,
          firstname: req.body.firstname,
          lastname: req.body.lastname
        })
        await newUser.save();
        res.status(200).send({ newUser})
      }
      catch(err){
        res.status(500).send({error: err.toString()})
      }
    }
})

//login auth
app.post('/login', async (req, res) => {
  
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if(req.body.username == '' || req.body.password == ''){
      throw new Error("Empty Fields"); 
    }
    if (user === null) {
      throw new Error("Username does not Exist"); 
    }else if(user != null){
      if (user.password !== password) {
        throw new Error("Password is incorrect");
      }
    res.status(200).send({user})
    }
  } catch (err) {
      res.status(400).send({
          error: err.message
      })
  }
})

  module.exports = app;