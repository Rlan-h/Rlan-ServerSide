import { Sequelize } from 'sequelize'
import account_service from '../services/account_service.js'
import seq from '../db/seq.js'

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
  async login(req, res, next) {}

  async logout(req, res, next) {}
}

export default new AccountController()
