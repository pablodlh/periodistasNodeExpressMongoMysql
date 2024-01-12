import type Periodista from './Periodista'
import type Message from '../../../context/responses/Message'
export default interface PeriodistaRepository {
  addPeriodista: (periodista: Periodista) => Promise<Message>
  deletePeriodista: (idPeriodista: number) => Promise<Message>
  getPeriodistaById: (idPeriodista: number) => Promise<Periodista | undefined>
  getPeriodistas: () => Promise<Periodista[]>
  editPeriodista: (idPeriodista: number, fechaNacimiento: Date, nombrePeriodista: string) => Promise<Message>
}
