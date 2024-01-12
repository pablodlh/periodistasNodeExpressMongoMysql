/* eslint-disable */
import type Periodista from '../../domain/Periodista'
import type PeriodistaRepository from '../../domain/periodistas.repository'
import executeQuery from '../../../../context/Postgress.Connection'
import type Message from '../../../../context/responses/Message'

export default class PeriodistasRepositoryPostgres implements PeriodistaRepository{
  async addPeriodista (periodista: Periodista): Promise<Message> {
    if (periodista.nombre != null && periodista.fechaNacimiento != null) {

      let result = await executeQuery( 'SELECT MAX(id) FROM periodistas')
      console.log(result)
      let id = result[0].max;
      let idNuevo = id + 1;

      console.log(result)

      await executeQuery(
            `insert into periodistas values ('${idNuevo}','${periodista.nombre}','${periodista.fechaNacimiento}')`
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

  async deletePeriodista (idPeriodista: number): Promise<Message>{
    await executeQuery(
      `delete from Periodistas where id = ${idPeriodista}` 
    )
      const message: Message= {
        text: `el periodista con id ${idPeriodista} ha sido borrado correctamente`
      }
      return message;
  }

  async getPeriodistaById (idPeriodista: number): Promise<Periodista | undefined> {
    const result = await executeQuery(
      `select * from periodistas where id = ${idPeriodista}`
    )
    if (result.length === 0) return undefined
    const periodista: Periodista = {
      id: result[0].id,
      nombre: result[0].nombre,
      fechaNacimiento: result[0].fechaNacimiento
    }
    return periodista
  }

  async getPeriodistas(): Promise<Periodista[]> {
    const result = await executeQuery(
      'select * from periodistas'
    )
    const periodistas: Periodista[] = result.map((periodista: any) => {
      return {
        id: periodista.id,
        nombre: periodista.nombre,
        fechaNacimiento: periodista.fechaNacimiento
      }
    })
    return periodistas
  }

  async editPeriodista (idPeriodista: number, fechaNacimiento: Date, nombrePeriodista: string): Promise<Message> {
    await executeQuery(
      `update periodistas set nombre = '${nombrePeriodista}', fechaNacimiento = '${fechaNacimiento}' where id = ${idPeriodista}`
    )
    const message: Message = {
      text: `El periodista con id ${idPeriodista} ha sido actualizado`
    }
    return message
  }
}
