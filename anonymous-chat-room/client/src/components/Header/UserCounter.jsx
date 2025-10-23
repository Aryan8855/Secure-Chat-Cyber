import React from 'react'

const UserCounter = ({ count }) => {
  return (
    <div className="user-counter">
      <div className="counter-icon">👥</div>
      <div className="counter-content">
        <div className="counter-label">ACTIVE USERS</div>
        <div className="counter-value">
          <span className="count-glow">{count}</span>
          <span className="counter-unit">ONLINE</span>
        </div>
      </div>
    </div>
  )
}

export default UserCounter