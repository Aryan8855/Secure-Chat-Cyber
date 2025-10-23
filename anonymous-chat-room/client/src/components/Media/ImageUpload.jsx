import React, { useRef } from 'react'

const ImageUpload = ({ onImageSelect, disabled }) => {
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
        return
      }
      
      onImageSelect(file)
    }
    
    // Reset file input
    e.target.value = ''
  }

  const handleButtonClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: 'none' }}
        disabled={disabled}
      />
      
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={disabled}
        className="image-upload-button"
        title="Upload image"
      >
        <span className="upload-icon">🖼️</span>
        <span className="upload-text">IMAGE</span>
      </button>
    </>
  )
}

export default ImageUpload