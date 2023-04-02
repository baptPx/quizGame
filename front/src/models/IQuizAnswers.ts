
export interface IQuizAnswers {
    quizId: string,
    attempts : IQuizAttempt[]
}
export interface IQuizAttempt {
    nbCorrectAnswers: number,
    answers: {
        questionId: number,
        answersId: number[],
        correct: boolean
    }[]
}
