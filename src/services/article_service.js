import Article from "../models/article_model.js"

class ArticleService {

  // 保存封面图片
  async saveCoverImg(author, cover) {
    return await Article.create({author, cover})
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

  // 获取草稿文章
  async queryDraftArticles(author) {
    
    return await Article.findAll({
      where: {
        author,
        draft: 1
      }
    })
  }

  // 新增文章
  async addAtricle(articleInfo, author) { 
    const article = new Article()
    article.cover = 'covers/default.jpg'
    article.author = author
    article.set(articleInfo)
    return await article.save()
  }


  // 修改文章
  async updateArticle(where, newInfo) {
    // console.log(where)
    const genInfo = await Article.findOne({ where })
    // console.log(genInfo)
    genInfo.set(newInfo)
    // console.log(genInfo)
    return await genInfo.save()
  }


  // 删除文章
  async deleteArticle(where) { 
    const genInfo = await Article.findOne({ where })
    // console.log(genInfo)
    genInfo.set({ is_delete: 1 })
    return await genInfo.save()
  }
}

export default new ArticleService()