import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

const useWebSocket = ({ onMessage, onUsersUpdate, onConnectionChange, onChatHistory }) => {
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef(null)

  useEffect(() => {
    // Connect to server
    socketRef.current = io('http://localhost:3001', {
      transports: ['websocket']
    })

    socketRef.current.on('connect', () => {
      setIsConnected(true)
      onConnectionChange(true)
    })

    socketRef.current.on('disconnect', () => {
      setIsConnected(false)
      onConnectionChange(false)
    })

    // ADD THIS: Handle chat history when user first connects
    socketRef.current.on('chat_history', (data) => {
      console.log('Received chat history:', data.messages.length, 'messages')
      if (onChatHistory && data.messages) {
        onChatHistory(data.messages)
      }
    })

    socketRef.current.on('chat_message', (message) => {
      onMessage(message)
    })

    socketRef.current.on('user_joined', (data) => {
      onUsersUpdate(data.users)
    })

    socketRef.current.on('user_left', (data) => {
      onUsersUpdate(data.users)
    })

    socketRef.current.on('users_list', (data) => {
      onUsersUpdate(data.users)
    })

    socketRef.current.on('image_message', (message) => {
      onMessage(message)
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [])

  const sendMessage = (message) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('send_message', message)
    }
  }

  const sendImage = (file, username) => {
    if (socketRef.current && isConnected) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = {
          id: Date.now().toString(),
          username,
          imageUrl: e.target.result,
          timestamp: new Date().toISOString(),
          type: 'image'
        }
        socketRef.current.emit('send_image', imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  return {
    isConnected,
    sendMessage,
    sendImage
  }
}

export default useWebSocket