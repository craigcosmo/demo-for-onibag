import React from 'react'
// global style
import '../style/globalStyle/normalize.scss'
import '../style/globalStyle/flexboxgrid.scss'
import '../style/globalStyle/page.scss'
import '../style/globalStyle/media.scss'
import '../style/globalStyle/gap.scss'

export default class Page extends React.Component {
	render() {
		return (
			<div className="page mb30">
				{React.cloneElement(this.props.children, {...this.props})}
			</div>
		)
	}
}

