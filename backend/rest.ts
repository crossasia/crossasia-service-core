import axios, {AxiosError, AxiosRequestConfig} from 'axios'
import snakeCase from 'lodash/snakeCase'
import eventBust from '../utils/event_bus'
import AuthManager from './auth'
import {Config} from '../models/app_config'

function axiosConfig(config: Config): AxiosRequestConfig {
    return {
        baseURL: config.apiUrl,
        method: 'POST',
        timeout: 30000,
        responseType: 'json',
        withCredentials: true
    }
}

export function serviceInstance(config: Config, authManager: AuthManager) {
    let instance = axios.create(axiosConfig(config))

    instance.interceptors.response.use(undefined, (error: AxiosError) => {
        return new Promise((resolve, reject) => {
            console.log(error)
            if (error.response && error.response.status === 401) {
                authManager.deleteToken()
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

export function authServiceInstance(config: Config) {
    let instance = axios.create(axiosConfig(config))

    instance.interceptors.response.use(undefined, (error: AxiosError) => {
        return new Promise((resolve, reject) => {
            console.log(error)

            error.message = 'axios.' + snakeCase(error.message)
            reject(error)
        })
    })


    return instance
}

