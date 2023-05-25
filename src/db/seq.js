import { Sequelize } from "sequelize"

import config from '../config/config_default.js'

const seq = new Sequelize(config.MYSQL_DB, config.MYSQL_USER, config.MYSQL_PWD, {
  host: config.MYSQL_HOST,
  dialect: 'mysql'
})

// seq.authenticate()
//   .then(() => {
//     console.log('数据库连接成功')
//   })
//   .catch((err) => console.log('数据库连接失败', err))
  
export default seq