import { Sequelize } from 'sequelize'
import bcrypt from 'bcryptjs'
import jtw from 'jsonwebtoken'
import account_service from '../services/account_service.js'
import seq from '../db/seq.js'
import config from '../config/config_default.js'

class AccountController {
  async register(req, res, next) {
    // 1. 获取数据
    const { user_name, password, email } = req.body
    try {
      const result = await account_service.createAccount(user_name, password, email)
      res.send({
        code: 0,
        message: '注册成功',
        result: {
          id: result.id,
          user_name: result.user_name
        }
      })
    } catch (error) {
      seq.query('ALTER TABLE accounts AUTO_INCREMENT = 1')
      if (error instanceof Sequelize.ValidationError) {
        const errors = error.errors.map(err => ({
          message: err.message,
          field: err.path,
          type: err.validatorKey,
          args: err.validatorArgs
        }))
        return res.send({
          code: 10001,
          // message: error.message === 'Validation len on user_name failed' ? '' : '',
          message: '注册失败',
          result: errors
        })
      }
    }
  }
  async login(req, res, next) {
    // 1. 获取数据
    const { user_name } = req.body
    try {
      // 2. 查询数据库，判断是否存在该用户
      const { password, ...account } = await account_service.getAccountInfo({ user_name })
      // 2.1 存在该用户，验证密码是否正确
      const compareRes = bcrypt.compareSync(req.body.password, password)
      if (compareRes) {
        // 2.2 密码正确，生成 token
        res.send({
          code: 0,
          message: '登录成功',
          result: {
            token: 'Bearer ' + jtw.sign(account, config.TOKEN_SECRET, {expiresIn: config.TOKEN_EXPIRESIN})
          }
        })
      }
    } catch (error) {
      console.error('登录失败', error)
      return res.send({
        code: 1,
        message: '登录失败',
        result: ''
      })
    }
  }

  async logout(req, res, next) {}
}

export default new AccountController()
