import { IQuizAnswers } from "./IQuizzAnswer";

export interface IUser {
    username: string;
    password: string;
    quizAnswers: IQuizAnswers[]
}
