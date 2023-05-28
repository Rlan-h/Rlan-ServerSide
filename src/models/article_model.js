import { DataTypes } from "sequelize"

import seq from "../db/seq.js"

const Article = seq.define('Article', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '文章分类'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '文章标题'
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '文章作者'
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: '文章发布日期'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '文章内容'
  },
  praiseNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '文章点赞数'
  },
  commentNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '文章评论数'
  },
  cover: {
    type: DataTypes.BLOB,
    allowNull: true,
    comment: '文章封面'
  },
  state: {
    type: DataTypes.ENUM,
    values: ['待审核', '已发布'],
    allowNull: false,
    defaultValue: '待审核',
    comment: '文章状态，0：待审核，1：成功发布'
  }
})

// Article.sync({force: true})

export default Article