const express = require('express')
const accountRouter = require('./accounts/accounts-router')

const server = express()

server.use(express.json())
server.use('/api/accounts', accountRouter)

server.use('*', (req, res, next) => {//eslint-disable-line
  res.status(404).json({
    message: 'not found',
  })
})

module.exports = server
