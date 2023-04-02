import * as yup from 'yup'

const createQuizValidator = yup.object({
    title: yup.string().trim().min(2).required(),
    description: yup.string().trim().min(2).required(),
    questions: yup.array().of(
        yup.object().shape({
            description: yup.string().trim().min(2).required(),
            possibleAnswers: yup.array().of(
                yup.object().shape({
                    description: yup.string().trim().min(1).required(),
                    correct: yup.boolean()
                })
            )
        }).required()
    ).required()
})
type CreateQuizInputDTO = yup.InferType<typeof createQuizValidator>


export {createQuizValidator, CreateQuizInputDTO}