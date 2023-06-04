import { DataTypes } from "sequelize"

import seq from "../db/seq.js"


const Article = seq.define('Article', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '文章分类'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
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
    allowNull: true,
    comment: '文章内容'
  },
  praise_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '文章点赞数'
  },
  comment_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '文章评论数'
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '文章封面'
  },
  draft: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 1,
    comment: '是否为草稿，1为草稿，0为正式稿'
  },
  state: {
    type: DataTypes.ENUM,
    values: ['待审核', '已发布'],
    allowNull: false,
    defaultValue: '待审核',
    comment: '文章状态，0：待审核，1：成功发布'
  },
  is_delete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否删除，0：有效，1：删除'
  }
})

// Article.sync({force: true})

export default Article