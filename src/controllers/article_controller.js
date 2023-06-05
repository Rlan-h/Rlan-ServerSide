import fs from 'fs'
import article_service from '../services/article_service.js'
import { resolveToken } from '../utils/resolveToken.js'
import { dateFormat } from '../utils/dateFormat.js'

class ArticleController {
  // 图片上传
  async uploadCover(req, res, next) {
    const decoded = await resolveToken(req.headers.authorization.split(' ')[1])
    console.log(decoded)
    const draftArticles = await article_service.queryDraftArticles(decoded.user_name)
    const oldCover = draftArticles[0]?.cover
    console.log(draftArticles)
    if (draftArticles.length !== 0) {
      draftArticles[0].set({
        cover: req.file.path.replace(/\\/g, '/').replace('public/', '')
      })
      draftArticles[0].save()
      fs.unlink(`public/${oldCover}`, err => {
        if (err) {
          if (err.code === 'ENOENT') {
            console.log('文件不存在')
          } else {
            throw err
          }
        } else {
          console.log('文件以成功删除')
        }
      })
      return res.send({
        code: 0,
        message: '上传成功',
        result: {
          data: draftArticles,
          coverUrl: draftArticles[0].cover
        }
      })
    }
    // const uuid = req.body.uuid
    // console.log(uuid)
    console.log(req.file)
    // const cover = fs.readFileSync(req.file.path)

    // const blob = new Blob([cover], { type: ['image/jpeg', 'image/png'] })
    const coverUrl = decodeURIComponent(req.file.path.replace(/\\/g, '/')).replace('public/', '')
    const result = await article_service.saveCoverImg(decoded.user_name, coverUrl)
    console.log(result)
    result.dataValues.date = dateFormat(result.dataValues.date)
    // 设置响外
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
        data: result,
        coverUrl: coverUrl
      }
    })

    // const fileName = req.body.fileName
  }

  // 提交文章
  async createArticle(req, res, next) {
    const article = req.body
    const token = req.headers.authorization.split(' ')[1]
    const decoded = await resolveToken(token)
    const draftArticles = await article_service.queryDraftArticles(decoded.user_name)
    if (draftArticles.length !== 0) {
      draftArticles[0].set({
        category: article.category,
        title: article.title,
        content: article.content,
        date: new Date(),
        draft: 0
      })
      draftArticles[0].save()
      return res.send({
        code: 0,
        message: '文章插入成功',
        result: {
          data: draftArticles
        }
      })
    }
    // article.author = userInfo.user_name
    // console.log(article)
    const result = await article_service.addAtricle(article, decoded.user_name)
    res.send({
      code: 0,
      message: '文章上传成功，等待管理员审核',
      result: {
        data: result
      }
    })
  }

  // 根据 uuid 修改文章
  async updateArticleByUuid(req, res, next) {
    // 1. 获取需要修改的文章的uuid，以及需要修改的内容
    const uuid = req.query.uuid
    const newInfo = req.body
    try {
      const result = await article_service.updateArticle({ uuid }, newInfo)
      res.send({
        code: 0,
        message: '文章修改成功',
        result: {
          data: result
        }
      })
    } catch (error) {
      console.error(error)
      res.send({
        code: 1,
        message: '文章修改失败',
        result: {}
      })
    }
  }

  // 根据 id 删除文章
  async deleteArticleByUuid(req, res, next) {
    console.log(req.query)
    const uuid = req.query.uuid
    console.log(uuid)
    try {
      const result = await article_service.deleteArticle({ uuid })
      res.send({
        code: 0,
        message: '文章删除成功',
        result: result ? result : {}
      })
    } catch (error) {
      console.error(error)
      res.send({
        code: 1,
        message: '删除文章失败',
        result: {}
      })
    }
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
        result: {}
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
    const result = await article_service.queryArticlesByAuthor(req.query.author)
    res.send({
      code: 0,
      message: '获取指定作者的文章成功',
      result: {
        data: result
      }
    })
  }

  // 获取最新文章列表
  async getLatestArticles(req, res, next) {
    try {
      const today = new Date()
      const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
      const result = await article_service.queryLatestArticles(today, lastWeek)
      result.date = dateFormat(result.date)
      res.send({
        code: 0,
        message: '获取最新文章列表成功',
        result: {
          data: result
        }
      })
    } catch (error) {
      console.error(error)
      res.send({
        code: 1,
        message: '获取最新文章列表失败',
        result: {}
      })
    }
  }

  // 获取最热文章列表
  async getHottestArticles(req, res, next) {
    try {
      const result = await article_service.queryHottestArticles()
      res.send({
        code: 0,
        message: '获取最热文章列表成功',
        result: {
          data: result
        }
      })
    } catch (error) {
      console.error(error)
      res.send({
        code: 1,
        message: '获取最热文章列表失败',
        result: {}
      })
    }
  }

  // 获取指定文章分类标签的文章
  async getArticlesByCategory(req, res, next) {
    const result = await article_service.queryArticlesByCategory(req.query.category)
    res.send({
      code: 0,
      message: '获取指定分类标签文章成功',
      result: {
        data: result
      }
    })
  }

  // 获取草稿文章
  async getDraftArticles(req, res, next) {
    const decoded = await resolveToken(req.headers.authorization.split(' ')[1])
    const result = await article_service.queryDraftArticles(decoded.user_name)
    res.send({
      code: 0,
      message: '获取草稿文章成功',
      result: {
        data: result
      }
    })
  }
}

export default new ArticleController()
