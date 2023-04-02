// Utilities
import { defineStore } from 'pinia'
import {computed, ref} from 'vue'
import IAccount from "@/models/IAccount";
import { IQuiz } from '@/models/IQuiz';

export const useStore = defineStore('app', () => {
  const logged =  ref(false)
  const userAccount = ref<IAccount>({
    username: '',
    quizAnswers: []
  })
  const quizzes = ref<IQuiz[]>([])

  const setUserAccount = (newUserAccount: IAccount) => { 
    userAccount.value = newUserAccount
    logged.value = true
  }

  const getUserAccount = computed(() => userAccount.value)

  const setQuizzes = (newQuizzes: IQuiz[]) => { quizzes.value = newQuizzes }
  const getQuizzes = computed(() => quizzes.value)
  return {
    setUserAccount,
    getUserAccount,
    setQuizzes,
    getQuizzes
  }
})
