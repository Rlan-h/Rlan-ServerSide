import fs from 'fs'
import { Blob } from 'buffer'
import article_service from "../services/article_service.js"
import { resolveToken } from "../utils/resolveToken.js"

class ArticleController {

  // 图片上传
  async uploadCover(req, res, next) { 
    // const uuid = req.body.uuid
    // console.log(uuid)
    console.log(req.file)
    const cover = fs.readFileSync(req.file.path)

    const blob = new Blob([cover], { type: ['image/jpeg', 'image/png'] })
    // console.log(blob)
    // await article_service.saveCoverImg(uuid,blob)
    // 设置响应头
    // res.setHeader('Content-Type', ['image/jpeg', 'image/png']);
    // 'inline' 表示浏览器应该直接显示该图像
    // res.setHeader('Content-Disposition', 'inline; filename="image.jpg"');
    // res.setHeader('Content-Disposition', ' filename="image.jpg"');
    res.send({
      code: 0,
      message: '上传成功',
      result: {
        url: decodeURIComponent(req.file.path.replace(/\\/g, '/')),
        data: blob
      }
    })

    // const fileName = req.body.fileName

  }

  // 新增文章
  async createArticle(req, res, next) {
    const article = req.body
    const token = req.headers.authorization.split(' ')[1]
    const userInfo = await resolveToken(token)
    
    article.author = userInfo.user_name
    // console.log(article) 
    const result = await article_service.addAtricle(article)
    res.send({
      code: 0,
      message: '文章上传成功，等待管理员审核',
      result: {
        data: result
      }
    })
  }

  // 根据 id 修改文章
  async updateArticle(req, res, next) { 
    res.send('修攽数据')
  
  }

  // 根据 id 删除文章
  async deleteArticle(req, res, next) { 
    res.send('删除数据')
  }

  // 根据 id 获取文章
  async getArticle(req, res, next) { 
    res.send('获取数据')
  }

  // 获取所有文章
  async getAllArticles(req, res, next) { 
    try {
      const result = await article_service.queryAllArticles()
    res.send({
      code: 0,
      message: '获取所有文章成功',
      result: {
        data: result
      }
    })
    } catch (error) {
      console.error(error)
      res.send({
        code: 1,
        message: '获取所有文章失败',
        result:{}
      })
    }
  }

  // 根据 id 获取文章
  async getArticleById(req, res, next) { 
    res.send('获取指定文章成功')
  }

  // 获取指定用户的文章
  async getArticlesByAuthor(req, res, next) { 
    console.log(req.query.author)
    const result = await  article_service.queryArticlesByAuthor(req.query.author)
    res.send({
      code: 0,
      message: '获取指定作者的文章成功',
      result: {
        data: result
      }
    })
  
  }

  // 获取指定文章分类标签的文章
  async getArticlesByCategory(req, res, next) { 
    const result = await  article_service.queryArticlesByCategory(req.query.category)
    res.send({
      code: 0,
      message: '获取指定分类标签文章成功',
      result: {
        data: result
      }
    })
  }
}

export default new ArticleController()