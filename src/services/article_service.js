import Article from "../models/article_model.js"

class ArticleService {

  // 保存封面图片
  async saveCoverImg(uuid, cover) {
    
  }

  // 获取所有文章
  async queryAllArticles() {
    return await Article.findAll()
  }

  // 获取指定作者的文章
  async queryArticlesByAuthor(author) { 
    return await Article.findAll({
      where: {
        author
      }
    })
  }

  // 获取指定标签的文章
  async queryArticlesByCategory(category) { 
    return await Article.findAll({
      where: {
        category
      }
    }) 
  }

  // 新增文章
  async addAtricle(articleInfo) { 
    const article = new Article()
    article.set(articleInfo)
    return await article.save()
  }
}

export default new ArticleService()