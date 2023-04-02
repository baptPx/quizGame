import * as yup from 'yup'

const answerQuizValidator = yup.array().of(
    yup.object().shape({
        id: yup.number().required(),
        answers: yup.array().of(
            yup.number().required()
        ).required()
    }).required()
).required()
type AnswerQuizInputDTO = yup.InferType<typeof answerQuizValidator>


export {answerQuizValidator, AnswerQuizInputDTO}