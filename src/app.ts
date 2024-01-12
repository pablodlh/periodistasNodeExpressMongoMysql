/* eslint-disable @typescript-eslint/no-floating-promises */
import express from 'express'
import dotenv from 'dotenv'
import { routerPeriodistas } from './periodistas/interface/rest/periodistas.router'
import { routerNoticias, noticias } from './noticias/interface/rest/noticias.router'
import createMongoConnection from '../context/MongoConnection'

createMongoConnection()
dotenv.config()

const app = express()
const port = 3000
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use('/api/periodistas', routerPeriodistas)
app.use('/api/noticias', routerNoticias)

app.get('/web', (req, res) => {
  res.render('noticias', { noticias })
})

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`)
})
