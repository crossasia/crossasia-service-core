import {AxiosError, AxiosInstance} from 'axios'
import {authServiceInstance} from './rest'
import {AppError} from 'models/app_error'
import {User} from '../models/user'
import {Config} from "../models/app_config"

export interface AuthResponse {
    token: string
}

export default class AuthManager {
    authTokenKey: string
    axiosInstance: AxiosInstance

    constructor(config: Config) {
        this.authTokenKey = config.authTokenKey
        this.axiosInstance = authServiceInstance(config, this)
    }

    getToken() {
        return window.localStorage.getItem(this.authTokenKey)
    }

    setToken(v: string) {
        window.localStorage.setItem(this.authTokenKey, v)
    }

    deleteToken() {
        window.localStorage.removeItem(this.authTokenKey)
    }

    isAuthenticated() {
        return String(this.getToken()) !== '' && this.getToken() !== null
    }

    saveUser(user: User) {
        window.localStorage.setItem('user', JSON.stringify(user))
    }

    getUser(): User | null {
        const u = window.localStorage.getItem('user')
        if (u) {
            return JSON.parse(u)
        }
        return null
    }

    deleteUser() {
        window.localStorage.removeItem('user')
    }

    login(user: string, pass: string): Promise<AuthResponse> {
        const creds = {
            username: user,
            password: pass
        }

        return this.axiosInstance.post<AuthResponse>('/auth/login', creds)
            .then((response) => {
                return response.data
            }).catch((error: AxiosError) => {
                let err!: AppError
                if (error.response) {
                    err = new AppError(error.response.data)
                } else {
                    err = new AppError({message: error.message, detailed: '', code: error.code || ''})
                }
                console.log(err)

                return Promise.reject(err)
            })
    }

    logout() {
        return this.axiosInstance.post('/auth/logout', null, {
            headers: {Authorization: `Token ${this.getToken()}`}
        }).then(() => {
            this.deleteToken()
            this.deleteUser()
        }).catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
    }
}
