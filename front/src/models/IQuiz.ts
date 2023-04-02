export interface IQuiz {
    id: string,
    title: string,
    description: string,
    questions: IQuizQuestion[];
}

export interface IQuizQuestion {
    id: number,
    description: string;
    possibleAnswers: {
        id: number,
        description: string
    }[],
    multipleAnswers?: boolean
}