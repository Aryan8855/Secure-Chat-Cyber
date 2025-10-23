import { server } from './src/app.js'

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📡 WebSocket server ready for connections`)
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`)
})