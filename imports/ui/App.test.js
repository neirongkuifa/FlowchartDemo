import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Simulate } from 'react-dom/test-utils'

import App from './App'
import simulateNodeNLink from './util/simulateNodeNLink'

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

		it('updates json when there is a new link', () => {
			const container = document.createElement('div')
			document.body.appendChild(container)
			ReactDOM.render(<App />, container)

			let displayjson = container.querySelector("[data-test='json']")
			expect(displayjson.innerHTML).to.equal('')

			simulateNodeNLink('_', '+', container)

			displayjson = container.querySelector("[data-test='json']")
			json = JSON.parse(displayjson.innerHTML)
			expect(json.links.length).to.equal(1)

			ReactDOM.unmountComponentAtNode(container)
		})

		it('updates json when delete a node', () => {
			const container = document.createElement('div')
			document.body.appendChild(container)
			ReactDOM.render(<App />, container)

			simulateNodeNLink('_', '+', container)

			displayjson = container.querySelector("[data-test='json']")
			json = JSON.parse(displayjson.innerHTML)
			expect(json.nodes.length).to.equal(2)
			expect(json.links.length).to.equal(1)

			const del = container.querySelector("[data-test='delete_']")

			Simulate.click(del)

			displayjson = container.querySelector("[data-test='json']")
			json = JSON.parse(displayjson.innerHTML)
			expect(json.nodes.length).to.equal(1)
			expect(json.links.length).to.equal(0)

			ReactDOM.unmountComponentAtNode(container)
		})
	})
}
