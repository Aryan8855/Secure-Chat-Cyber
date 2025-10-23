import { useState } from 'react'

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false)

  const loginAsAdmin = (password) => {
    // Simple password check - in real app, this would be more secure
    if (password === import.meta.env.VITE_ADMIN_PASSWORD || password === 'admin123') {
      setIsAdmin(true)
      return true
    }
    return false
  }

  const logoutAsAdmin = () => {
    setIsAdmin(false)
  }

  return {
    isAdmin,
    loginAsAdmin,
    logoutAsAdmin
  }
}

export default useAdmin