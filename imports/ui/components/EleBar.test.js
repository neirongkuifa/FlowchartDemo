import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import EleBar from './EleBar'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
	const setup = (props = {}) => {
		return shallow(<EleBar {...props} />)
	}
	describe('App', () => {
		it('renders without crashing', () => {
			const div = document.createElement('div')
			ReactDOM.render(<EleBar />, div)
			ReactDOM.unmountComponentAtNode(div)
		})
	})
}
