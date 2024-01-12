/* eslint-disable */
import express from 'express'
import dotenv from 'dotenv'
import { routerPeriodistas } from './periodistas/interface/rest/periodistas.router'
import { routerNoticias } from './noticias/interface/rest/noticias.router'
import createMongoConnection from '../context/MongoConnection'
import { noticiasRepo } from './noticias/interface/db/noticias.repository.mongo'

createMongoConnection()
dotenv.config()

const app = express()
const port = 3000
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use('/api/periodistas', routerPeriodistas)
app.use('/api/noticias', routerNoticias)

app.get('/noticias', async (req, res) => {
  const noticias = await noticiasRepo.devolverConstanteNoticias();
  res.render('noticias', { noticias })
})

noticiasRepo.devolverConstanteNoticias().then(noticias => {
  console.log(noticias);
});
app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`)
})
