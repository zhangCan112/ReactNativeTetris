import { MAX, reducerCreator } from '../../until/reducerType';


let initState = 0

const max = reducerCreator(MAX, initState)

export default max