export const APP_CONFIG = {
  name: 'Anonymous Chat Room',
  version: '1.0.0',
  description: 'Secure anonymous chat platform',
  features: {
    realTimeChat: true,
    imageSharing: true,
    anonymousUsers: true,
    noDatabase: true
  },
  security: {
    noIpLogging: true,
    noCookies: true,
    ephemeralStorage: true
  }
}