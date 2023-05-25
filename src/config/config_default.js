import * as dotenv from 'dotenv'

dotenv.config()

// console.log(process.env)

const config = process.env
// const { APP_PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = process.env

// export { APP_PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB }

export default config
