import React, { useState } from 'react'

import Node_Model from '../models/node'
import Link_Model from '../models/link'
import Node from './Node'
import EleBar from './EleBar'

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
	const handleClickEle = sign => {
		const node = new Node_Model(0, 0, sign)
		const update = { ...nodes }
		update[node.id] = node
		props.setJson(
			JSON.stringify({
				nodes: Object.values(update),
				links: Object.values(links)
			})
		)
		setNodes(update)
	}

	/**
	 * Delete a node and update json
	 * @function handleDeleteNode
	 * @param {string} id
	 */
	const handleDeleteNode = id => {
		const update = { ...nodes }
		delete update[id]
		props.setJson(
			JSON.stringify({
				nodes: Object.values(update),
				links: Object.values(links)
			})
		)
		setNodes(update)
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
	 * @param {string} id - nodes that triggered event
	 * @param {number} x - position
	 * @param {number} y - position
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
	 * @param {string} id - nodes that triggered event
	 * @param {number} x - position
	 * @param {number} y - position
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
	 * @param {string} id - nodes that triggered event
	 * @param {number} x - position
	 * @param {number} y - position
	 */
	const handleMouseUp = e => {
		if (tempLink) {
			const canvas = document.getElementById('canvas')
			const mouseX = e.clientX - canvas.offsetLeft
			const mouseY = e.clientY - canvas.offsetTop
			console.log(mouseX + ' ' + mouseY)
			const to = inNode(mouseX, mouseY)
			if (to) {
				const link = new Link_Model(tempLink.id, to.id)
				const linkUpdate = { ...links }
				linkUpdate[link.id] = link

				const nodeUpdate = { ...nodes }
				nodeUpdate[tempLink.id].portOut.add(link.id)
				nodeUpdate[to.id].portIn.add(link.id)
				props.setJson(
					JSON.stringify({
						nodes: Object.values(nodeUpdate),
						links: Object.values(linkUpdate)
					})
				)
				console.log('A')
				setLinks(linkUpdate)
				console.log('B')
				setNodes(nodeUpdate)
				console.log('C')
			}
		}
		setTempLink(null)
	}

	/**
	 * Funtion that return first node that mouse dropped within
	 * @function inNode
	 * @param {number} x
	 * @param {number} y
	 * @returns
	 */
	const inNode = (x, y) => {
		let node
		for (let k in nodes) {
			node = nodes[k]
			console.log(node)
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
					{...nodes[key]}
					handleDelete={handleDeleteNode}
					handleDrag={handleDrag}
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
		let from, to
		for (let key in links) {
			from = nodes[links[key].from]
			to = nodes[links[key].to]
			const path = `M${from.x + 70},${from.y + 95} C${from.x + 70},${from.y +
				125} ${to.x},${to.y + 120} ${to.x},${to.y + 90}`

			linksOnCanvas.push(
				<path
					key={key}
					d={path}
					stroke={'black'}
					strokeWidth={'2'}
					fill={'none'}
				/>
			)
		}
		if (tempLink && tempLink.to) {
			from = tempLink.from
			to = tempLink.to
			const path = `M${from.x + 70},${from.y + 95} C${from.x + 70},${from.y +
				125} ${to.x},${to.y + 120} ${to.x},${to.y + 90}`
			linksOnCanvas.push(
				<path
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

	return (
		<div>
			<EleBar handleClickEle={handleClickEle} />
			<hr />
			<div
				id='canvas'
				style={styles.canvas}
				onMouseDown={e => handleMouseDown(e)}
				onMouseMove={e => handleMouseMove(e)}
				onMouseUp={e => handleMouseUp(e)}>
				<svg style={styles.links}>{linksOnCanvas}</svg>
				<div style={styles.nodes}>{nodesOnCanvas}</div>
			</div>
			<hr />
		</div>
	)
}

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

export default Flowchart
