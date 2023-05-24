import express from 'express'

const router = express.Router()

// 新增文章分类标签
router.post('/category', (req, res) => {
  res.send('新增文章分类标签成功')
})

export default router