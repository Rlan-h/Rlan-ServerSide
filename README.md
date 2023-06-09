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

app.use(express.json())   // 配置解析json字符串

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

新建 `src/routers/account_router.js`

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

新建 `src/routers/user_router.js`

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

新建 `src/routers/article_router.js`

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

新建 `src/routers/category_router.js`

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

新建 `src/routers/comment_router.js`

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

# 五、模型设计

## 1、账户模型

**accounts**

| 字段         | id     | user_name | password | email  | shield         | cancel           |
| ------------ | ------ | --------- | -------- | ------ | -------------- | ---------------- |
| **数据类型** | Number | String    | String   | String | Number         | Number           |
| **是否为空** | false  | false     | false    | false  |                |                  |
| **默认值**   |        |           |          |        | 0              | 0                |
| **说明**     | 编号   | 用户名    | 密码     | 邮箱   | 标识是否被拉黑 | 标识账户是否注销 |

## 2、用户模型

**users**

| 字段         | id     | user_name | age    | career | intro  | head_pic |
| ------------ | ------ | --------- | ------ | ------ | ------ | -------- |
| **数据类型** | Number | String    | Number | String | String | String   |
| **是否为空** | false  | fasle     |        |        |        |          |
| **默认值**   |        |           |        |        |        |          |
| **说明**     | 编号   | 用户名    | 年龄   | 职业   | 简介   | 头像     |

## 3、文章模型

**article**

| 字段         | uuid   | category | title  | author | content | date  | praiseNum | commentNum | cover | state                      |
| ------------ | ------ | -------- | ------ | ------ | ------- | ----- | --------- | ---------- | ----- | -------------------------- |
| **数据类型** | Number | String   | String | String | Text    | Date  | Number    | Number     | Blob  | Blooen                     |
| **是否为空** | false  | false    | false  | false  | false   | false |           |            |       |                            |
| **默认值**   |        |          |        |        |         |       | 0         | 0          |       | 0                          |
| **说明**     | 编号   | 文章分类 | 标题   | 作者   | 内容    | 日期  | 点赞数    | 评论数     | 封面  | 状态，0为待审核，1为已发布 |

## 4、评论模型

**comment**

|      |      |      |      |
| ---- | ---- | ---- | ---- |
|      |      |      |      |
|      |      |      |      |
|      |      |      |      |
|      |      |      |      |



# 六、连接数据库

根目录下新建 `.env` 文件，配置数据库连接参数

```.env
APP_PORT = 3000

MYSQL_HOST = localhost
MYSQL_PORT = 3306
MYSQL_USER = root
MYSQL_PWD = root
MYSQ_DB = blog
```

安装 `dotenv` 第三方依赖

~~~
npm install dotenv
~~~

新建 `src/config/config_default.js` 将环境变量导出

~~~js
import * as dotenv from 'dotenv'

dotenv.config()

const { APP_PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = process.env

export { APP_PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB }
~~~

新建 `src/db/seq.js` 连接数据库

~~~js
import { Sequelize } from "sequelize"

import { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } from '../config/config_default.js'

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql'
})

// seq.authenticate()
//   .then(() => {
//     console.log('数据库连接成功')
//   })
//   .catch((err) => console.log('数据库连接失败', err))
  
export default seq
~~~

**测试**

~~~
node src/db/seq.js
~~~

终端输出 数据库连接成功

# 七、账户管理

该模块需实现一下功能

- 用户注册
- 用户登录
- 用户登出

新建 `src/controllers/account_controller.js` 用于执行业务逻辑

~~~js
class AccountController {
  
  async register(req, res, next) {
    res.send('注册成功')
  }

  async login(req, res, next) {
    
  }

  async logout(req, res, next) {
    
  }

}

export default new AccountController()
~~~

新建 `src/services/account_service.js` 用于执行数据库相关操作

~~~js
~~~

新建 `src/middlewares/account_middleware.js` 用于在执行业务逻辑之前，对客户端发送的请求参数进行校验

~~~js
~~~

## 1、用户注册

请求方式：post

请求路径：/api/register

请求参数：user_name (用户名)		password (密码)		email (邮箱)

**`src/models/account_model.js`**

~~~js
import { DataTypes } from "sequelize"

import seq from "../db/seq.js"

