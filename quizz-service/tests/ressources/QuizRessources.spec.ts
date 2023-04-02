import supertest from 'supertest';
import {beforeEach, describe, expect, test} from '@jest/globals';
import {flushUsers} from '../../src/services/UserService'
import {quiz} from "../helpers/quiz" 
import { createQuiz, flushQuizzes } from '../../src/services/QuizService';
import { IQuiz } from '../../src/models/IQuiz';
import { AnswerQuizInputDTO } from '../../src/dto/answerQuiz';
const {app, start} = require('../../src/App')
const { createUserIT, createQuizIT } = require('../helpers/ressources')

beforeEach(async() => {
    await start()
})
describe('UserRessources tests', () => {
    beforeEach(async () => {
        flushUsers()
        flushQuizzes()
    })
    test('create quiz', async() => {
        const user = await createUserIT()
        await supertest(app)
            .post('/api/quizzes')
            .set('Authorization', 'Bearer ' + user.token)
            .send(quiz)
            .expect(201)
    })
    test('get quizzes', async() => {
        const user = await createUserIT()
        let quiz = await createQuizIT(user)
        await supertest(app)
            .get('/api/quizzes')
            .expect(200)
            .then(res => {
                const { body } = res
                expect(body.length).toEqual(1)
                const quiz: IQuiz = body[0]
                expect(quiz.creatorUsername).toEqual(user.username)
                expect(quiz.questions).toBeDefined()
                quiz.questions.forEach(question => {
                    expect(question.possibleAnswers).toBeDefined()
                    question.possibleAnswers.forEach(possibleAnswer => {
                        expect(possibleAnswer.correct).not.toBeDefined()
                    })
                })
            })
    })
    
    test('answer quiz correct', async() => {
        const user = await createUserIT()
        const quiz: IQuiz = await createQuizIT(user)
        let questions: AnswerQuizInputDTO = []
        const q1 = quiz.questions.find(q => q.description === 'How much is 4 + 5')
        const q2 = quiz.questions.find(q => q.description === 'Which of these numbers can divide 150')
        
        if(q1 && q2) {
            const aq1 = q1.possibleAnswers.find(pa => pa.description == '9')
            const aq2 = q2.possibleAnswers.find(pa => pa.description === '2')
            const a2q2 = q2.possibleAnswers.find(pa => pa.description === '15')
            if(aq1 && aq2 && a2q2) {
                questions = [
                    { id: q1?.id, answers: [ aq1.id ] },
                    { id: q2?.id, answers: [ aq2.id, a2q2.id ] }
                ]
            }
        }
        
         await supertest(app)
            .post('/api/quizzes/' + quiz.id)
            .set('Authorization', 'Bearer ' + user.token)
            .send(questions)
            .expect(200)
            .then(res => {
                const { body } = res
                expect(body.nbCorrectAnswers).toEqual(2)
            })
        
    })

    test('answer quiz incorrect', async() => {
        const user = await createUserIT()
        const quiz: IQuiz = await createQuizIT(user)
        let questions: AnswerQuizInputDTO = []
        const q1 = quiz.questions.find(q => q.description === 'How much is 4 + 5')
        const q2 = quiz.questions.find(q => q.description === 'Which of these numbers can divide 150')
        
        if(q1 && q2) {
            const aq1 = q1.possibleAnswers.find(pa => pa.description == '8')
            const aq2 = q2.possibleAnswers.find(pa => pa.description === '2')
            const a2q2 = q2.possibleAnswers.find(pa => pa.description === '15')
            if(aq1 && aq2 && a2q2) {
                questions = [
                    { id: q1?.id, answers: [ aq1.id ] },
                    { id: q2?.id, answers: [ aq2.id, a2q2.id ] }
                ]
            }
        }
        
         await supertest(app)
            .post('/api/quizzes/' + quiz.id)
            .set('Authorization', 'Bearer ' + user.token)
            .send(questions)
            .expect(200)
            .then(res => {
                const { body } = res
                expect(body.nbCorrectAnswers).toEqual(1)
            })
        
    })


    test('answer quiz incorrect multiple answers', async() => {
        const user = await createUserIT()
        const quiz: IQuiz = await createQuizIT(user)
        let questions: AnswerQuizInputDTO = []
        const q1 = quiz.questions.find(q => q.description === 'How much is 4 + 5')
        const q2 = quiz.questions.find(q => q.description === 'Which of these numbers can divide 150')
        
        if(q1 && q2) {
            const aq1 = q1.possibleAnswers.find(pa => pa.description == '9')
            const aq2 = q2.possibleAnswers.find(pa => pa.description === '2')
            if(aq1 && aq2) {
                questions = [
                    { id: q1?.id, answers: [ aq1.id ] },
                    { id: q2?.id, answers: [ aq2.id ] }
                ]
            }
        }
        
         await supertest(app)
            .post('/api/quizzes/' + quiz.id)
            .set('Authorization', 'Bearer ' + user.token)
            .send(questions)
            .expect(200)
            .then(res => {
                const { body } = res
                expect(body.nbCorrectAnswers).toEqual(1)
            })
        
    })
})

