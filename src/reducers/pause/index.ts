import { PAUSE, reducerCreator } from '../../until/reducerType';


let initState = false

const pause = reducerCreator(PAUSE, initState)

export default pause