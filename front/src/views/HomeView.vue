<template>
  <h1>Quizzes</h1>
  <br>
  <v-row dense>
    <v-col 
      v-for="quiz in quizzes"
      :key="quiz.id"
      cols="6"
      >
      <v-card
        color="primary"
        @click="router.push('/quiz/' + quiz.id)"
      >
      <v-card-title>
        {{ quiz.title }}
        <v-btn
          color="secondary"
          style="float: right" @click.stop="router.push('/quiz/' + quiz.id + '/results')">Results</v-btn>
      </v-card-title>
      <v-card-subtitle>{{ quiz.questions.length + ' ' + (quiz.questions.length > 1 ? 'questions' : 'question') }}</v-card-subtitle>
      <v-card-text>{{ quiz.description }}</v-card-text>
    </v-card>
    </v-col>
  </v-row>
  </template>

<script lang="ts" setup>
import { IQuiz } from '@/models/IQuiz';
import APIService from '@/services/APIService';
import { useStore } from '@/store/app';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useStore()

let quizzes = ref<IQuiz[]>([])
onMounted(async () => {
  quizzes.value = await APIService.get('/quizzes')
  store.setQuizzes(quizzes.value)
})
</script>
<style>

</style>
