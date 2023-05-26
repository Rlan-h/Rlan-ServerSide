import User from "../models/user_model.js"


class UserService {

  async getUserInfo({ userId: id }) {
    console.log(id)
    const whereOpt = {}
    id && Object.assign(whereOpt, { id })
    console.log(whereOpt)

    const user = await User.findOne({
      attributes: ['id', 'user_name', 'email', 'age', 'career', 'intro', 'head_pic'],
      where: whereOpt
    })
    // console.log(user.toJSON())
    return user
  }

  async createUser(user_name, email) {
    user_name = user_name.trim()
    email = email.trim()
    const result = await User.create({ user_name, email })
    return result.dataValues ? result.dataValues : ''
  }

  async updateUserInfo(userId, genUser) { 
    let user = await this.getUserInfo({ userId })
    console.log(user)
    user.set(genUser)
    await user.save()
    return user
  }
}

export default new UserService()