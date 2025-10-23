import React, { useState, useEffect } from 'react'
import Header from "./components/Header/Header.jsx";
import ChatRoom from "./components/ChatRoom/ChatRoom.jsx";
import './App.css'

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [activeUsers, setActiveUsers] = useState(0)
  const [username, setUsername] = useState('')

  useEffect(() => {
    // Generate random username when app loads
    const adjectives = ['Ghost', 'Shadow', 'Neo', 'Cipher', 'Zero', 'Phantom', 'Void', 'Byte']
    const nouns = ['Hacker', 'Runner', 'Agent', 'Protocol', 'Matrix', 'Node', 'Stream', 'Code']
    const randomNum = Math.floor(Math.random() * 999) + 1
    
    const randomName = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
      nouns[Math.floor(Math.random() * nouns.length)]
    }#${randomNum.toString().padStart(3, '0')}`
    
    setUsername(randomName)
  }, [])

  return (
    <div className="app">
      <div className="matrix-bg"></div>
      
      <Header 
        activeUsers={activeUsers} 
        username={username}
        isConnected={isConnected}
      />
      
      <main className="main-content">
        <ChatRoom 
          username={username}
          onConnectionChange={setIsConnected}
          onUsersUpdate={setActiveUsers}
        />
      </main>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-item">
          <span className="status-dot" style={{ 
            backgroundColor: isConnected ? '#00ff00' : '#ff0000' 
          }}></span>
          {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
        </div>
        <div className="status-item">USER: {username}</div>
        <div className="status-item">ENCRYPTION: ACTIVE</div>
      </div>
    </div>
  )
}

export default App