// 定义模型
const Account = seq.define('Account', {
  // id 会被自动创建，管理
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1,12]
    },
    comment: '用户名，唯一'
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: {
      len: [6, 64]
    },
    comment: '密码'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
    comment: '邮箱'
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员，默认为0，1为管理员，0不是管理员'
  },
  shield: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '标识是否被拉黑，默认为0，0为未被拉黑，1为已被拉黑'
  },
  cancel: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '标识是否注销，默认为0，0为未注销，1为已注销'
  }
})

// 可强制重建
// Account.sync({ force: true })

export default Account
~~~

**`src/routers/account_router.js`**

~~~js
import express from 'express'

import account_controller from '../controllers/account_controller.js'
import { accountValidator, accountVerify, bcryptPwd } from '../middlewares/account_middleware.js'

const router = express.Router()

// 注册路由
router.post('/register', accountValidator, accountVerify, bcryptPwd, account_controller.register)

export default router
~~~

**`src/controllers/account_controller.js`**

~~~js
import { Sequelize } from 'sequelize'
import account_service from '../services/account_service.js'
import seq from '../db/seq.js'

class AccountController {
  async register(req, res, next) {
    // 1. 获取数据
    const { user_name, password, email } = req.body
    try {
      const result = await account_service.createAccount(user_name, password, email)
      res.send({
        code: 0,
        message: '注册成功',
        result: {
          id: result.id,
          user_name: result.user_name
        }
      })
    } catch (error) {
      seq.query('ALTER TABLE accounts AUTO_INCREMENT = 1')
      if (error instanceof Sequelize.ValidationError) {
        const errors = error.errors.map(err => ({
          message: err.message,
          field: err.path,
          type: err.validatorKey,
          args: err.validatorArgs
        }))
        return res.send({
          code: 10001,
          // message: error.message === 'Validation len on user_name failed' ? '' : '',
          message: '注册失败',
          result: errors
        })
      }
    }
  }
  async login(req, res, next) {}

  async logout(req, res, next) {}
}

export default new AccountController()
~~~

**`src/services/account_service.js`**

~~~js
import Account from "../models/account_model.js"

class AccountService {
  async createAccount(user_name, password, email) {
    // 插入数据
    const res = await Account.create({ user_name, password, email })
    return res.dataValues
  }

  async getAccountInfo({ id, user_name, password, email, is_admin }) {
    const whereOpt = {}
    // 当 id 存在时，把 id 的值拷贝到 whereOpt
    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, {user_name})
    password && Object.assign(whereOpt, {password})
    email && Object.assign(whereOpt, {email})
    is_admin && Object.assign(whereOpt, { is_admin })
    
    const res = await Account.findOne({
      // 需要查询的字段
      attributes: ['id', 'user_name', 'password', 'email', 'is_admin', 'shield', 'cancel'],
      // attributes,
      where: whereOpt
    })
    return res ? res.dataValues : ''
  }
}

export default new AccountService()
~~~

**`src/middlewares/account_middleware.js`**

~~~js
import bcrypt from 'bcryptjs'
import account_service from '../services/account_service.js'

const accountValidator = async (req, res, next) => {
  let { user_name, password, email } = req.body
  user_name = user_name.trim()
  password = password.trim()
  email = email.trim()
  if (!user_name) {
    console.error('用户名为空', req.body)
    return res.send({
      code: 1,
      message: '用户名不可为空',
      result: req.body
    })
  }
  if (!password) {
    console.error('密码为空', req.body)
    return res.send({
      code: 1,
      message: '密码不可为空',
      result: req.body
    })
  }
  if (password.toString().length < 6 || password.toString().length > 20) {
    return res.send({
      code: 1,
      message: '密码长度需满足6~20',
      result: req.body
    })
  }
  if (!email) {
    console.error('邮箱为空', req.body)
    return res.send({
      code: 1,
      message: '邮箱不可为空',
      result: req.body
    })
  }

  await next()
}

const accountVerify = async (req, res, next) => {
  const { user_name, email } = req.body
  try {
    const userRes = await account_service.getAccountInfo({ user_name })
    if (userRes) {
      return res.send({
        code: 1,
        message: '该用户名已被注册，请更换重试',
        result: user_name
      })
    }
    const emailRes = await account_service.getAccountInfo({ email })
    if (emailRes) {
      return res.send({
        code: 1,
        message: '该邮箱已被注册，请更换重试',
        result: email
      })
    }
    await next()
  } catch (error) {
    console.log(error)
    return res.send(error)
  }
}

