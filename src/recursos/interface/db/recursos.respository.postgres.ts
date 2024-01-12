/* eslint-disable */
import type Recruso from '../../domain/Recurso'
import type RecursoRepository from '../../domain/recursos.repository'
import executeQuery from '../../../../context/Postgress.Connection'
import type Message from '../../../../context/responses/Message'

export default class RecursosRepositoryPostgres implements RecursoRepository{

    async addRecurso (recurso: Recruso): Promise<Message> {
        if (recurso.url != null) {
    
          await executeQuery(
                `insert into recursos values ('${recurso.url}')`
          )
          const message: Message = {
            text: `El recurso ha sido creado correctamente`
          }
              return message
        }
        const message: Message = {
          text: 'No se ha proporcionado correctamente el recurso'
        }
        return message
      }

      async deleteRecurso (id: number): Promise<Message>{
        await executeQuery(
          `delete from recursos where id = '${id}'` 
        )
          const message: Message= {
            text: `el recurso con id ${id} ha sido borrado correctamente`
          }
          return message;
      }
      async getRecursoById (id: number): Promise<Recruso | undefined> {
        const result = await executeQuery(
          `select * from recursos where id = '${id}'`
        )
        if (result.length === 0) return undefined
        const recurso: Recruso = {
          id: result[0].id,
          url: result[0].url
        }
        return recurso
      }

}