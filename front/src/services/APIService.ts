import { API_URL } from "@/configs/constants"
import axios, { AxiosRequestConfig } from "axios"

export default class APIService {

    static handleAPI = async (url: string, method: string, data?: any, params?: AxiosRequestConfig ) => {
        try {
            let token = localStorage.getItem('token')
            const response = await axios({
                url: '/api' + url,
                data,
                method,
                headers: { authorization: 'Bearer ' + token },
                ...params
            })
            if(response.status >= 200 && response.status < 300) {
                return Promise.resolve(response.data)
            } 
            if(response.status === 401 && window.location.pathname !== '/') {
                return window.location.href = window.location.origin
            }
            return Promise.reject(response)
        } catch(err: any) {
            return Promise.reject(err)
        }
    }

    static get = async (url: string, data?: any, params?: AxiosRequestConfig) => {
        return this.handleAPI(url, 'get', data, params)
    }
    
    static put = async (url: string, data?: any, params?: AxiosRequestConfig) => {
        return this.handleAPI(url, 'put', data, params)
    }
    
    static post = async (url: string, data?: any, params?: AxiosRequestConfig) => {
        return this.handleAPI(url, 'post', data, params)
    }
    
    static deleteAPI = async (url: string, data?: any, params?: AxiosRequestConfig) => {
        return this.handleAPI(url, 'deleteAPI', data, params)
    }
}