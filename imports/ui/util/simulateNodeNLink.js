import ReactDOM from 'react-dom'
import { Simulate } from 'react-dom/test-utils'

import simulateMove from '../util/simulateMove'

/**
 * Function that simulates adding two nodes and a link between them
 * @function simulateNodeNLink
 * @param {string} node1 - Symbol for node1
 * @param {string} node2 - Symbol for node2
 * @param {Object} container - container for nodes and link
 * @param {number} offsetTop - canvas offsetTop
 */
const simulateNodeNLink = (node1, node2, container, offsetTop = 250) => {
	const symbolEnum = {
		'+': 'plus',
		'-': 'minus',
		'×': 'mul',
		'÷': 'dvd',
		_: 'num'
	}
	const canvas = container.querySelector("[data-test='canvas']")

	// Create node1
	const el1 = container.querySelector(
		"[data-test='ele-" + symbolEnum[node1] + "']"
	)

	Simulate.click(el1)

	// Move node1 to the right
	const numHandle = container.querySelector(
		"[data-test='node-handle" + node1 + "']"
	)
	const out = container.querySelector("[data-test='port-out']")

	simulateMove(numHandle, 0, 0, 150, 0)

	// Create node2
	const el2 = container.querySelector(
		"[data-test='ele-" + symbolEnum[node2] + "']"
	)

	Simulate.click(el2)

	// mouse down on out node1 port
	Simulate.mouseDown(out)

	Simulate.mouseMove(canvas, {
		pageX: 30,
		pageY: offsetTop
	})

	// mouse up on el2
	Simulate.mouseUp(canvas, {
		pageX: 20,
		pageY: offsetTop
	})
}

export default simulateNodeNLink
