const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const mongoose = require('mongoose');


app.use(express.json())
app.use(cors())

const io = require('socket.io')(http)

const userRouter = require('./routes/UserRoutes.js');
const roomRouter = require('./routes/RoomRoutes.js');
const messageRouter = require('./routes/UserRoutes.js');

mongoose.connect('mongodb+srv://trish:anne@comp3123-assignment2.wrcjs.mongodb.net/comp3133?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection')
});

//this will go to the login page
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/temp/login.html')
})

//this will go to the register page
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/temp/register.html')
})

//this will go to the chat server
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/temp/chat.html')
})

//this will go back to log in once logged out
app.get('/logout', (req, res) => {
    res.sendFile(__dirname + 'temp/login.html')
})

io.on('connection', (socket) => {
    console.log('User Connected')

    //new message
    socket.on('sentMessage', (data) => {
        socket.broadcast.emit('newMessage')
    })

    //typing
    socket.on('typing', (user) => {
        socket.broadcast.emit('isTyping', user)
    })
    

    //disconnected
    socket.on('disconnect',() => {
        socket.log(`${socket.id} disconnected`)
    })
})

app.use('/messages', messageRouter)
app.use('/users', userRouter)
app.use('/rooms', roomRouter)

const PORT = 3030
http.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`)
})