import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Simulate, act } from 'react-dom/test-utils'

import Flowchart from './Flowchart'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
	// Move Simulation for Draggable
	const mouseMove = (x, y, node) => {
		const doc = node ? node.ownerDocument : document
		const evt = doc.createEvent('MouseEvents')
		evt.initMouseEvent(
			'mousemove',
			true,
			true,
			window,
			0,
			0,
			0,
			x,
			y,
			false,
			false,
			false,
			false,
			0,
			null
		)
		doc.dispatchEvent(evt)
		return evt
	}

	const simulateMove = (drag, fromX, fromY, toX, toY) => {
		const node = ReactDOM.findDOMNode(drag)

		Simulate.mouseDown(node, { clientX: fromX, clientY: fromX })
		mouseMove(toX, toY, node)
		Simulate.mouseUp(node)
	}

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

			const canvas = container.querySelector("[data-test='canvas']")

			// Create node1
			const el1 = container.querySelector("[data-test='ele-num']")

			Simulate.click(el1)

			// Move node1 to the right
			const numHandle = container.querySelector("[data-test='node-handle_']")
			const out = container.querySelector("[data-test='port-out']")

			simulateMove(numHandle, 0, 0, 150, 0)

			// Create node2
			const el2 = container.querySelector("[data-test='ele-plus']")

			Simulate.click(el2)

			// mouse down on out node1 port
			Simulate.mouseDown(out)

			Simulate.mouseMove(canvas, {
				pageX: 50,
				pageY: 150
			})

			// mouse up on el2
			Simulate.mouseUp(canvas, {
				pageX: 50,
				pageY: 150
			})

			// There should be a new link on canvas
			const link = container.querySelectorAll("[data-test='link']")
			expect(link.length).to.equal(1)
			ReactDOM.unmountComponentAtNode(container)
		})

		it('deletes a node and links on this node', () => {
			const container = document.createElement('div')
			document.body.appendChild(container)
			ReactDOM.render(<Flowchart setJson={() => {}} />, container)

			const canvas = container.querySelector("[data-test='canvas']")

			// Create node1
			const el1 = container.querySelector("[data-test='ele-num']")

			Simulate.click(el1)

			// Move node1 to the right
			const numHandle = container.querySelector("[data-test='node-handle_']")
			const out = container.querySelector("[data-test='port-out']")

			simulateMove(numHandle, 0, 0, 150, 0)

			// Create node2
			const el2 = container.querySelector("[data-test='ele-plus']")

			Simulate.click(el2)

			// mouse down on out node1 port
			Simulate.mouseDown(out)

			Simulate.mouseMove(canvas, {
				pageX: 50,
				pageY: 150
			})

			// mouse up on node2
			Simulate.mouseUp(canvas, {
				pageX: 50,
				pageY: 150
			})

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
		})
	})
}
