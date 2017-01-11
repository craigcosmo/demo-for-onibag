import i from 'actionConstant'
const defaultState= {

}
export default (state = defaultState, action) => {
	switch(action.type){
		case i.SUBMIT_LOCATION:
		return {...state}
	}
	return state
}
