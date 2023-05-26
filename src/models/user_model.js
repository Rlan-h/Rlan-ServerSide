import { DataTypes } from "sequelize"

import seq from "../db/seq.js"

const User = seq.define('User', {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 12]
    },
    comment: '用户名，唯一'
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
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 18,
    validate: {
      min: 12,
      max: 100
    },
    comment: '年龄'
  },
  career: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '职业'
  },
  intro: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '简介'
  },
  head_pic: {
    type: DataTypes.BLOB,
    allowNull: true,
    comment: '头像'
  }
})

// User.sync({force: true})

export default User