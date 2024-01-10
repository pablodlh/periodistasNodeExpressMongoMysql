import type Periodista from '../domain/Periodista'
import type PeriodistaRepository from '../domain/periodistas.repository'
import type Message from '../../../context/responses/Message'

export default class PeriodistaUseCases {
  periodistaRepository: PeriodistaRepository

  constructor (periodistaRepository: PeriodistaRepository) {
    this.periodistaRepository = periodistaRepository
  }

  async addPeriodista (periodista: Periodista): Promise<Message> {
    return await this.periodistaRepository.addPeriodista(periodista)
  }

  async deletePeriodista (idPeriodista: number): Promise<Message> {
    return await this.periodistaRepository.deletePeriodista(idPeriodista)
  }
}
