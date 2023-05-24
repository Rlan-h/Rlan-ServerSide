import express from 'express'

const router = express.Router()

// 发布评论
router.post('/comment', (req, res) => {
  res.send('发布评论成功')
})

export default router