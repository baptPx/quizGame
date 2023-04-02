import {NextFunction, Request, Response} from 'express'
import {CreateUserOutputDTO} from "../dto/CreateUser";
import { createUser, getUserAttempts, loginUser } from '../services/UserService';
import logger from '../utils/logger';
const express = require('express')
const app = express()
const auth = require('../middlewares/auth')


app.post('/', async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`POST /users creation of a user`)
    try {
        const userResult: CreateUserOutputDTO = await createUser(req.body)
        return res.status(201).send(userResult)
    } catch(err: any) {
        return next(err)
    }
})

app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`POST /users/login login of a user`)
    try {
        const loginResponse = await loginUser(req.body)
        return res.send(loginResponse)
    } catch(err: any) {
        return next(err)
    }
})

app.get('/account', [auth.verifyToken], async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`POST /users/account get user account`)
    const {user} = res.locals
    try {
        if(user === undefined) {
            return res.status(401).json({
                error: {
                    msg: 'Failed to authenticate token!'
                }
            });
        }
        logger.info(`POST /users/account retrieve data for a logged user`)
        user.quizAnswers = getUserAttempts(user.username)
        return res.send(user)
    } catch(err) {
        return next(err)
    }
})

module.exports = app