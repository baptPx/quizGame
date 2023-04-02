<template>
  <div v-if="quiz">
    <h1>{{ quiz.title }} - {{ quiz.questions.length }} questions</h1>
    <br>
    <v-row dense >
      <v-form @submit.prevent>
        <v-col 
        v-for="question in quiz.questions"
        :key="question.id"
        cols="12"
        >
          <p>{{ question.description }}</p>
          <v-checkbox 
            v-model="answers[question.id]"
            v-for="possibleAnswer in question.possibleAnswers"
            :label="possibleAnswer.description"
            :value="possibleAnswer.id"></v-checkbox>
        </v-col>
      </v-form>
      <v-btn 
        type="submit"
        block 
        class="mt-2" 
        color="primary"
        @click="submitQuiz()">Submit</v-btn>
    </v-row>
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
let answers = ref<{ [idQuestion: number]: number[] }>({})

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
})

const submitQuiz = async () => {
  const answersData = Object.keys(answers.value).map(id => {
    return {
      id,
      answers: answers.value[+id]
    }
  })
  const attempt = await APIService.post('/quizzes/' + quizId, answersData)
  const quizAttempts = store.getUserAccount.quizAnswers.find(quiz => quiz.quizId === quizId) 
  if(quizAttempts) {
    quizAttempts.attempts.push(attempt)
  } else {
    store.getUserAccount.quizAnswers.push({
      quizId: quizId,
      attempts: [attempt]
    })
  }
  router.push('/quiz/' + quizId + '/results')
}
</script>
<style>

</style>
