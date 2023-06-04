import express from 'express'

import { upload } from '../middlewares/article_middleware.js'
import article_controller from '../controllers/article_controller.js'

const router = express.Router()

// 封面图片上传
router.post('/article/cover', upload.single('cover'), article_controller.uploadCover)

// 发布文章
router.post('/article', upload.single('cover'), article_controller.createArticle)

// 获取所有文章
router.get('/articles', article_controller.getAllArticles)

// 获取指定 id 的文章
router.get('/article/:id', article_controller.getArticleById)

// 获取指定用户的文章
router.get('/articles/user/:author', article_controller.getArticlesByAuthor)

// 获取最新文章(一星期以内)
router.get('/articles/latest', article_controller.getLatestArticles)

// 获取最热文章
router.get('/articles/hottest', article_controller.getHottestArticles)

// 获取指定文章分类标签的文章
router.get('/articles/:category', article_controller.getArticlesByCategory)

// 获取草稿文章
router.get('/articles/draft/:author', article_controller.getDraftArticles)

// 修改指定 uuid 的文章
router.put('/articles/:uuid', article_controller.updateArticleByUuid)

// 删除指定 uuid 的文章
router.delete('/articles/:uuid', article_controller.deleteArticleByUuid)

export default router