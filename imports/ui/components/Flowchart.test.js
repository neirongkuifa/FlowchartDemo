import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Simulate } from 'react-dom/test-utils'

import Flowchart from './Flowchart'
import simulateNodeNLink from '../util/simulateNodeNLink'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
	// Wrapper Setup
	const setup = (props = {}) => {
		props.setJson = () => {}
		return mount(<Flowchart {...props} />)
	}

	// Test Begins Here
	describe('Flowchart', () => {
		it('renders without crashing', () => {
			const div = document.createElement('div')
			ReactDOM.render(<Flowchart />, div)
			ReactDOM.unmountComponentAtNode(div)
		})

		it('adds a node when element is clicked', () => {
			const wrapper = setup()
			const element = wrapper.find("[data-test='ele-minus']")
			element.simulate('click')
			wrapper.update()
			const node = wrapper.find("[data-test='node']")
			expect(node.length).to.equal(1)
			expect(node.text()).to.contain('-')
		})

		it('adds a link when you click one port and drop on another element', () => {
			const container = document.createElement('div')
			document.body.appendChild(container)
			ReactDOM.render(<Flowchart setJson={() => {}} />, container)

			simulateNodeNLink('_', '+', container, 150)

			// There should be a new link on canvas
			const link = container.querySelectorAll("[data-test='link']")
			expect(link.length).to.equal(1)

			ReactDOM.unmountComponentAtNode(container)
		})

		it('deletes a node and links on this node', () => {
			const container = document.createElement('div')
			document.body.appendChild(container)
			ReactDOM.render(<Flowchart setJson={() => {}} />, container)

			simulateNodeNLink('-', '+', container, 150)

			// Delete node2 and link
			let del = container.querySelectorAll("[data-test='delete+']")
			let link = container.querySelectorAll("[data-test='link']")

			expect(del.length).to.equal(1)
			expect(link.length).to.equal(1)

			Simulate.click(del[0])

			del = container.querySelectorAll("[data-test='delete+']")
			link = container.querySelectorAll("[data-test='link']")
			expect(del.length).to.equal(0)
			expect(link.length).to.equal(0)

			ReactDOM.unmountComponentAtNode(container)
		})
	})
}
