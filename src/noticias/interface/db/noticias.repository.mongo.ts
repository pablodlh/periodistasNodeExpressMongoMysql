/*eslint-disable*/
import { ObjectId } from "mongodb";
import { collections } from '../../../../context/MongoConnection'
import type Noticia from "../../domain/Noticia";
import type NoticiaRepository from "../../domain/noticias.repository";
import type Message from "../../../../context/responses/Message";
import createMongoConnection from '../../../../context/MongoConnection'
import PeriodistasRepositoryPostgres from "../../../periodistas/interface/db/periodistas.repository.postgres";
import RecursosRepositoryPostgres from "../../../recursos/interface/db/recursos.respository.postgres";
import Periodista from "../../../periodistas/domain/Periodista";
import Recurso from "../../../recursos/domain/Recurso";


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
            const result = await collections.noticias.insertOne(noticiaToDB)
            const id = String(result.insertedId)
        const message: Message = {
            text: `la noticia con id ${id} ha sido creada`
        }
        return message
      }

      async deleteNoticia(id: string): Promise<Message> {
        const objectId = new ObjectId(id)
        const result = await collections.noticias.deleteOne({ _id: objectId })
        const numeroBorrado =  String(result.deletedCount)
        const message: Message = {
            text: `se ha eliminado ${numeroBorrado} noticia`
        }
        return message
      }








      async devolverConstanteNoticias() {
        return createMongoConnection().then(async () => {
          const noticiasRepo = new NoticiaRepositoryMongo();
          const periodistaRepo = new PeriodistasRepositoryPostgres();
          const recursoRepo = new RecursosRepositoryPostgres();
      
          const NoticiasIniciales: Noticia[] | undefined = await noticiasRepo.getNoticias();
          const nuevasNoticias = [];
      
          if(NoticiasIniciales){
            for (const noticia of NoticiasIniciales) {
              const nuevaNoticia = { ...noticia }; 
              const nombresPeriodistas = [];
              const urlsRecursos = [];
              for (const idPeriodista of nuevaNoticia.periodistas.map(Number)) {
                const periodista = await periodistaRepo.getPeriodistaById(idPeriodista);
                if (periodista) {
                  nombresPeriodistas.push(periodista.nombre);
                }
              }
              for (const idRecurso of nuevaNoticia.recursos.map(Number)) {
                const recurso = await recursoRepo.getRecursoById(idRecurso);
                if (recurso) {
                  urlsRecursos.push(recurso.url);
                }
              }
              nuevaNoticia.periodistas = nombresPeriodistas;
              nuevaNoticia.recursos = urlsRecursos;
              nuevasNoticias.push(nuevaNoticia); 
            }
          }
      
          return nuevasNoticias;
        });
      }

    }


const noticiasRepo = new NoticiaRepositoryMongo();
export { noticiasRepo } 
