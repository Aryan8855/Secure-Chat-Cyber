class ChatController {
  constructor() {
    this.messages = []
    this.activeUsers = new Map()
  }

  addMessage(message) {
    this.messages.push(message)
    // Keep only last 100 messages to prevent memory issues
    if (this.messages.length > 100) {
      this.messages = this.messages.slice(-100)
    }
    return message
  }

  addUser(socketId, username) {
    this.activeUsers.set(socketId, {
      id: socketId,
      username,
      joinedAt: new Date()
    })
    return Array.from(this.activeUsers.values())
  }

  removeUser(socketId) {
    this.activeUsers.delete(socketId)
    return Array.from(this.activeUsers.values())
  }

  getActiveUsers() {
    return Array.from(this.activeUsers.values())
  }

  getRecentMessages(limit = 50) {
    return this.messages.slice(-limit)
  }
}

export default new ChatController()