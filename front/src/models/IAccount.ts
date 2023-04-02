import { IQuizAnswers } from "./IQuizAnswers";

export default interface IAccount {
  username: string,
  quizAnswers: IQuizAnswers[]
}
