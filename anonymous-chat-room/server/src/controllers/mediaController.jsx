import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Ensure uploads directory exists
const uploadsDir = './uploads/images'
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueName = `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.jpg`
    cb(null, uniqueName)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed'), false)
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
})

class MediaController {
  handleImageUpload(req, res) {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const imageUrl = `/uploads/images/${req.file.filename}`
    
    res.json({
      success: true,
      imageUrl,
      message: 'Image uploaded successfully'
    })
  }

  // Clean up old images (could be called periodically)
  cleanupOldImages() {
    const files = fs.readdirSync(uploadsDir)
    const now = Date.now()
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours

    files.forEach(file => {
      const filePath = path.join(uploadsDir, file)
      const stats = fs.statSync(filePath)
      
      if (now - stats.mtimeMs > maxAge) {
        fs.unlinkSync(filePath)
        console.log('Cleaned up old image:', file)
      }
    })
  }
}

export default new MediaController()