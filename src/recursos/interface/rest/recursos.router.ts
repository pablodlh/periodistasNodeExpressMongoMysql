/* eslint-disable */
import type { Request, Response } from 'express'
import express from 'express'
import type Message from '../../../../context/responses/Message'
import type Recurso from '../../domain/Recurso'
import RecursoUseCases from '../../application/recursos.usecases'
import type RecursoRepository from '../../domain/recursos.repository'
import RecursosRepositoryPostgres from '../db/recursos.respository.postgres'

const router = express.Router()
const recursoRepository: RecursoRepository = new RecursosRepositoryPostgres()
const recursoUseCases: RecursoUseCases = new RecursoUseCases(recursoRepository)

router.post('/create', async (req: Request, res: Response) => {
  try {
    const recurso: Recurso = {
      url: req.body.url
    }
    const result: Message = await recursoUseCases.addRecurso(recurso)
    res.json(result)
  } catch (error) {
    const message: Message = {
      text: String(error)
    }
    res.status(500).send(message)
  }
})

router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const idRecurso = Number(req.params.id)
    const result: Message = await recursoUseCases.deleteRecurso(idRecurso)
    res.json(result)
  } catch (error) {
    const message: Message = {
      text: String(error)
    }
    res.status(500).send(message)
  }
}
)
