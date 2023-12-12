/* eslint-disable */
import type Periodista from '../../domain/Periodista'
import type PeriodistaRepository from '../../domain/periodistas.repository'
import executeQuery from '../../../../context/Postgress.Connection'
import type Message from '../../../../context/responses/Message'

export default class PeriodistasRepositoryPostgres implements PeriodistaRepository{
  async addPeriodista (periodista: Periodista): Promise<Message> {
    if (periodista.nombre != null && periodista.fechaNacimiento != null) {
      await executeQuery(
            `insert into periodistas values ('${periodista.nombre}','${periodista.fechaNacimiento})`
      )
      const message: Message = {
        text: `El usuario ${periodista.nombre} ha sido creado`
      }
          return message
    }
    const message: Message = {
      text: 'No se ha proporcionado correctamente el usuario'
    }
    return message
  }
}
