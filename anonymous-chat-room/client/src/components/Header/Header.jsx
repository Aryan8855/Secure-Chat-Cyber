import React from 'react'
import UserCounter from './UserCounter'

const Header = ({ activeUsers, username, isConnected }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">⟠</span>
          <span className="logo-text">ANON_CHAT</span>
        </div>
        <div className="connection-status">
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></span>
          <span className="status-text">
            {isConnected ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      <div className="header-center">
        <div className="user-greeting">
          WELCOME, <span className="username-glow">{username}</span>
        </div>
      </div>

      <div className="header-right">
        <UserCounter count={activeUsers} />
      </div>
    </header>
  )
}

export default Header
import "../../styles/header.css"; 
