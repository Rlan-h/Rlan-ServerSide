import { DataTypes } from "sequelize"

import seq from "../db/seq.js"

// 定义模型
const Account = seq.define('Account', {
  // id 会被自动创建，管理
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1,12]
    },
    comment: '用户名，唯一'
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: {
      len: [6, 64]
    },
    comment: '密码'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
    comment: '邮箱'
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员，默认为0，1为管理员，0不是管理员'
  },
  shield: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '标识是否被拉黑，默认为0，0为未被拉黑，1为已被拉黑'
  },
  cancel: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '标识是否注销，默认为0，0为未注销，1为已注销'
  }
})

// 可强制重建
// Account.sync({ force: true })

export default Account