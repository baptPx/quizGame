export interface IQuiz {
    id: string,
    title: string,
    description: string,
    questions: IQuizQuestion[],
    creatorUsername: string;
}

export interface IQuizQuestion {
    id: number,
    description: string;
    possibleAnswers: IPossibleAnswer[],
    haveMultipleAnswers?: boolean
}

export interface IPossibleAnswer {
    id: number,
    description: string,
    correct?: boolean
}