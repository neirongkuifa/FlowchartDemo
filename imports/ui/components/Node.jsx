import React, { useState } from 'react'
import Draggable from 'react-draggable'
import PropTypes from 'prop-types'

import propagateNodeValue from '../util/propagateNodeValue'

/**
 * Function Component that returns a node
 * @function
 * @param {*} props
 * @returns {Object}
 */
const Node = props => {
	const [num, setNum] = useState(0)

	/**
	 * Handle controlled input state change
	 * @function handleChange
	 * @param {Object} e - onChange event
	 */
	const handleChange = e => {
		setNum(e.target.value)
		const updateNodes = { ...props.nodes }
		updateNodes[props.id].value = parseFloat(e.target.value)

		// if node has outgoing link, propagate node value change
		if (updateNodes[props.id].portOut !== '') {
			const out = updateNodes[props.links[updateNodes[props.id].portOut].to].id
			propagateNodeValue(props.links, updateNodes, out, props.setDisplayValue)
		}

		props.setNodes(updateNodes)
		props.setJson(JSON.stringify({ nodes: updateNodes, links: props.links }))
	}

	/**
	 * Prevent mouse down propagation and focus on input
	 * @function  handleFocus
	 * @param {Object} e - mouseDown event
	 */
	const handleFocus = e => {
		e.stopPropagation()
		e.target.focus()
	}

	/**
	 * Display Node Value when clicked
	 * @function handleDisplayValue
	 */
	const handleDisplayValue = () => {
		props.setDisplayValue(
			'node id: ' + props.id + '  node value: ' + props.value
		)
	}

	// Switch display content based on symbol
	let content, ports
	if (['+', '-', '÷', '×'].includes(props.symbol)) {
		content = (
			<div
				className='handle'
				data-test={'node-handle' + props.symbol}
				style={styles.content}
				onClick={handleDisplayValue}>
				{props.symbol}
			</div>
		)

		ports = (
			<>
				<div style={styles.portIn}>in1</div>
				<div style={styles.portIn}>in2</div>
				<div
					data-test='port-out'
					onMouseDown={e => {
						props.setTempLink({
							from: { x: props.x - 17, y: props.y - 2 },
							id: props.id
						})
					}}>
					out
				</div>
			</>
		)
	} else {
		content = (
			<div
				className='handle'
				data-test={'node-handle' + props.symbol}
				style={styles.content}
				onClick={handleDisplayValue}>
				<input
					type='number'
					value={num}
					onMouseDown={e => handleFocus(e)}
					onClick={e => e.stopPropagation()}
					onChange={e => handleChange(e)}
				/>
			</div>
		)

		ports = (
			<div
				data-test='port-out'
				onMouseDown={e => {
					props.setTempLink({
						from: { x: props.x - 17, y: props.y - 2 },
						id: props.id
					})
				}}>
				out
			</div>
		)
	}

	// Component View
	return (
		<Draggable
			axis='both'
			handle='.handle'
			defaultPosition={{ x: props.x, y: props.y }}
			position={null}
			grid={[1, 1]}
			offsetParent={document.getElementById('canvas')}
			bounds='parent'
			onDrag={(e, position) => props.handleDrag(props.id, position)}
			scale={1}>
			<div
				data-test='node-draggable'
				id={props.id}
				style={props.symbol === '_' ? styles.inputContainer : styles.container}>
				<div style={styles.delContainer}>
					<div
						data-test={'delete' + props.symbol}
						style={styles.delbtn}
						onClick={() => props.handleDelete(props.id)}>
						×
					</div>
					<div style={styles.peek}>val:{props.value}</div>
				</div>
				{content}
				<div style={styles.ports}>{ports}</div>
			</div>
		</Draggable>
	)
}

// Props Type Check
Node.propTypes = {
	id: PropTypes.string,
	nodes: PropTypes.object,
	links: PropTypes.object,
	x: PropTypes.number,
	y: PropTypes.number,
	handleDelete: PropTypes.func,
	handleDrag: PropTypes.func,
	setNodes: PropTypes.func,
	setJson: PropTypes.func,
	setTempLink: PropTypes.func,
	setDisplayValue: PropTypes.func
}

// Style Info
const styles = {
	container: {
		height: '95px',
		width: '70px',
		border: 'solid 1px black',
		textAlign: 'center',
		position: 'absolute',
		top: '0px',
		userSelect: 'none'
	},
	inputContainer: {
		height: '95px',
		width: '140px',
		border: 'solid 1px black',
		textAlign: 'center',
		position: 'absolute',
		top: '0px',
		userSelect: 'none'
	},
	delContainer: {
		position: 'relative',
		height: '20px',
		borderBottom: 'solid 1px black'
	},
	delbtn: {
		position: 'absolute',
		padding: '1px',
		paddingLeft: '2px',
		paddingRight: '2px',
		color: 'red',
		borderLeft: 'solid 1px black',
		top: '0px',
		right: '0px'
	},
	peek: {
		position: 'absolute',
		top: '2px',
		left: '0px',
		fontSize: '0.7rem',
		paddingLeft: '1px'
	},
	content: {
		height: '50px',
		lineHeight: '50px',
		fontSize: '3rem'
	},
	ports: {
		height: '25px',
		padding: '0px',
		borderTop: 'solid 1px black',
		lineHeight: '25px',
		fontSize: '0.7rem'
	},
	port: {
		borderRight: 'solid 1px black',
		float: 'left',
		width: '50%',
		height: '24px'
	},
	portIn: {
		borderRight: 'solid 1px black',
		float: 'left',
		width: '25%',
		height: '24px'
	}
}

export default Node
