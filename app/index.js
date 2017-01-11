import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory } from 'react-router'
import {Provider} from 'react-redux'
import MainContainer from 'MainContainer'
import mainStore from 'mainStore'
import store from 'store'
import Home from 'Home'



const app = document.getElementById('app')
ReactDOM.render(
	<Provider store={mainStore}>
		<Router history={browserHistory}>
			<Route path="/" component={MainContainer}>
				<IndexRoute component={Home} />
			</Route>
		</Router>
	</Provider>, app)
