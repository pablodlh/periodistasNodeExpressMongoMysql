/*eslint-disable*/
import type Noticia from './Noticia'
import type Message from '../../../context/responses/Message'
export default interface NoticiaRepository {
    getNoticias(): Promise<Noticia[] | undefined>
    getNoticiaById(id: string): Promise<Noticia | undefined>
    getNoticiasByPeriodista(id: number): Promise<Noticia[] | undefined>
    addNoticia(noticia: Noticia): Promise<Message>
    deleteNoticia(id: string): Promise<Message>
}