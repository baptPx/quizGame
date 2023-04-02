import { useStore } from "@/store/app"
import APIService from "./APIService"

export default class UserService {
    static logout = () => {
        const store = useStore()
        store.setUserAccount({username: '', quizAnswers: []})
        localStorage.removeItem('token')
    }

    static login = async (username: string, password: string) => {
        const store = useStore()

        const user = await APIService.post('/users/login', {
            username: username,
            password: password
          })
          .catch((err: any) => {
            if(err.response && err.response.data && err.response.data.errors) {
                throw(err.response.data.errors)
            } else {
                throw('Erreur lors de la connexion')
            }
          })
          store.setUserAccount(user)
          localStorage.setItem('token', user.token)

    }

    
    static register = async (username: string, password: string) => {
        const store = useStore()

        const user = await APIService.post('/users', {
            username: username,
            password: password
          })
          .catch(err => {
            if(err.response && err.response.data && err.response.data.errors) {
                throw(err.response.data.errors)
            } else {
                throw('Erreur lors de la création de compte')
            }
          })
          store.setUserAccount(user)
          localStorage.setItem('token', user.token)

    }
}