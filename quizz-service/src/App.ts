import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { QuizRouter } from './ressources/QuizRessources'
const bodyParser = require('body-parser')
const users = require('./ressources/UserRessources')
const {errorHandler} = require('./middlewares/errorHandler')
const cors = require('cors')
const app: Express = express();


async function start() {

    dotenv.config(); 

    app.use(cors());

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use(express.static('public'))

    app.get('/', (req: Request, res: Response) => {
        res.send('Express + TypeScript Server');
    });
    app.use('/api/quizzes', QuizRouter)
    app.use('/api/users', users)

    app.use(errorHandler)

}
module.exports = {app, start}