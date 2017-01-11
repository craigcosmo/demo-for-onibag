import {applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import {browserHistory } from 'react-router'

let middleware = applyMiddleware(thunk, logger(), routerMiddleware(browserHistory))

// if (process.env.NODE_ENV === 'production') {
// 	middleware = applyMiddleware(thunk, routerMiddleware(browserHistory))
// }

export default middleware
