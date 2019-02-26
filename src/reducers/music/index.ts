import {reducerCreator, MUSIC } from '../../until/reducerType';


let initState = true

const music = reducerCreator(MUSIC, initState)

export default music