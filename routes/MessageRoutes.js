const express = require('express');
const groupChatModel = require('../model/GroupChat')
const privateChatModel = require('../model/PrivateChat')
const app = express();

//open private chat
app.get('/private', async (req, res) => {
    const message = await privateChatModel.find({from_user: req.body.from_user, to_user: req.body.to_user});
    try {
        res.send(message)
    } catch (err) {
        res.status(500).send({error: err.toString()})
    }
})

//send privatechat
app.post('/private', async (req, res) => {
    const message = new privateMessageModel(req.body)

    try {
        await message.save()
        res.send(message)
    } catch (err) {
        res.status(500).send({error: err.toString()})
    }
})

//open groupchat
app.get('/rooms/:room', async (req, res) => {
    try {
        const message = await groupChatModel.find({room: req.params.room}).sort({"date_sent": 1})
        res.send(message)
    } catch (err) {
        res.status(500).send({error: err.toString()})
    }
})

//send groupmessage
app.post('/sendgroup', async (req, res) => {
    const message = new groupChatModel(req.body)

    try {
        await message.save()
        res.send(message)
    } catch (err) {
        res.status(500).send({error: err.toString()})
    }
})

app.post('/sendprivate', async (req, res) => {
    const privateMessage = new privateChatModel(req.body)

    try {
        await privateMessage.save()
        res.send(privateMessage)
    } catch (err) {
        res.status(500).send({error: err.toString()})
    }
})

module.exports = app;