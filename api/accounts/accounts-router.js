const Accounts = require('./accounts-model')
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require('./accounts-middleware')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll()
    res.json(accounts)
    next()
  } catch (err) {
    next(err)
  }
})

//eslint-disable-next-line
router.get('/:id', checkAccountId, async (req, res, next) => {
  res.json(req.account)
})

router.post(
  '/',
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAcct = await Accounts.create(req.body)
      res.json(newAcct)
    } catch (err) {
      next(err)
    }
  }
)

router.put(
  '/:id',
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const updated = await Accounts.updateById(req.params.id, req.body)
      res.json(updated)
    } catch (err) {
      next(err)
    }
  }
)

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deleted = await Accounts.deleteById(req.params.id)
    res.json(deleted)
  } catch (err) {
    next(err)
  }
})

//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router
