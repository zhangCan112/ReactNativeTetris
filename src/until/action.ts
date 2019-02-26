
export interface Action<T> {
    type: string,
    data: T
}

export let actionCreator = <T>(type: string, initData?: T, actionHandle = (action: Action<T>)=>{}) => (data = initData) => {    
    let action: Action<T> = {
        type,
        data: data as T,
    }
    actionHandle && actionHandle(action)
    return action
}

export let actionCreator_1 = <T>(type: string) => (data: T) => {    
    let action: Action<T> = {
        type,
        data,
    }
    return action
}