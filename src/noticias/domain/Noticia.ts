import type Periodista from '../../periodistas/domain/Periodista'
import type Recurso from '../../recursos/domain/Recurso'

export default interface Noticia {
  id: string
  titulo: string
  texto: string
  periodistas: Periodista[]
  recursos: Recurso[]
}
