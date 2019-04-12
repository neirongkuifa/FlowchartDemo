import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import App from './App'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
	describe('App', () => {
		const setup = (props = {}) => {
			return mount(<App {...props} />)
		}
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

		it('updates json when there is a new node', () => {
			const wrapper = setup()
			const element = wrapper.find("[data-test='ele-minus']")
			element.simulate('click')
			wrapper.update()
			const node = wrapper.find("[data-test='node']")
			const json = wrapper.find("[data-test='cpn-displayjson']")
			expect(json.text()).to.contain(node.props().id)
		})

		// TODO
		it('updates json when there is a new link')

		it('updates json when delete a node')
	})
}
