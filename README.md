# 一、项目初始化

## 1、npm 初始化

生成 `package.json` 文件，记录项目依赖

~~~
npm init -y
~~~

## 2、git 初始化

初始化 `git` 本地仓库

~~~
git init
~~~

新建 `.gitignore` 文件，配置提交代码时需要忽略的文件

## 3、创建 README.md 项目说明文档

# 二、搭建项目

## 1、安装 express 框架

~~~
npm install express
~~~



## 2、创建最基本的 web 服务器

新建 `src/app.js`

~~~js
import express from 'express'

const app = express()

app.listen(3000, () => {
  console.log('server is running at http://127.0.0.1:3000')
})
~~~

在 `package.json` 文件的 `scripts` 结点中配置项目启动指令

~~~json
  "scripts": {
    "start": "nodemon src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
~~~

在项目根目录下打开终端，输入：

~~~
npm run start
~~~

启动项目，可在终端中看见如下字样

![image-20230523233640522](assets/image-20230523233640522.png)

# 三、添加路由

## 1、账户路由

新建 `src/routers/account.router.js`

~~~js
import express from 'express'

const router = express.Router()

// 注册路由
router.post('/register', (req, res) => {
  res.send('ok')
})

export default router
~~~

## 2、用户路由

新建 `src/routers/user.router.js`

~~~js
import express from 'express'

const router = express.Router()

// 修改用户信息
router.put('/user', (req, res) => {
  res.send('修改用户信息成功')
})

export default router
~~~

## 3、文章路由

新建 `src/routers/article.router.js`

~~~js
import express from 'express'

const router = express.Router()

// 发布文章
router.post('/article', (req, res) => {
  res.send('发布文章成功')
})

export default router
~~~

## 4、文章分类标签路由

新建 `src/routers/category.router.js`

~~~js
import express from 'express'

const router = express.Router()

// 新增文章分类标签
router.post('/category', (req, res) => {
  res.send('新增文章分类标签成功')
})

export default router
~~~

## 5、评论路由

新建 `src/routers/comment.router.js`

~~~js
import express from 'express'

const router = express.Router()

// 发布评论
router.post('/comment', (req, res) => {
  res.send('发布评论成功')
})

export default router
~~~

# 四、注册路由

在 `src/app.js` 中导入路由模块，并注册

~~~js
// 导入路由模块
import accountRouter from './routers/account_router.js'
import userRouter from './routers/user_router.js'
import articleRouter from './routers/article_router.js'
import categoryRouter from './routers/category_router.js'
import commentRouter from './routers/comment_router.js'

// 注册路由
app.use('/api', accountRouter)
  .use('/my', userRouter)
  .use('/my', articleRouter)
  .use('/my/article', categoryRouter)
  .use('/my/article', commentRouter)
~~~

# 五、账户模块

该模块需实现一下功能

- 用户注册
- 用户登录
- 用户登出

## 1、用户注册



































