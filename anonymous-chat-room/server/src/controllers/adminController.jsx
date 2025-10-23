class AdminController {
  constructor() {
    this.isWebsiteActive = true
    this.adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  }

  toggleWebsite(status) {
    this.isWebsiteActive = status
    return {
      success: true,
      status: this.isWebsiteActive ? 'active' : 'maintenance',
      message: this.isWebsiteActive ? 'Website is now active' : 'Website is in maintenance mode'
    }
  }

  getWebsiteStatus() {
    return {
      status: this.isWebsiteActive ? 'active' : 'maintenance',
      timestamp: new Date().toISOString()
    }
  }

  verifyAdmin(password) {
    return password === this.adminPassword
  }
}

export default new AdminController()