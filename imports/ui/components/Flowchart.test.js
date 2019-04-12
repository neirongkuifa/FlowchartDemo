import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

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
			const props = { setJson: () => {} }
			const wrapper = setup(props)
			const element = wrapper.find("[data-test='ele-minus']")
			element.simulate('click')
			wrapper.update()
			const node = wrapper.find("[data-test='node']")
			expect(node.length).to.equal(1)
			expect(node.text()).to.contain('-')
		})

		// TODO Test Drag and Drop
		it('adds a link when you click one port and drop on another element')

		// TODO Test Deletion
		it('deletes a node and links on this node')
	})
}
