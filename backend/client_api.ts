import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, CancelToken, CancelTokenSource} from 'axios'
// import api from './rest'
import {AppError} from 'models/app_error'
import AuthManager from "./auth"
import {serviceInstance} from "./rest"

export default class ApiClient {
    url: string
    authManager: AuthManager
    axiosInstance: AxiosInstance
    // cancelSources stores request function axios CancelTokenSource
    // and used to cancel them
    cancelSources: { [name: string]: CancelTokenSource }

    constructor(config: any, authManager: AuthManager) {
        this.url = config.apiUrl
        this.authManager = authManager
        this.cancelSources = {}
        this.axiosInstance = serviceInstance(config, authManager)
    }

    axiosConfig = (cancelToken?: CancelToken): AxiosRequestConfig => {
        return {
            // baseURL: this.url + 'client',
            headers: {Authorization: `Token ${this.authManager.getToken()}`},
            cancelToken
        }
    }

    newRequest<ApiResponse>(url: string, data?: any, fnName?: string): Promise<ApiResponse> {
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






// export function getShipmentList(request: GetShipmentListRequest) {
//     return newRequest<GetShipmentListResponse>('/GetShipmentList', request, 'getShipmentList')
// }
//
// export function getShipmentSingle(request: GetShipmentSingleRequest) {
//     return newRequest<GetShipmentSingleResponse>('/GetShipmentSingle', request)
// }
//
// export function getTransactionList(request: GetTransactionListRequest) {
//     return newRequest<GetTransactionListResponse>('/GetTransactionList', request, 'getTransactionList')
// }
//
// export function getTransactionSingle(request: GetTransactionSingleRequest) {
//     return newRequest<GetTransactionSingleResponse>('/GetTransactionSingle', request, 'getTransactionSingle')
// }
//
// export function getWarehouseEntryList(request: GetWarehouseEntryListRequest) {
//     return newRequest<GetWarehouseEntryListResponse>('/GetWarehouseEntryList', request, 'getWarehouseEntryList')
// }
//
// export function getWarehouseEntrySingle(request: GetWarehouseEntrySingleRequest) {
//     return newRequest<GetWarehouseEntrySingleResponse>('/GetWarehouseEntrySingle', request, 'getWarehouseEntrySingle')
// }
