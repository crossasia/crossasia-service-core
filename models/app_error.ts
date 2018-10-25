export interface AppErrorJSON {
    code: string
    message: string
    detailed: string
}

export class AppError extends Error {
    public code: string
    public message: string
    public detailed: string

    constructor(v: AppErrorJSON) {
        super(v.message)
        this.code = v.code
        this.message = v.message
        this.detailed = v.detailed
    }
}
