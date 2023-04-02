import {NextFunction, Request, Response} from 'express'
import { IQuiz } from '../models/IQuiz';
import logger from '../utils/logger';
import { answerQuiz, createQuiz, getQuiz, getQuizzes } from '../services/QuizService'

const express = require('express')
const QuizRouter = express()
const auth = require('../middlewares/auth')

QuizRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    logger.info('GET /quizzes get all existing quizzes')
    const quizzes = getQuizzes()
    return res.status(200).send(quizzes)
})

QuizRouter.get('/:quizId', async (req: Request, res: Response, next: NextFunction) => {
    logger.info('GET /quiz get quiz having id quizId')
    try {
        const { quizId } = req.params
        const quiz = getQuiz(quizId)
        return res.status(200).send(quiz)
    } catch(err) {
        next(err)
    }
})


QuizRouter.post('/', [auth.verifyToken], async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`POST /quizzes creation of a quiz`)
    try {
        const result = createQuiz(req.body, res.locals.user)
        return res.status(201).send(result)
        
    } catch(err) {
        next(err)
    }
})

QuizRouter.post('/:quizId', [auth.verifyToken], async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`POST /quizzes/:quizId answer a quiz`)
    try {
        const {quizId} = req.params
        const result = await answerQuiz(quizId, req.body, res.locals.user)
        return res.status(200).send(result)
        
    } catch(err) {
        next(err)
    }
})
export {
    QuizRouter
}
