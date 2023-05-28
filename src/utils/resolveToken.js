import jwt from 'jsonwebtoken'
import config from '../config/config_default.js'

export const resolveToken = async (token) => {
  return jwt.verify(token, config.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error(err)
    } else {
      console.log(decoded)
      return decoded
    }
  })
}