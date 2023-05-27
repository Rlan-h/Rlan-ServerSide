import express from 'express'
import user_controller from '../controllers/user_controller.js'

const router = express.Router()

// 修改用户信息
router.put('/user', user_controller.updateUser)

// 获取用户信息
router.get('/user', user_controller.getUser)

export default router