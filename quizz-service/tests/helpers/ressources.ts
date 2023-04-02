import { IUser } from "../../src/models/IUser"
import { createQuiz } from "../../src/services/QuizService"
import { createUser } from "../../src/services/UserService";
import { quiz } from "./quiz";

const createUserIT = async () => {
    return await createUser({username: 'user1', password: '123'})
}

const createQuizIT = async (user: IUser) => {
    return await createQuiz(quiz, user)
}

module.exports = {createUserIT, createQuizIT}