import ReactDOM from 'react-dom'
import { Simulate } from 'react-dom/test-utils'

/**
 * Function to simulate mouse move for Drggable third party component
 * @function mouseMove
 * @param {number} x
 * @param {number} y
 * @param {Object} node
 * @returns {Object}
 */
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
/**
 * Function to simulate drag and drop
 * @function simulateMove
 * @param {Object} drag
 * @param {number} fromX
 * @param {number} fromY
 * @param {number} toX
 * @param {number} toY
 */
const simulateMove = (drag, fromX, fromY, toX, toY) => {
	const node = ReactDOM.findDOMNode(drag)

	Simulate.mouseDown(node, { clientX: fromX, clientY: fromY })
	mouseMove(toX, toY, node)
	Simulate.mouseUp(node)
}
export default simulateMove
