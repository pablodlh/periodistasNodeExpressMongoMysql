/* eslint-disable @typescript-eslint/no-floating-promises */
import express from 'express'
import dotenv from 'dotenv'
import { routerPeriodistas } from './periodistas/interface/rest/periodistas.router'
import { routerNoticias } from './noticias/interface/rest/noticias.router'

dotenv.config()

const app = express()
const port = 3000
app.use(express.json())
// Routers
app.use('/api/periodistas', routerPeriodistas)
app.use('/api/noticias', routerNoticias)

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`)
})
