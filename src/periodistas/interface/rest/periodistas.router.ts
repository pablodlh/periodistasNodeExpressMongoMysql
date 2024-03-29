/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Request, Response } from 'express'
import express from 'express'
import type Message from '../../../../context/responses/Message'
import type Periodista from '../../domain/Periodista'
import PeriodistaUseCases from '../../application/periodistas.usecases'
import type PeriodistaRepository from '../../domain/periodistas.repository'
import PeriodistasRepositoryPostgres from '../db/periodistas.repository.postgres'
const router = express.Router()
const periodistaRepository: PeriodistaRepository = new PeriodistasRepositoryPostgres()
const periodistaUseCases: PeriodistaUseCases = new PeriodistaUseCases(periodistaRepository)

router.post('/', async (req: Request, res: Response) => {
  try {
    const periodista: Periodista = {
      nombre: req.body.nombre,
      fechaNacimiento: req.body.fechaNacimiento
    }
    const result: Message = await periodistaUseCases.addPeriodista(periodista)
    res.json(result)
  } catch (error) {
    const message: Message = {
      text: String(error)
    }
    res.status(500).send(message)
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const idPeriodista = Number(req.params.id)
    const result: Periodista | undefined = await periodistaUseCases.getPeriodistaById(idPeriodista)
    res.json(result)
  } catch (error) {
    const message: Message = {
      text: String(error)
    }
    res.status(500).send(message)
  }
}
)

router.get('/', async (req: Request, res: Response) => {
  try {
    const result: Periodista[] | undefined = await periodistaUseCases.getPeriodistas()
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
    const idPeriodista = Number(req.params.id)
    const result: Message = await periodistaUseCases.deletePeriodista(idPeriodista)
    res.json(result)
  } catch (error) {
    const message: Message = {
      text: String(error)
    }
    res.status(500).send(message)
  }
}
)

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const idPeriodista = Number(req.params.id)
    const nombrePeriodista = req.body.nombre
    const fechaNacimiento = req.body.fechaNacimiento
    const result: Message = await periodistaUseCases.editPeriodista(idPeriodista, fechaNacimiento, nombrePeriodista)
    res.json(result)
  } catch (error) {
    const message: Message = {
      text: String(error)
    }
    res.status(500).send(message)
  }
}
)
export { router as routerPeriodistas }
