import express from 'express'

// 导入路由模块
import accountRouter from './routers/account_router.js'
import userRouter from './routers/user_router.js'
import articleRouter from './routers/article_router.js'
import categoryRouter from './routers/category_router.js'
import commentRouter from './routers/comment_router.js'

const app = express()

// 注册路由
app.use('/api', accountRouter)
  .use('/my', userRouter)
  .use('/my', articleRouter)
  .use('/my/article', categoryRouter)
  .use('/my/article', commentRouter)

app.listen(3000, () => {
  console.log('server is running at http://127.0.0.1:3000')
})