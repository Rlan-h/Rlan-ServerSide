import Account from "../models/account_model.js"

class AccountService {
  async createAccount(user_name, password, email) {
    // 插入数据
    const res = await Account.create({ user_name, password, email })
    return res.dataValues
  }

  async getAccountInfo({ id, user_name, password, email, is_admin }) {
    const whereOpt = {}
    // 当 id 存在时，把 id 的值拷贝到 whereOpt
    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, {user_name})
    password && Object.assign(whereOpt, {password})
    email && Object.assign(whereOpt, {email})
    is_admin && Object.assign(whereOpt, { is_admin })
    
    const res = await Account.findOne({
      // 需要查询的字段
      attributes: ['id', 'user_name', 'password', 'email', 'is_admin', 'shield', 'cancel'],
      // attributes,
      where: whereOpt
    })
    return res ? res.dataValues : ''
  }
}

export default new AccountService()