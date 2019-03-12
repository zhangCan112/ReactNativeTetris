/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react'

// if (process.env.NODE_ENV !== 'production') {
//     const {whyDidYouUpdate} = require('why-did-you-update');
//     whyDidYouUpdate(React, { groupByComponent: true, collapseComponentGroups: false, exclude: [/^TouchableText/,/^Decorate/] })
//     // whyDidYouUpdate(React, { include: [/^Block/] })      
//   }

AppRegistry.registerComponent(appName, () => App);
