import express from 'express'

const router = express.Router()

// 注册路由
router.post('/register', (req, res) => {
  res.send('ok')
})

export default router