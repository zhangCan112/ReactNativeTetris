import { LOCK, reducerCreator } from '../../until/reducerType';


let initState = false

const lock = reducerCreator(LOCK, initState)

export default lock