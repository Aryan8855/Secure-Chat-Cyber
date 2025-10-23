import { useState } from 'react'

const useChat = () => {
  const [messages, setMessages] = useState([])

  const addMessage = (message) => {
    setMessages(prev => [...prev, message])
  }

  const clearMessages = () => {
    setMessages([])
  }

  return {
    messages,
    addMessage,
    clearMessages
  }
}

export default useChat