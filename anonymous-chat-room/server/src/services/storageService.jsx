import fs from 'fs'
import path from 'path'

class StorageService {
  constructor() {
    this.uploadsDir = './uploads/images'
    this.ensureUploadsDir()
  }

  ensureUploadsDir() {
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true })
    }
  }

  saveFile(fileBuffer, filename) {
    const filePath = path.join(this.uploadsDir, filename)
    fs.writeFileSync(filePath, fileBuffer)
    return `/uploads/images/${filename}`
  }

  deleteFile(filename) {
    const filePath = path.join(this.uploadsDir, filename)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return true
    }
    return false
  }

  cleanupOldFiles(maxAgeHours = 24) {
    const files = fs.readdirSync(this.uploadsDir)
    const now = Date.now()
    const maxAge = maxAgeHours * 60 * 60 * 1000

    files.forEach(file => {
      const filePath = path.join(this.uploadsDir, file)
      const stats = fs.statSync(filePath)
      
      if (now - stats.mtimeMs > maxAge) {
        this.deleteFile(file)
        console.log('Cleaned up old file:', file)
      }
    })
  }
}

export default new StorageService()