import { START_LINES, reducerCreator } from '../../until/reducerType';


let initState = 0

const startLines = reducerCreator(START_LINES, initState)

export default startLines