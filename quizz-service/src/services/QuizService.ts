
import { AnswerQuizInputDTO, answerQuizValidator } from "../dto/answerQuiz";
import { CreateQuizInputDTO, createQuizValidator } from "../dto/CreateQuiz";
import { IPossibleAnswer, IQuiz, IQuizQuestion } from "../models/IQuiz";
import { IQuizAnswers, IQuizAttempt } from "../models/IQuizzAnswer";
import { IUser } from "../models/IUser"
import { addAttemptToUser } from "./UserService";
import { quizzesInit } from './quizzes';
const crypto = require('crypto')

let quizzes: IQuiz[] = quizzesInit

export const createQuiz = async (body: any, user: IUser): Promise<IQuiz> => {
    const request: CreateQuizInputDTO = await createQuizValidator.validate(body)
    const questions: IQuizQuestion[] = request.questions.map((q, iQuestion) => {

        let nbCorrectAnswer = 0
        let possibleAnswers: IPossibleAnswer[] = []
        /* add id to possible answers, check if multiple answers are possible */
        for(let i = 0; i < q.possibleAnswers.length; i++) {
            const possibleAnswer = q.possibleAnswers[i]
            /* id of possible answers increase according to the id of the question so there is not 2 time the same id in the same quizz */
            possibleAnswers.push({...possibleAnswer, id: (iQuestion << 20) + i})
            if(possibleAnswer.correct) {
                nbCorrectAnswer++
            }
        }

        return {
            id: iQuestion,
            description: q.description,
            possibleAnswers,
            haveMultipleAnswers: nbCorrectAnswer > 1
        }
    })
    const quiz: IQuiz = {
        id: crypto.randomUUID().toString(),
        title: request.title,
        description: request.description,
        questions,
        creatorUsername: user.username
    }
    quizzes.push(quiz)
    return quiz
}

export const getQuizzes = (): IQuiz[] => {
    // We make here a deep copy of quizzes so we can manipulate it without alterate the original quizzes array
    let copyQuiz:IQuiz[] = JSON.parse(JSON.stringify(quizzes))
    /* then we delete the answers */
    copyQuiz.forEach(quiz => {
        quiz.questions.forEach(question => {
            question.possibleAnswers.forEach(possibleAnswer => 
                delete possibleAnswer.correct
            )
        })
    });
    return copyQuiz
}

export const getQuiz = (id: string): IQuiz => {
    let quiz = quizzes.find(q => q.id === id) 
    if(!quiz) {
        throw({ message: 'quiz not find' })
    }

    // We make here a deep copy of quizzes so we can manipulate it without alterate the original quizzes array
    let copyQuiz:IQuiz = JSON.parse(JSON.stringify(quiz))
    /* then we delete the answers */
    copyQuiz.questions.forEach(question => {
        question.possibleAnswers.forEach(possibleAnswer => 
            delete possibleAnswer.correct
        )
    })
    return copyQuiz
}

export const answerQuiz = async (quizId: string, body: any, user: IUser): Promise<IQuizAttempt> => {

    let quiz = quizzes.find(quiz => quiz.id === quizId) 
    if(!quiz) {
        throw('Quiz does not exist')
    }
    const answers:AnswerQuizInputDTO = await answerQuizValidator.validate(body)
    let nbCorrectAnswers = 0
    let answersResult: any = []
    quiz.questions.forEach(question => {
        const answer = answers.find(answer => answer.id === question.id)
        let correct = true
        if(answer) {
            for(let i = 0; i < question.possibleAnswers.length && correct; i++) {
                const possibleAnswer = question.possibleAnswers[i]
                const indexAnswer = answer.answers.findIndex((idA: number) => idA === possibleAnswer.id)
                if(possibleAnswer.correct && indexAnswer === -1 ||
                    !possibleAnswer.correct && indexAnswer !== -1) {
                    correct = false
                }
            }
            if(correct) {
                nbCorrectAnswers++
            }
            answersResult.push({
                questionId: question.id,
                answersId: answer.answers,
                correct
            })
        }
    })
    const attempt: IQuizAttempt = {
        nbCorrectAnswers,
        answers: answersResult
    }
    addAttemptToUser(user.username, quizId, attempt)
    return attempt
}
export const flushQuizzes = () => quizzes = []
