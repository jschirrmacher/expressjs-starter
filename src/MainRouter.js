const fs = require('fs')
const path = require('path')
const express = require('express')
const Mustache = require('mustache')

const greeter = require('./SendGreeting')

const router = express.Router()
const publicDir = path.resolve(__dirname, '..', 'public')
const templatesFolder = path.join(__dirname, '..', 'templates')

router.use('/', express.static(publicDir))
router.use(nocache)
router.post('/api/hello', jsonHandlerFor(greeter))
router.post('/page/hello', htmlHandlerFor(greeter))

module.exports = router

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.header('Expires', '-1')
  res.header('Pragma', 'no-cache')
  next()
}

function jsonHandlerFor(func) {
  return async (req, res, next) => {
    try {
      res.json(await func(req))
    } catch (error) {
      res.status(error.status || 500).json(error)
      next(error)
    }
  }
}

function htmlHandlerFor(func) {
  return async (req, res, next) => {
    try {
      const result = await func(req)
      if (result.template) {
        res.send(template(result.template, result.params))
      } else {
        res.send(result)
      }
    } catch (error) {
      res.status(error.status || 500).send(error)
      next(error)
    }
  }
}

function template(name, params) {
  const fileContent = '' + fs.readFileSync(path.join(templatesFolder, name + '.mustache'))
  return Mustache.render(fileContent, params)
}
