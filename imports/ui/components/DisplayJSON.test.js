import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import DisplayJSON from './DisplayJSON'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
	const setup = (props = {}) => {
		return shallow(<DisplayJSON {...props} />)
	}
	describe('App', () => {
		it('renders without crashing', () => {
			const div = document.createElement('div')
			ReactDOM.render(<DisplayJSON />, div)
			ReactDOM.unmountComponentAtNode(div)
		})
	})
}