// 密码加密
const bcryptPwd = async (req, res, next) => {
  const { password } = req.body
  const salt = bcrypt.genSaltSync(10)
  // hash 是加密过的密码
  const hash = bcrypt.hashSync(password, salt)
  req.body.password = hash

  await next()
}

export {
  accountValidator,
  accountVerify,
  bcryptPwd
}

~~~

## 2、用户登录

请求方法：post

请求路径：/api/login

请求参数：user_name (用户名)		password (密码)

**`src/routers/account_router.js`**

~~~js
// 登录路由
router.post('/login', account_controller.login)
~~~

**`src/controllers/account_controller.js`**

~~~js
async login(req, res, next) {
    // 1. 获取数据
    const { user_name } = req.body
    try {
      // 2. 查询数据库，判断是否存在该用户
      const { password, ...account } = await account_service.getAccountInfo({ user_name })
      // 2.1 存在该用户，验证密码是否正确
      const compareRes = bcrypt.compareSync(req.body.password, password)
      if (compareRes) {
        // 2.2 密码正确，生成 token
        res.send({
          code: 0,
          message: '登录成功',
          result: {
            token: 'Bearer ' + jtw.sign(account, config.TOKEN_SECRET, {expiresIn: config.TOKEN_EXPIRESIN})
          }
        })
      }
    } catch (error) {
      console.error('登录失败', error)
      return res.send({
        code: 1,
        message: '登录失败',
        result: ''
      })
    }
  }
~~~

# 八、用户信息管理

## 1、修改用户信息

### （1）修改基本信息



### （2）更换头像







# 九、文章管理

## 1、获取文章

### （1）获取所有文章



### （2）根据 `id` 获取文章



### （3）获取指定用户的文章



### （4）获取指定分类的文章







## 2、发布文章

>思路：该接口拆分为两个接口实现，**封面上传接口** 和 **其他信息上传接口** ，创建一个文章表 跟 草稿表，封面上传直接存在草稿表中，如果接着用户提交其他文章信息，则连同刚刚的封面一起存入文章表中；如果用户上传封面之后未及时上传其他文章信息，则下次上传文章信息时加载之前提交的草稿，下次发布文章之前未上传新的封面图片，则使用之前的草稿封面连同其他文章信息一同存入文章表中，且删除掉该草稿；如若下次发布文章之前上传了新的封面，则以新封面替换掉草稿封面存入草稿表，并且删除静态资源中上次上传的封面。

> 或者对之上传了封面的记录添加一个草稿字段,每次发布文章之前查询该用户名下是否有草稿记录,有则使用草稿继续补全剩余文章信息



## 3、修改文章



## 4、删除文章





# 十、文章分类标签管理

## 1、添加分类



## 2、删除分类



## 3、获取分类



# 十 一、评论管理

> 评论表的设计需要根据具体的业务需求和系统架构来进行规划，一般需要考虑以下几个方面：
>
> 1. 评论内容：评论内容是评论表最重要的字段之一，需要定义为可变长字符串类型。同时，为了避免安全风险，需要对评论内容进行敏感词过滤等处理。
> 2. 评论时间：评论时间表示评论的创建时间，可以使用系统当前时间或用户输入的时间。通常会在数据库中存储为日期类型。
> 3. 评论人：评论人一般需要记录昵称、头像、用户ID等信息，以便后续展示或查询。可以通过用户表和评论表进行关联，或者将用户信息直接存储在评论表中。
> 4. 父级评论ID：如果业务需求中需要支持回复评论，则需要引入父级评论ID字段，用于记录该评论所回复的原始评论ID。可以将该字段设置为可空，以便区分主题评论和回复评论。
> 5. 状态标记：状态标记可以用来记录评论是否已被删除、禁用等状态，一般使用枚举类型进行定义，例如：正常、已删除、已禁用等。
> 6. 记录其他元数据：为了更好地进行数据分析和管理，可以考虑在评论表中添加其他元数据，例如点赞数、反对数、浏览量等。这些元数据可以帮助系统分析评论的热度和质量，以便更好地优化评论系统。
>
> 总之，在设计评论表时需要充分考虑业务需求、数据安全性、性能等因素，同时遵守数据库设计原则，例如减少冗余字段、保证数据一致性等。



## 1、发表评论



## 2、删除评论























































