import user_service from '../services/user_service.js'
import { resolveToken } from '../utils/resolveToken.js'

class UserController {
  async updateUser(req, res, next) {
    // console.log(req.headers.authorization.split(' ')[1])
    try {
      const token = req.headers.authorization.split(' ')[1]
      const userId = await resolveToken(token)
      console.log(userId)
      const genUser = {}
      req.body.age && (genUser.age = req.body.age)
      req.body.career && (genUser.career = req.body.career)
      req.body.intro && (genUser.intro = req.body.intro)
      req.body.head_pic && (genUser.head_pic = req.body.head_pic)
      console.log(genUser)
      const result = await user_service.updateUserInfo(userId, genUser)

      res.send({
        code: 0,
        message: '修改成功',
        result: {
          data: result
        }
      })
    } catch (error) {
      console.error(error)
      res.send({
        code: 1,
        message: '修改失败',
        result: {}
      })
    }
  }

  async getUser(req, res, next) { 
    try {
      const token = req.headers.authorization.split(' ')[1]
      // console.log(token)
      const { id: userId } = await resolveToken(token)
      console.log('userId',userId)
      const result = await user_service.getUserInfo(userId)
      res.send({
        code: 0,
        message: '获取成功',
        result: {
          data: result
        }
      })
    } catch (error) {
      console.error(error)
      res.send({
        code: 1,
        message: '获取失败',
        result: {}
      })
    }
  
  }
}

export default new UserController()
