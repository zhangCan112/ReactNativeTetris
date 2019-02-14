import { POINTS, reducerCreator } from '../../until/reducerType';


let initState = 0

const points = reducerCreator(POINTS, initState)

export default points