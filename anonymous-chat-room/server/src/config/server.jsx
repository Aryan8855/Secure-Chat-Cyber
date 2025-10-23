export const serverConfig = {
  port: process.env.PORT || 3001,
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  },
  uploads: {
    maxFileSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024,
    uploadPath: process.env.UPLOAD_PATH || './uploads'
  },
  rateLimiting: {
    messagesPerMinute: process.env.MAX_MESSAGES_PER_MINUTE || 30,
    connectionsPerIP: process.env.MAX_CONNECTIONS_PER_IP || 5
  }
}