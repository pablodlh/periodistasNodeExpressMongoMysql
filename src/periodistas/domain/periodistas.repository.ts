import type Periodista from './Periodista'
import type Message from '../../../context/responses/Message'
export default interface PeriodistaRepository {
  addPeriodista: (periodista: Periodista) => Promise<Message>
  /*
  getPeriodistaById: (id: number) => Promise<Periodista | undefined>
  getAllPeriodistas: () => Promise<Periodista[] | undefined>
  */
}
