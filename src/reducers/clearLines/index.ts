import { CLEAR_LINES, reducerCreator } from '../../until/reducerType';


let initState = 0

const clearLines = reducerCreator(CLEAR_LINES, initState)
export default clearLines