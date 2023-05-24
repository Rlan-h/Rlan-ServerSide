import express from 'express'

const router = express.Router()

// 修改用户信息
router.put('/user', (req, res) => {
  res.send('修改用户信息成功')
})

export default router