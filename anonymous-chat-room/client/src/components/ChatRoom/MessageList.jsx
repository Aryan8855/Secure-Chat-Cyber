import "../../styles/messages.css"; 
import React from 'react'

const MessageList = ({ messages, currentUser }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (messages.length === 0) {
    return (
      <div className="message-list empty">
        <div className="empty-state">
          <div className="empty-icon">🚀</div>
          <div className="empty-title">NO MESSAGES YET</div>
          <div className="empty-subtitle">Be the first to break the silence!</div>
        </div>
      </div>
    )
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${message.username === currentUser ? 'own-message' : ''} ${
            message.type === 'image' ? 'image-message' : ''
          }`}
        >
          <div className="message-header">
            <span className="message-username">{message.username}</span>
            <span className="message-time">{formatTime(message.timestamp)}</span>
          </div>
          
          <div className="message-content">
            {message.type === 'image' ? (
              <div className="image-container">
                <img 
                  src={message.imageUrl} 
                  alt="Shared content" 
                  className="message-image"
                  loading="lazy"
                />
                <div className="image-overlay">
                  <span className="image-text">IMAGE</span>
                </div>
              </div>
            ) : (
              <div className="message-text">{message.text}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MessageList
