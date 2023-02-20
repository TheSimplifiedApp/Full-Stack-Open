import express from 'express'
import diagnoseService from '../services/diagnoseService'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoses())
})

router.get('/:code', (req, res) => {
  const code = req.params.code
  const diagnose = diagnoseService.findByCode(code)
  if (diagnose) {
    res.send(diagnose)
  } else {
    res.sendStatus(404)
  }
})

router.post('/', (_req, res) => {
  res.send('Saving a diary')
})

export default router