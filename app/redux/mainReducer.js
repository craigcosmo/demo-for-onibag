import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'


// list of reducers
import homeReducer from 'homeReducer'


export const mapStateToProps = (state) => {
	return {
		home: state.home

	}
}
export default combineReducers({
	home: homeReducer,
	routing: routerReducer
})

