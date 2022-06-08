import cors from 'cors'
import API from './api.js'
import express from 'express'

const app = express()
app.use(cors())

app.get('/produtos', async (req, res) => {
  const { status, data } = await API.PRODUTOS({ fq: req.query.ponto })
  res.status(status).send(data)
})

app.get('/pontos', async (req, res) => {
  const { status, data } = await API.PONTOS_DE_VENDAS({ country: 'BRA', postalCode: req.query.cep })
  res.status(status).send(data)
})

app.listen(3001, () => {
  console.log('App listening on port 3001!')
})
