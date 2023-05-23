import express from 'express'

const app = express()

app.listen(3000, () => {
  console.log('server is running at http://127.0.0.1:3000')
})