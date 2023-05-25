import bcrypt from 'bcryptjs'
import account_service from '../services/account_service.js'

const accountValidator = async (req, res, next) => {
  let { user_name, password, email } = req.body
  user_name = user_name.trim()
  password = password.trim()
  email = email.trim()
  if (!user_name) {
    console.error('用户名为空', req.body)
    return res.send({
      code: 1,
      message: '用户名不可为空',
      result: req.body
    })
  }
  if (!password) {
    console.error('密码为空', req.body)
    return res.send({
      code: 1,
      message: '密码不可为空',
      result: req.body
    })
  }
  if (password.toString().length < 6 || password.toString().length > 20) {
    return res.send({
      code: 1,
      message: '密码长度需满足6~20',
      result: req.body
    })
  }
  if (!email) {
    console.error('邮箱为空', req.body)
    return res.send({
      code: 1,
      message: '邮箱不可为空',
      result: req.body
    })
  }

  await next()
}

const accountVerify = async (req, res, next) => {
  const { user_name, email } = req.body
  try {
    const userRes = await account_service.getAccountInfo({ user_name })
    if (userRes) {
      return res.send({
        code: 1,
        message: '该用户名已被注册，请更换重试',
        result: user_name
      })
    }
    const emailRes = await account_service.getAccountInfo({ email })
    if (emailRes) {
      return res.send({
        code: 1,
        message: '该邮箱已被注册，请更换重试',
        result: email
      })
    }
    await next()
  } catch (error) {
    console.log(error)
    return res.send(error)
  }
}


// 密码加密
const bcryptPwd = async (req, res, next) => {
  const { password } = req.body
  const salt = bcrypt.genSaltSync(10)
  // hash 是加密过的密码
  const hash = bcrypt.hashSync(password, salt)
  req.body.password = hash

  await next()
}

export {
  accountValidator,
  accountVerify,
  bcryptPwd
}
