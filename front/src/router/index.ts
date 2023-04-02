// Composables
import APIService from '@/services/APIService'
import UserService from '@/services/UserService'
import { useStore } from '@/store/app'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/quiz/:quizId',
    component: () => import('@/views/QuizView.vue'),
    meta: { requireLogin: true }
  },
  {
    path: '/quiz/:quizId/results',
    component: () => import('@/views/ResultQuizView.vue'),
    meta: { requireLogin: true }
  },
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue')  
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach(async (to, from, next) => {

  const store = useStore()
  const token = localStorage.getItem('token')
  if(store.getUserAccount.username === '' && token) {
    try {
      const data = await APIService.get('/users/account')
      store.setUserAccount(data)
    } catch(err) {
      // if login didn't work, invalidate token
      UserService.logout()
    }
  } 
  if(to.meta && to.meta.requireLogin && store.getUserAccount.username === '') {
    next('/login')
    return
  }

  next()
  return
})

export default router
