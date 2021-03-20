const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const PORT = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
  console.log('New WebSocket connection')

  socket.emit('message', 'Welcome!')

  socket.on('sendMessage', (message) => {
    io.emit('message', message)
  })
})

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`)
})