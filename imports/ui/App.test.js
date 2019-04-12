import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import App from './App'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
	describe('App', () => {
		it('renders without crashing', () => {
			const div = document.createElement('div')
			ReactDOM.render(<App />, div)
			ReactDOM.unmountComponentAtNode(div)
		})

		it('renders Flowchart component', () => {
			const wrapper = shallow(<App />)
			const component = wrapper.find("[data-test='cpn-flowchart']")
			expect(component.length).to.equal(1)
		})

		it('renders DisplayJSON component', () => {
			const wrapper = shallow(<App />)
			const component = wrapper.find("[data-test='cpn-displayjson']")
			expect(component.length).to.equal(1)
		})
	})
}
