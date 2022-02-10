const express = require('express');
const groupChatModel = require('../model/GroupChat')
const app = express();


//get room
app.get('/rooms', async (req, res) => {
    const rooms = await groupChatModel.distinct('room', (err, rooms) => {
      if (err) {
          res.status(400).send({error: err.toString()})
      }
      res.send(rooms)
  })
});

app.get('/rooms/:room', async (req, res) => {
    const room = req.params.room
    const rooms = await groupChatModel.find({room :room}).select();

    try {
        res.status(200).send(rooms);
      } catch (err) {
        res.status(500).send(err);
      }
});

module.exports = app;
