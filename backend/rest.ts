import axios, {AxiosError, AxiosRequestConfig} from 'axios'
import snakeCase from 'lodash/snakeCase'
import eventBust from '../utils/event_bus'
import AuthManager from './auth'

function axiosConfig(baseUrl: string): AxiosRequestConfig {
    return {
        baseURL: baseUrl,
        method: 'POST',
        timeout: 30000,
        responseType: 'json',
        withCredentials: true
    }
}

export function serviceInstance(baseUrl: string, authManager?: AuthManager) {
    const instance = axios.create(axiosConfig(baseUrl))

    instance.interceptors.response.use(undefined, (error: AxiosError) => {
        return new Promise((resolve, reject) => {
            console.log(error)
            if (error.response && error.response.status === 401) {
                if (authManager) {
                    authManager.deleteToken()
                }
                eventBust.$emit('unauthorized_request')
                // reject(error)
                return
            }

            error.message = 'axios.' + snakeCase(error.message)
            reject(error)
        })
    })

    return instance
}

export function authServiceInstance(baseUrl: string) {
    const instance = axios.create(axiosConfig(baseUrl))

    instance.interceptors.response.use(undefined, (error: AxiosError) => {
        return new Promise((resolve, reject) => {
            console.log(error)

            error.message = 'axios.' + snakeCase(error.message)
            reject(error)
        })
    })


    return instance
}

