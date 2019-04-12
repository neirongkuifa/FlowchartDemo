import React from 'react'
import Draggable from 'react-draggable'
import PropTypes from 'prop-types'

const Node = props => {
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
			<div id={props.id} style={styles.container}>
				<div style={styles.delete} onClick={() => props.handleDelete(props.id)}>
					Delete
				</div>
				<div className='handle' style={styles.content}>
					{props.symbol}
				</div>
				<div style={styles.ports}>
					<div style={styles.port}>in</div>
					<div
						onMouseDown={e => {
							props.setTempLink({
								from: { x: props.x - 17, y: props.y - 2 },
								id: props.id
							})
						}}>
						out
					</div>
				</div>
			</div>
		</Draggable>
	)
}

Node.propTypes = {
	id: PropTypes.string,
	x: PropTypes.number,
	y: PropTypes.number,
	handleDelete: PropTypes.func,
	handleMouseDown: PropTypes.func
}

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
	delete: {
		height: '20px',
		borderBottom: 'solid 1px black'
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
		lineHeight: '25px'
	},
	port: {
		borderRight: 'solid 1px black',
		float: 'left',
		width: '50%',
		height: '24px'
	}
}

export default Node
