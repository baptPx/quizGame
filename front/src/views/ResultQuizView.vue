<template>
  <div v-if="quiz">
    <h1>{{ quiz.title }} results</h1>
    <br>

      <v-expansion-panels
        multiple
      >
        <v-expansion-panel  v-for="attempt in attempts">
          <v-expansion-panel-title         
            color="primary"
          >
            {{ quiz.title }} - {{ attempt.nbCorrectAnswers }} / {{ quiz.questions.length }} correct answers
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row dense>
              <v-col 
              v-for="question in quiz.questions"
              :key="question.id"
              cols="12"
              >
                <p>{{ question.description }}</p> 
                <v-checkbox 
                  disabled
                  v-model="attempt.answers[question.id].ids"
                  v-for="possibleAnswer in question.possibleAnswers"
                  :label="possibleAnswer.description"
                  :value="possibleAnswer.id"></v-checkbox>
              </v-col>
            </v-row>

              </v-expansion-panel-text>
        </v-expansion-panel>

      </v-expansion-panels>
      <v-btn 
        type="submit" 
        block 
        class="mt-2" 
        color="secondary"
        @click="router.push('/quiz/' + quizId)"
      >Try again</v-btn>
    </div>
  </template>

<script lang="ts" setup>
import { IQuiz } from '@/models/IQuiz';
import APIService from '@/services/APIService';
import { useStore } from '@/store/app';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const store = useStore()

let quizId = ''
let quiz = ref<IQuiz | null>(null) 
let attempts = ref<any[]>([])
let answers = ref<{ [idQuestion: number]: number[] }>({})
interface IFormattedAnswer { 
  [key: number]: { 
    ids: number[], 
    correct: boolean
  } 
}
onMounted(async () => {
  quizId = route.params.quizId.toString() 
  let mayBeQuiz = store.getQuizzes.find(q => q.id === quizId)
  if(mayBeQuiz) {
    quiz.value = mayBeQuiz
  } else {
    quiz.value = await APIService.get('/quizzes/' + quizId)
  }
  if(quiz.value) {
    quiz.value.questions.forEach(q => answers.value[q.id] = [])
  }
  const quizAttempts = store.getUserAccount.quizAnswers.find(quiz => quiz.quizId === quizId) 
  if(quizAttempts) {
    attempts.value = quizAttempts.attempts.map(attempt => {
      let formattedAnswer: IFormattedAnswer = {}
      attempt.answers.forEach(answer => {
        formattedAnswer[answer.questionId] = {
          ids: answer.answersId,
          correct: answer.correct
        }
      })
      return {
        nbCorrectAnswers: attempt.nbCorrectAnswers,
        answers: formattedAnswer
      }
    })
  }
})

</script>
<style>

</style>
