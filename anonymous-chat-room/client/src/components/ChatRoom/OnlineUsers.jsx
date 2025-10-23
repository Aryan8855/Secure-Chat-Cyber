import React from 'react'

const OnlineUsers = ({ users, currentUser }) => {
  return (
    <div className="online-users">
      <div className="users-header">
        <span className="users-icon">👥</span>
        <span className="users-title">ACTIVE USERS</span>
        <span className="users-count">{users.length}</span>
      </div>
      
      <div className="users-list">
        {users.map((user, index) => (
          <div 
            key={user.id || index} 
            className={`user-item ${user.username === currentUser ? 'current-user' : ''}`}
          >
            <div className="user-status"></div>
            <div className="user-info">
              <div className="user-name">{user.username}</div>
              <div className="user-activity">ACTIVE NOW</div>
            </div>
          </div>
        ))}
        
        {users.length === 0 && (
          <div className="no-users">
            <div className="no-users-icon">🌌</div>
            <div className="no-users-text">NO USERS ONLINE</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OnlineUsers
import "../../styles/users.css"; 
