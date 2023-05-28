import multer from "multer"
import {resolveToken} from '../utils/resolveToken.js'

// 文件上传配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => { 
    cb(null, "public/covers")   // 设置文件保存路径
  },
  filename: async (req, file, cb) => { 
    const token = req.headers.authorization.split(' ')[1]
    const decoded = await resolveToken(token)
    // console.log(user_name)
    cb(null, decoded.user_name + '_' + 'cover' + '_' + Date.now() + "_" + file.originalname)  // 设置文件名称，防止重复
  }
})
const upload = multer({ storage })



export {
  upload
}