import chatController from '../controllers/chatController.js'

class SocketService {
  constructor(io) {
    this.io = io
    this.setupSocketHandlers()
  }

  setupSocketHandlers() {
    this.io.on('connection', (socket) => {
      console.log('User connected:', socket.id)

      // Generate random username
      const username = this.generateUsername()
      
      // Add user to active users
      const users = chatController.addUser(socket.id, username)

      // Send current state to new user
      socket.emit('users_list', { users })
      socket.emit('chat_history', { 
        messages: chatController.getRecentMessages() 
      })

      // Notify others
      socket.broadcast.emit('user_joined', { 
        users, 
        newUser: username 
      })

      // Message handlers
      socket.on('send_message', (message) => {
        const savedMessage = chatController.addMessage(message)
        this.io.emit('chat_message', savedMessage)
      })

      socket.on('send_image', (imageData) => {
        const savedMessage = chatController.addMessage(imageData)
        this.io.emit('image_message', savedMessage)
      })

      // Disconnection handler
      socket.on('disconnect', () => {
        const users = chatController.removeUser(socket.id)
        socket.broadcast.emit('user_left', { users })
        console.log('User disconnected:', socket.id)
      })
    })
  }

  generateUsername() {
    const adjectives = ['Ghost', 'Shadow', 'Neo', 'Cipher', 'Zero', 'Phantom']
    const nouns = ['Hacker', 'Runner', 'Agent', 'Protocol', 'Matrix', 'Node']
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    const randomNum = Math.floor(Math.random() * 999) + 1
    
    return `${adjective}${noun}#${randomNum.toString().padStart(3, '0')}`
  }
}

export default SocketService