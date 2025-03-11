export interface IError {
    status: 'error'
    message: string
}

export interface ISuccess<T> {
    status: 'success'
    data: T
}

// создаем тип response который получает либо ошибку или успешный результат
export type Response<T> = IError | ISuccess<T>