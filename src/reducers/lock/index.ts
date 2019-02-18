import { LOCK, reducerCreator } from '../../until/reducerType';


let initState = true

const lock = reducerCreator(LOCK, initState)

export default lock