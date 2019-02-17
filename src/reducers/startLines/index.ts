import { START_LINES, reducerCreator } from '../../until/reducerType';


let initState = 1

const startLines = reducerCreator(START_LINES, initState)

export default startLines