import { CreateUserDTO, CreateUserOutputDTO, createUserValidator } from "../dto/CreateUser";
import {LoginUserInputDTO, LoginUserOutputDTO, loginUserValidator} from "../dto/LoginUser";
import { IQuizAttempt } from "../models/IQuizzAnswer";
import type {IUser} from "../models/IUser";

const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let users: IUser[] = []

export const loginUser = async (body: any): Promise<LoginUserOutputDTO> => {
    const loginRequest: LoginUserInputDTO = await loginUserValidator.validate(body)

    const { username, password } = loginRequest

    const existUser = users.find(u => u.username === loginRequest.username)
    /* if user doesn't exist, throw an error */
    if(!existUser) {
        throw({ message: 'User not find or wrong password' })
    }
    let isVerified = await bcrypt.compare(password, existUser.password)
    /* if user doesn't credentials incorrect */
    if(!isVerified) {
        throw({ message: 'User not find or wrong password' })
    }
    const token = jwt.sign({
        username,
    }, config.JWT_SECRET, { expiresIn: 60*60*1000000 })
    return { token, username, quizAnswers: existUser.quizAnswers };
}

export const createUser = async (body: any): Promise<CreateUserOutputDTO> => {
    
    const userRequest: CreateUserDTO = await createUserValidator.validate(body)
    
    const password = await bcrypt.hash(userRequest.password, saltRounds)

    const existUser = users.find(u => u.username === userRequest.username)
    /* if user already exist, throw error */
    if(existUser) {
        throw({status: 409, errors: `User ${userRequest.username} already exist` })
    }
    const newUser = { username: userRequest.username, password, quizAnswers: [] }
    users.push(newUser)
    
    const token = jwt.sign({
        username: newUser.username,
    }, config.JWT_SECRET, { expiresIn: 60*60*1000 })
    return { token, username: newUser.username, quizAnswers: [] }
}

export const addAttemptToUser = (useranme: string, quizId: string, attempt: IQuizAttempt) => {
    let user = users.find(user => user.username === useranme)
    let quiz = user?.quizAnswers?.find(quiz => quiz.quizId === quizId)
    if(!quiz) {
        user?.quizAnswers?.push({
            quizId,
            attempts: [ attempt ]
        })
    } else {
        quiz.attempts.push(attempt)
    }
}

export const getUserAttempts = (useranme: string) => {
    let user = users.find(user => user.username === useranme)
    if(!user) {
        throw('User not found')
    }
    return user.quizAnswers
}

export const flushUsers = () => users = []