import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const app = express()
const server = createServer(app)

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded files
app.use('/uploads', express.static('uploads'))

// Store active users and messages in memory
const activeUsers = new Map()
const messages = []

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  // Generate random username for new user
  const adjectives = ['Ghost', 'Shadow', 'Neo', 'Cipher', 'Zero']
  const nouns = ['Hacker', 'Runner', 'Agent', 'Protocol', 'Matrix']
  const username = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
    nouns[Math.floor(Math.random() * nouns.length)]
  }#${Math.floor(Math.random() * 999) + 1}`

  // Add user to active users
  activeUsers.set(socket.id, {
    id: socket.id,
    username,
    joinedAt: new Date()
  })

  // Send current users list and messages to new user
  socket.emit('users_list', { users: Array.from(activeUsers.values()) })
  socket.emit('chat_history', { messages: messages }) // CHANGED: Send ALL messages

  // Notify other users about new user
  socket.broadcast.emit('user_joined', {
    users: Array.from(activeUsers.values()),
    newUser: username
  })

  // Handle new messages
  socket.on('send_message', (message) => {
    messages.push(message)
    io.emit('chat_message', message)
  })

  // Handle image messages
  socket.on('send_image', (imageData) => {
    messages.push(imageData)
    io.emit('image_message', imageData)
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = activeUsers.get(socket.id)
    activeUsers.delete(socket.id)
    
    if (user) {
      socket.broadcast.emit('user_left', {
        users: Array.from(activeUsers.values()),
        leftUser: user.username
      })
    }
    
    console.log('User disconnected:', socket.id)
  })
})

export { app, server, io }