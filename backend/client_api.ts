import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, CancelToken, CancelTokenSource} from 'axios'
import {AppError} from '../models/app_error'
import AuthManager from './auth'
import {serviceInstance} from './rest'
import {Config} from '../models/app_config'

export default class ApiClient {
    protected url: string
    protected authManager?: AuthManager
    protected axiosInstance: AxiosInstance
    protected cancelSources: { [name: string]: CancelTokenSource }

    constructor(config: Config, authManager?: AuthManager) {
        this.url = config.apiUrl
        this.authManager = authManager
        this.cancelSources = {}
        this.axiosInstance = serviceInstance(config, authManager)
    }

    private axiosConfig = (cancelToken?: CancelToken): AxiosRequestConfig => {
        return {
            headers: this.authManager ? {Authorization: `Token ${this.authManager.getToken()}`} : {},
            cancelToken
        }
    }

    public newRequest<ApiResponse>(url: string, data?: any, fnName?: string): Promise<ApiResponse> {
        const cfg = this.axiosConfig()

        if (fnName && fnName !== '') {
            if (this.cancelSources[fnName] !== undefined) {
                this.cancelSources[fnName].cancel('canceled')
            }
            this.cancelSources[fnName] = axios.CancelToken.source()
            cfg.cancelToken = this.cancelSources[fnName].token
        }

        return this.axiosInstance.post<ApiResponse>(url, data, cfg)
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
}
