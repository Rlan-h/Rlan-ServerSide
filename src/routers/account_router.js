import express from 'express'

import account_controller from '../controllers/account_controller.js'
import { accountValidator, accountVerify, bcryptPwd } from '../middlewares/account_middleware.js'

const router = express.Router()

// 注册路由
router.post('/register', accountValidator, accountVerify, bcryptPwd, account_controller.register)

// 登录路由
router.post('/login', account_controller.login)

export default router