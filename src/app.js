import express from 'express'

import config from './config/config_default.js'

// 导入路由模块
import accountRouter from './routers/account_router.js'
import userRouter from './routers/user_router.js'
import articleRouter from './routers/article_router.js'
import categoryRouter from './routers/category_router.js'
import commentRouter from './routers/comment_router.js'

const app = express()

// 配置解析 json 格式数据的中间件
app.use(express.json())
// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 注册路由
app.use('/api', accountRouter)
  .use('/my', userRouter)
  .use('/my', articleRouter)
  .use('/my/article', categoryRouter)
  .use('/my/article', commentRouter)

app.listen(config.APP_PORT, () => {
  console.log(`server is running at http://127.0.0.1:${config.APP_PORT}`)
})