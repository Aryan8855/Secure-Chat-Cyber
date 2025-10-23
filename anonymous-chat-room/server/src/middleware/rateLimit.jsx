const rateLimitMap = new Map()

const rateLimit = (windowMs = 60000, maxRequests = 30) => {
  return (req, res, next) => {
    const ip = req.ip
    const now = Date.now()
    const windowStart = now - windowMs

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, [])
    }

    const requests = rateLimitMap.get(ip).filter(time => time > windowStart)
    rateLimitMap.set(ip, requests)

    if (requests.length >= maxRequests) {
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil((requests[0] + windowMs - now) / 1000)
      })
    }

    requests.push(now)
    next()
  }
}

export default rateLimit