import type Recurso from './Recurso'
import type Message from '../../../context/responses/Message'
export default interface RecursoRepository {
  addRecurso: (recurso: Recurso) => Promise<Message>
  deleteRecurso: (idRecurso: number) => Promise<Message>
}
