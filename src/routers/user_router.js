import express from 'express'
import user_controller from '../controllers/user_controller.js'

const router = express.Router()

// 修改用户信息
router.put('/user', user_controller.updateUser)

export default router