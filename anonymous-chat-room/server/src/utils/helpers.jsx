export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

export const isValidImage = (mimetype) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  return allowedTypes.includes(mimetype)
}