
export interface Action<T> {
    type: string,
    data: T
}

export let actionCreator = <T>(type: string, initData?: T) => (data = initData) => {    
    let action: Action<T> = {
        type,
        data: data as T,
    }
    return action
}

export let actionCreator_1 = <T>(type: string) => (data: T) => {    
    let action: Action<T> = {
        type,
        data,
    }
    return action
}