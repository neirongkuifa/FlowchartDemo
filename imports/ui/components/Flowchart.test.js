import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Simulate, act } from 'react-dom/test-utils'

import Flowchart from './Flowchart'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
	const setup = (props = {}) => {
		props.setJson = () => {}
		return mount(<Flowchart {...props} />)
	}
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

		//TODO
		it('adds a link when you click one port and drop on another element', () => {})
		// 	const container = document.createElement('div')
		// 	document.body.appendChild(container)
		// 	ReactDOM.render(<Flowchart setJson={() => {}} />, container)

		// 	const el1 = container.querySelector("[data-test='ele-num']")

		// 	Simulate.click(el1)

		// 	const el2 = container.querySelector("[data-test='ele-plus']")

		// 	Simulate.click(el2)

		// 	const node = container.querySelector("[data-test='node-draggable_']")
		// 	const out = node.querySelector("[data-test='port-out']")
		// 	const canvas = container.querySelector("[data-test='canvas']")

		// 	// mouse down on out port
		// 	Simulate.mouseDown(out, {
		// 		pageX: 0,
		// 		pageY: 0
		// 	})

		// 	// mouse down on canvas
		// 	Simulate.mouseDown(canvas, {
		// 		pageX: 0,
		// 		pageY: 0
		// 	})

		// 	let tempLink = container.querySelectorAll("[data-test='link-temp']")
		// 	expect(tempLink.length).to.equal(1)

		// 	Simulate.mouseMove(canvas, {
		// 		pageX: 0,
		// 		pageY: 0
		// 	})

		// 	tempLink = container.querySelectorAll("[data-test='link-temp']")
		// 	expect(tempLink.length).to.equal(1)

		// 	Simulate.mouseUp(canvas, {
		// 		pageX: 50,
		// 		pageY: 150
		// 	})

		// 	const link = container.querySelectorAll("[data-test='link']")
		// 	expect(link.length).to.equal(1)
		// })

		// TODO
		it('deletes a node and links on this node', () => {})
		// 	const container = document.createElement('div')
		// 	document.body.appendChild(container)
		// 	ReactDOM.render(<Flowchart setJson={() => {}} />, container)

		// 	const el1 = container.querySelector("[data-test='ele-num']")

		// 	Simulate.click(el1)

		// 	const el2 = container.querySelector("[data-test='ele-plus']")

		// 	Simulate.click(el2)

		// 	let node = container.querySelector("[data-test='node-draggable_']")
		// 	const out = node.querySelector("[data-test='port-out']")
		// 	const canvas = container.querySelector("[data-test='canvas']")

		// 	Simulate.mouseDown(out, {
		// 		pageX: 0,
		// 		pageY: 0
		// 	})

		// 	Simulate.mouseDown(canvas, {
		// 		pageX: 0,
		// 		pageY: 0
		// 	})

		// 	let tempLink = container.querySelectorAll("[data-test='link-temp']")
		// 	expect(tempLink.length).to.equal(1)

		// 	Simulate.mouseMove(canvas, {
		// 		pageX: 0,
		// 		pageY: 0
		// 	})

		// 	Simulate.mouseUp(canvas, {
		// 		pageX: 50,
		// 		pageY: 150
		// 	})

		// 	let links = container.querySelectorAll("[data-test='link']")
		// 	expect(links.length).to.equal(1)
		// 	expect(nodes.length).to.equal(2)
		// 	const delEl = nodes[0].querySelector("[data-test='delete']")

		// 	Simulate.click(delEl)

		// 	nodes = container.querySelectorAll("[data-test='node-draggable+']")
		// 	links = container.querySelectorAll("[data-test='link']")
		// 	expect(links.length).to.equal(0)
		// 	expect(nodes.length).to.equal(1)
		// })
	})
}
