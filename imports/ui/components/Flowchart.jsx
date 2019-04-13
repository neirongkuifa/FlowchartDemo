import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Node_Model from '../models/node'
import Link_Model from '../models/link'
import Node from './Node'
import EleBar from './EleBar'

/**
 * Funtion Component that contains elements bar and flowchart
 * @function
 * @param {Object} props
 * @returns {Object}
 */
const Flowchart = props => {
	const [nodes, setNodes] = useState({})
	const [links, setLinks] = useState({})
	const [tempLink, setTempLink] = useState(null)

	const nodesOnCanvas = []
	const linksOnCanvas = []

	/**
	 * Add a node and update json
	 * @function handleClickEle
	 * @param {string} sign
	 */
	const handleClickEle = symbol => {
		const node = new Node_Model(0, 0, symbol, 0)
		const update = { ...nodes }
		update[node.id] = node
		setNodes(update)

		props.setJson(
			JSON.stringify({
				nodes: Object.values(update),
				links: Object.values(links)
			})
		)
	}

	/**
	 * Delete a node and all links on it and update json
	 * @function handleDeleteNode
	 * @param {string} id
	 */
	const handleDeleteNode = id => {
		const nodeUpdate = { ...nodes }
		const linkUpdate = { ...links }

		// if node is an arg of an operator, make sure the left arg is always the first arg
		if (nodes[id].portOut !== '') {
			const keys = Object.keys(nodeUpdate[links[nodes[id].portOut].to].portIn)
			if (keys.length === 2) {
				nodeUpdate[links[nodes[id].portOut].to].portIn[keys[0]] = '1'
				nodeUpdate[links[nodes[id].portOut].to].portIn[keys[1]] = '1'
			}
		}

		// Remove incoming links
		const node = nodes[id]
		for (let key in node.portIn) {
			const from = links[key].from
			nodeUpdate[from].portOut = ''
			delete linkUpdate[key]
		}

		// if node's out port is nonempty, Remove outgoing links
		if (node.portOut !== '') {
			const to = links[node.portOut].to
			delete nodeUpdate[to].portIn[node.portOut]
			delete linkUpdate[node.portOut]
		}

		// Delete Node
		delete nodeUpdate[id]
		props.setJson(
			JSON.stringify({
				nodes: Object.values(nodeUpdate),
				links: Object.values(linkUpdate)
			})
		)
		setNodes(nodeUpdate)
		setLinks(linkUpdate)
	}

	/**
	 * Update node position and update json
	 * @function handleDrag
	 * @param {string} id
	 * @param {Object} position
	 */
	const handleDrag = (id, position) => {
		const update = { ...nodes }
		update[id].set(position.x, position.y)
		props.setJson(
			JSON.stringify({
				nodes: Object.values(update),
				links: Object.values(links)
			})
		)
		setNodes(update)
	}

	/**
	 * Create a temporary link. Set tempLink state. Do not update json and links before drop
	 * @function handleMouseDown
	 * @param {Object} e - mouse down event
	 */
	const handleMouseDown = e => {
		if (tempLink) {
			const canvas = document.getElementById('canvas')
			const mouseX = e.pageX - canvas.offsetLeft - 5
			const mouseY = e.pageY - canvas.offsetTop - 90
			const from = tempLink.from
			setTempLink({
				from: {
					x: from.x,
					y: from.y
				},
				to: { x: mouseX - 2, y: mouseY },
				id: tempLink.id
			})
		}
	}

	/**
	 * Function to handle mouse move event
	 * @function handleMouseMove
	 * @param {Object} e - mouse move event
	 */
	const handleMouseMove = e => {
		if (tempLink && tempLink.from) {
			const canvas = document.getElementById('canvas')
			const mouseX = e.pageX - canvas.offsetLeft - 5
			const mouseY = e.pageY - canvas.offsetTop - 90
			const from = tempLink.from
			setTempLink({
				from: { x: from.x, y: from.y },
				to: { x: mouseX - 2, y: mouseY },
				id: tempLink.id
			})
		}
	}

	/**
	 * Function to handle mouse up event
	 * @function handleMouseUp
	 * @param {Object} e - mouse up event
	 */
	const handleMouseUp = e => {
		if (tempLink) {
			const canvas = document.getElementById('canvas')
			const mouseX = e.pageX - canvas.offsetLeft
			const mouseY = e.pageY - canvas.offsetTop
			const to = inNode(mouseX, mouseY)

			// Cannot establish link when link to itself, link to a number, target has two args, target does not exist
			if (
				to &&
				to.symbol !== '_' &&
				Object.keys(to.portIn).length < 2 &&
				tempLink.id !== to.id
			) {
				// Update Links
				const link = new Link_Model(tempLink.id, to.id)
				const linkUpdate = { ...links }
				linkUpdate[link.id] = link
				setLinks(linkUpdate)

				// Update Nodes
				const nodeUpdate = { ...nodes }

				// Set portOut to link
				nodeUpdate[tempLink.id].portOut = link.id

				// Calculate operator node value once two args are ready
				if (Object.keys(to.portIn).length === 1) {
					nodeUpdate[to.id].portIn[link.id] = '2'
					propagateNodeValueUpdate(linkUpdate, nodeUpdate, to.id)
				} else {
					nodeUpdate[to.id].portIn[link.id] = '1'
				}
				setNodes(nodeUpdate)

				props.setJson(
					JSON.stringify({
						nodes: Object.values(nodeUpdate),
						links: Object.values(linkUpdate)
					})
				)
			}
		}
		setTempLink(null)
	}

	/**
	 * Propagete node value when the first node have two args
	 * @function
	 * @param { Object } nodes
	 * @param { string } id
	 */
	const propagateNodeValueUpdate = (links, nodes, id) => {
		const keys = Object.keys(nodes[id].portIn)
		if (keys.length === 2) {
			const arg1 =
				nodes[id].portIn[keys[0]] === '1'
					? nodes[links[keys[0]].from].value
					: nodes[links[keys[1]].from].value

			const arg2 =
				nodes[id].portIn[keys[0]] === '1'
					? nodes[links[keys[1]].from].value
					: nodes[links[keys[0]].from].value
			switch (nodes[id].symbol) {
				case '+':
					nodes[id].value = arg1 + arg2
					break
				case '-':
					nodes[id].value = arg1 - arg2
					break
				case '×':
					nodes[id].value = arg1 * arg2
					break
				case '÷':
					nodes[id].value = arg1 / arg2
					break
			}

			// If node has outgoing link, propagate result
			if (nodes[id].portOut !== '') {
				propagateNodeValueUpdate(links, nodes, links[nodes[id].portOut].to)
			}
		}
	}

	/**
	 * Funtion that return first node that mouse dropped within
	 * @function inNode
	 * @param {number} x
	 * @param {number} y
	 * @returns {(Object|null)}
	 */
	const inNode = (x, y) => {
		let node
		for (let k in nodes) {
			node = nodes[k]
			if (x >= node.x && x < node.x + 70 && y >= node.y && y < node.y + 95) {
				return node
			}
		}
		return null
	}

	/**
	 * Function to update nodes on canvas when nodes state changed
	 * @function updateNodesOnCanvas
	 */
	const updateNodesOnCanvas = () => {
		for (let key in nodes) {
			nodesOnCanvas.push(
				<Node
					data-test='node'
					key={nodes[key].id}
					id={nodes[key].id}
					nodes={nodes}
					links={links}
					{...nodes[key]}
					handleDelete={handleDeleteNode}
					handleDrag={handleDrag}
					setNodes={setNodes}
					setJson={props.setJson}
					setTempLink={setTempLink}
				/>
			)
		}
	}

	/**
	 * Funtion to update links on canvas when links state changed
	 * @function updateLinksOnCanvas
	 */
	const updateLinksOnCanvas = () => {
		// update links
		let from, to
		for (let key in links) {
			from = nodes[links[key].from]
			to = nodes[links[key].to]
			const path = `M${from.x + 70},${from.y + 95} C${from.x + 70},${from.y +
				125} ${to.x},${to.y + 120} ${to.x},${to.y + 90}`

			linksOnCanvas.push(
				<path
					data-test='link'
					key={key}
					d={path}
					stroke={'black'}
					strokeWidth={'2'}
					fill={'none'}
				/>
			)
		}

		//update temporary link
		if (tempLink && tempLink.to) {
			from = tempLink.from
			to = tempLink.to
			const path = `M${from.x + 70},${from.y + 95} C${from.x + 70},${from.y +
				125} ${to.x},${to.y + 120} ${to.x},${to.y + 90}`

			linksOnCanvas.push(
				<path
					data-test='link-temp'
					key={'temp'}
					d={path}
					stroke={'black'}
					strokeWidth={'2'}
					fill={'none'}
				/>
			)
		}
	}

	updateLinksOnCanvas()
	updateNodesOnCanvas()

	// Component View
	return (
		<div>
			<EleBar handleClickEle={handleClickEle} />
			<hr />
			<div
				data-test='canvas'
				id='canvas'
				style={styles.canvas}
				onMouseDown={e => handleMouseDown(e)}
				onMouseMove={e => handleMouseMove(e)}
				onMouseUp={e => handleMouseUp(e)}>
				<svg data-test='links' style={styles.links}>
					{linksOnCanvas}
				</svg>
				<div style={styles.nodes}>{nodesOnCanvas}</div>
			</div>
			<hr />
		</div>
	)
}

// Style Info
let window // Remove when finish test
const styles = {
	canvas: {
		position: 'relative',
		height: window ? window.innerWidth / 3 : '500px',
		width: '100%',
		border: 'solid 1px black'
	},
	nodes: {
		position: 'absolute',
		height: window ? window.innerWidth / 3 : '500px',
		width: '100%',
		top: '0px',
		left: '0px'
	},
	links: {
		position: 'absolute',
		height: window ? window.innerWidth / 3 : '500px',
		width: '100%',
		top: '0px',
		left: '0px'
	}
}

Flowchart.propTypes = {
	setJson: PropTypes.func
}

export default Flowchart
