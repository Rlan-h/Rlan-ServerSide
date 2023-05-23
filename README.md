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



















