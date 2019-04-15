import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Node from './Node'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
	const setup = (props = {}) => {
		return shallow(<Node {...props} />)
	}
	describe('Node', () => {
		it('renders without crashing', () => {
			const div = document.createElement('div')
			ReactDOM.render(<Node />, div)
			ReactDOM.unmountComponentAtNode(div)
		})
	})
}
