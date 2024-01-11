/* eslint-disable */
import type Noticia from "../domain/Noticia"
import type Message from "../../../context/responses/Message"
import type NoticiaRepository from "../domain/noticias.repository"
export default class NoticiaUseCases {

    private noticiaRepository: NoticiaRepository

    constructor(noticiaRepository: NoticiaRepository) {
        this.noticiaRepository = noticiaRepository
    }

    async getNoticias(): Promise<Noticia[]| undefined> {
        return await this.noticiaRepository.getNoticias()
    }

    async getNoticiaById(id: string): Promise<Noticia | undefined> {
        return await this.noticiaRepository.getNoticiaById(id)
    }

    async getNoticiasByPeriodista(id: number): Promise<Noticia[] | undefined> {
        return await this.noticiaRepository.getNoticiasByPeriodista(id)
    }

    async addNoticia(noticia: Noticia): Promise<Message> {
        return await this.noticiaRepository.addNoticia(noticia)
    }

    async deleteNoticia(id: string): Promise<Message> {
        return await this.noticiaRepository.deleteNoticia(id)
    }
}