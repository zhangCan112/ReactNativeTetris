import {Dimensions} from 'react-native'

var {height,width} =  Dimensions.get('window');

export default {
    screenWidth: width,
    screenHeight: height,
    screenWidthPoint: width / 387.,       
}