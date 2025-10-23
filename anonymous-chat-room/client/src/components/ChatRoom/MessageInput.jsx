import React, { useState, useRef } from 'react'
import ImageUpload from '../Media/ImageUpload'

const MessageInput = ({ onSendMessage, onSendImage, isConnected }) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && isConnected) {
      onSendMessage(message)
      setMessage('')
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleTextareaChange = (e) => {
    setMessage(e.target.value)
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }

  const handleImageUpload = (file) => {
    if (isConnected) {
      onSendImage(file)
    }
  }

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-form">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder={isConnected ? "Type your message... (Enter to send, Shift+Enter for new line)" : "Connecting to chat..."}
            disabled={!isConnected}
            className="message-textarea"
            rows="1"
          />
          
          <div className="input-actions">
            <ImageUpload onImageSelect={handleImageUpload} disabled={!isConnected} />
            
            <button 
              type="submit" 
              disabled={!message.trim() || !isConnected}
              className="send-button"
            >
              <span className="send-icon">⏎</span>
              <span className="send-text">SEND</span>
            </button>
          </div>
        </div>
        
        <div className="input-status">
          {isConnected ? (
            <span className="status-connected">
              ● READY TO TRANSMIT
            </span>
          ) : (
            <span className="status-disconnected">
              ● CONNECTING TO NETWORK...
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

export default MessageInput
import "../../styles/input.css"; 
