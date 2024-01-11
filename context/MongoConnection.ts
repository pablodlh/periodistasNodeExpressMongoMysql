import type { Collection, Db } from 'mongodb'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()
const url = process.env.DB_CONN_STRING ?? 'mongodb://localhost:27017'
const dbName = process.env.DB_NAME ?? 'noticiasDB'
const collections: Record<string, Collection> = {}

async function createMongoConnection (): Promise<any> {
  try {
    const client = await MongoClient.connect(url)
    const db = client.db(dbName)
    addCollections(db)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Connecting to MongoDB...')
    console.error('Error connecting to MongoDB:', error)
  }
}

const addCollections = (db: Db): any => {
  collections.noticias = db.collection(
    process.env.NOTICIAS_COLLECTION ?? 'noticias'
  )
}

export default createMongoConnection
export { collections }
