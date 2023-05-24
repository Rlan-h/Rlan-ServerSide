import express from 'express'

const router = express.Router()

// 发布文章
router.post('/article', (req, res) => {
  res.send('发布文章成功')
})

export default router