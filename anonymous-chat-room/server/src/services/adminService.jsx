class AdminService {
  constructor() {
    this.isWebsiteActive = true
    this.adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  }

  toggleWebsite(status) {
    this.isWebsiteActive = status
    
    if (!status) {
      // If stopping website, you could disconnect all users here
      console.log('Website put in maintenance mode')
    } else {
      console.log('Website activated')
    }
    
    return this.isWebsiteActive
  }

  getWebsiteStatus() {
    return this.isWebsiteActive
  }

  verifyAdmin(password) {
    return password === this.adminPassword
  }
}

export default new AdminService()