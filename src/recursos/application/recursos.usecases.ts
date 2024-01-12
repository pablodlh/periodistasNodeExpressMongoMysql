import type Recruso from '../domain/Recurso'
import type RecursoRepository from '../domain/recursos.repository'
import type Message from '../../../context/responses/Message'

export default class RecursoUseCases {
  recursoRepository: RecursoRepository
  constructor (recursoRepository: RecursoRepository) {
    this.recursoRepository = recursoRepository
  }

  async addRecurso (recurso: Recruso): Promise<Message> {
    return await this.recursoRepository.addRecurso(recurso)
  }

  async deleteRecurso (idRecurso: number): Promise<Message> {
    return await this.recursoRepository.deleteRecurso(idRecurso)
  }

  async getRecursosById (idRecurso: number): Promise<Recruso | undefined> {
    return await this.recursoRepository.getRecursoById(idRecurso)
  }
}
