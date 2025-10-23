export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  SYSTEM: 'system'
}

export const RATE_LIMITS = {
  MESSAGES_PER_MINUTE: 30,
  CONNECTIONS_PER_IP: 5,
  UPLOADS_PER_HOUR: 10
}

export const FILE_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
}