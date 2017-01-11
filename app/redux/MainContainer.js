import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as mainAction from 'mainAction'
import Page from 'Page'
import {mapStateToProps} from 'mainReducer'


function mapDispatchToProps(dispatch){
	return bindActionCreators(mainAction,dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Page)

