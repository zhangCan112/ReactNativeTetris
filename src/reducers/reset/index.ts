import { RESET, reducerCreator } from '../../until/reducerType';


let initState = false

const reset = reducerCreator(RESET, initState)

export default reset