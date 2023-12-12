/* eslint-disable @typescript-eslint/no-floating-promises */
import express from 'express'
import createMongoConnection from '../context/MongoConnection'
import createPgConnection from '../context/Postgress.Connection'
const app = express()
const port = 3000

app.use(express.json())
createPgConnection('select *')

createMongoConnection()
app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`)
})
