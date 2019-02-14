
export interface Action<T> {
    type: string,
    data: T
}

export let actionCreator = <T>(type: string, initData?: T) => (data: T) => {
    if (initData !== undefined) {
        data = initData!
    }
    let action: Action<T> = {
        type,
        data,
    }
    return action
}