import React, { useState, useEffect, useRef } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import OnlineUsers from './OnlineUsers'
import useWebSocket from '../../hooks/useWebSocket'
import "../../styles/chat.css";

const ChatRoom = ({ username, onConnectionChange, onUsersUpdate }) => {
  const [messages, setMessages] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const messagesEndRef = useRef(null)

  // Add this function to handle chat history
  const handleChatHistory = (historyMessages) => {
    console.log('Setting chat history:', historyMessages.length, 'messages')
    setMessages(historyMessages)
  }

  const { isConnected, sendMessage, sendImage } = useWebSocket({
    onMessage: (message) => {
      setMessages(prev => [...prev, message])
    },
    onUsersUpdate: (users) => {
      setOnlineUsers(users)
      onUsersUpdate(users.length)
    },
    onConnectionChange,
    onChatHistory: handleChatHistory // ADD THIS
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (text) => {
    if (text.trim()) {
      const message = {
        id: Date.now().toString(),
        username,
        text: text.trim(),
        timestamp: new Date().toISOString(),
        type: 'text'
      }
      sendMessage(message)
    }
  }

  const handleSendImage = (file) => {
    sendImage(file, username)
  }

  return (
    <div className="chat-room">
      <div className="chat-container">
        {/* Online Users Sidebar */}
        <div className="users-sidebar">
          <OnlineUsers users={onlineUsers} currentUser={username} />
        </div>

        {/* Main Chat Area */}
        <div className="chat-main">
          <div className="chat-header">
            <div className="chat-title">
              <span className="title-icon">💬</span>
              MAIN CHAT ROOM
            </div>
            <div className="chat-stats">
              {messages.length} MESSAGES • {onlineUsers.length} USERS ONLINE
            </div>
          </div>

          <MessageList messages={messages} currentUser={username} />
          
          <div ref={messagesEndRef} />
          
          <MessageInput 
            onSendMessage={handleSendMessage}
            onSendImage={handleSendImage}
            isConnected={isConnected}
          />
        </div>
      </div>
    </div>
  )
}

export default ChatRoom