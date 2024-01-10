/*eslint-disable*/
import { ObjectId } from "mongodb";
import { collections } from '../../../../context/MongoConnection'
import type Noticia from "../../domain/Noticia";
import type NoticiaRepository from "../../domain/noticias.repository";
import type Message from "../../../../context/responses/Message";

export default class NoticiaRepositoryMongo implements NoticiaRepository {
    async getNoticias(): Promise<Noticia[] | undefined> {
        const noticiasFromDb = await collections.noticias.find().toArray()
        if(!noticiasFromDb) return undefined

        const noticias: Noticia[] = noticiasFromDb.map((noticiaFromDB) => {
            const noticia: Noticia = {
              id: String(noticiaFromDB._id),
              titulo: noticiaFromDB.titulo,
                texto: noticiaFromDB.texto,
                periodistas: noticiaFromDB.periodistas,
                recursos: noticiaFromDB.recursos
            }
            return noticia
        })
        return noticias
    }

    async getNoticiaById(id: string): Promise<Noticia | undefined> {
     
        const obejectId = new ObjectId(id)
        const noticiaFromDB = await collections.noticias.findOne({ _id: obejectId })
        if (!noticiaFromDB) return undefined
        const noticia: Noticia = {
          id: String(noticiaFromDB._id),
          titulo: noticiaFromDB.titulo,
          texto: noticiaFromDB.texto,
          periodistas: noticiaFromDB.periodistas,
          recursos: noticiaFromDB.recursos

        }
        return noticia
      }

      async getNoticiasByPeriodista(id: number): Promise<Noticia[] | undefined> {

        const noticiasFromDb = await collections.noticias.find({ periodistas: id }).toArray()
        if(!noticiasFromDb) return undefined

        const noticias: Noticia[] = noticiasFromDb.map((noticiaFromDB) => {
            const noticia: Noticia = {
              id: String(noticiaFromDB._id),
              titulo: noticiaFromDB.titulo,
                texto: noticiaFromDB.texto,
                periodistas: noticiaFromDB.periodistas,
                recursos: noticiaFromDB.recursos
            }
            return noticia
        })
        return noticias
      }

      async addNoticia(noticia: Noticia): Promise<Message> {
        const noticiaToDB = {
          titulo: noticia.titulo,
          texto: noticia.texto,
          periodistas: noticia.periodistas,
          recursos: noticia.recursos
        }
            const result = await collections.proyectos.insertOne(noticiaToDB)
            const id = String(result.insertedId)
        const message: Message = {
            text: `la noticia con id ${id} ha sido creada`
        }
        return message
      }

      async deleteNoticia(id: string): Promise<Message> {
        const objectId = new ObjectId(id)
        const result = await collections.noticias.deleteOne({ _id: objectId })
        const idBorrado =  String(result.deletedCount)
        const message: Message = {
            text: `la noticia con id ${idBorrado} ha sido eliminada`
        }
        return message
      }

}