/* eslint-disable */
import type { Request, Response } from 'express'
import express from 'express'
import type Message from '../../../../context/responses/Message'
import type Noticia from '../../domain/Noticia'
import NoticiaUseCases from '../../application/noticias.usecases'
import type NoticiaRepository from '../../domain/noticias.repository'
import NoticiasRepositoryMongo from '../db/noticias.repository.mongo'

const router = express.Router()
const noticiaRepository: NoticiaRepository = new NoticiasRepositoryMongo()
const noticiaUseCases: NoticiaUseCases = new NoticiaUseCases(noticiaRepository)

router.get('/', async (req: Request, res: Response) => {
  try {
    const noticias: Noticia[] | undefined = await noticiaUseCases.getNoticias()
    res.json(noticias)
  } catch (error) {
    const message: Message = {
      text: String(error)
    }
    res.status(500).send(message)
  }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const idNoticia = String(req.params.id)
        const noticia: Noticia | undefined = await noticiaUseCases.getNoticiaById(idNoticia)
        res.json(noticia)
    } catch (error) {
        const message: Message = {
        text: String(error)
        }
        res.status(500).send(message)
    }
    }
)

router.get('/periodista/:id', async (req: Request, res: Response) => {
    try {
        const idPeriodista = Number(req.params.id)
        const noticias: Noticia[] | undefined = await noticiaUseCases.getNoticiasByPeriodista(idPeriodista)
        res.json(noticias)
    } catch (error) {
        const message: Message = {
        text: String(error)
        }
        res.status(500).send(message)
    }
    }
)

router.post('/', async (req: Request, res: Response) => {
  try {
    const noticia: Noticia = {
      titulo: req.body.titulo,
      texto: req.body.texto,
      periodistas: req.body.periodistas,
      recursos: req.body.recursos
    }
    const result: Message = await noticiaUseCases.addNoticia(noticia)
    res.json(result)
  } catch (error) {
    const message: Message = {
      text: String(error)
    }
    res.status(500).send(message)
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const idNoticia = String(req.params.id)
    const result: Message = await noticiaUseCases.deleteNoticia(idNoticia)
    res.json(result)
  } catch (error) {
    const message: Message = {
      text: String(error)
    }
    res.status(500).send(message)
  }
}
)


export { router as routerNoticias }
