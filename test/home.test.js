
import React from 'react'
import {expect} from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Home from 'Home'
import {shallow} from 'enzyme'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Home component', () => {
	const wrapper = shallow(<Home />)

	it('should render', () => {
		expect(wrapper.find('div')).to.have.length(1)
	})

	
})
