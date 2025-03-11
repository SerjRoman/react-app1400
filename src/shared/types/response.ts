export interface IError { // ствоення інтерфейсу для помилки
    status: 'error'
    message: string
}

export interface ISuccess<T> { // ствоення інтерфейсу для успіху
    status: 'success'
    data: T // параметр для передачі даних
}

export type Response<T> = IError | ISuccess<T> // створення типу для відповіді від сервера(приймає або помилку або успіх) з використанням generic types