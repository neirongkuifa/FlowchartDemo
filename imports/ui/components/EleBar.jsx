import React from 'react'
import PropTypes from 'prop-types'

/**
 * Function Component that only re-render when props change
 * @function EleBar
 * @param {Object} props
 * @returns {Object}
 */
const EleBar = props => {
	/**
	 * Handle element drag event
	 * @function handleDragStart
	 * @param {Object} e
	 */
	const handleDragStart = (e, symbol) => {
		e.dataTransfer.setData('symbol', symbol)
	}
	return (
		<div style={styles.eleContainer}>
			<div
				draggable='true'
				onDragStart={e => handleDragStart(e, '+')}
				data-test='ele-plus'
				style={styles.element}
				onClick={() => props.handleClickEle('+')}>
				+
			</div>
			<div
				draggable='true'
				onDragStart={e => handleDragStart(e, '-')}
				data-test='ele-minus'
				style={styles.element}
				onClick={() => props.handleClickEle('-')}>
				-
			</div>
			<div
				draggable='true'
				onDragStart={e => handleDragStart(e, '×')}
				data-test='ele-mul'
				style={styles.element}
				onClick={() => props.handleClickEle('×')}>
				×
			</div>
			<div
				draggable='true'
				onDragStart={e => handleDragStart(e, '÷')}
				data-test='ele-dvd'
				style={styles.element}
				onClick={() => props.handleClickEle('÷')}>
				÷
			</div>
			<div
				draggable='true'
				onDragStart={e => handleDragStart(e, '_')}
				data-test='ele-num'
				style={styles.element}
				onClick={() => props.handleClickEle('_')}>
				_
			</div>
		</div>
	)
}

const styles = {
	element: {
		height: '70px',
		width: '70px',
		border: 'solid 1px black',
		textAlign: 'center',
		fontSize: '3rem',
		margin: '2px 5px',
		lineHeight: '70px',
		userSelect: 'none'
	},
	eleContainer: {
		display: 'flex'
	}
}

EleBar.propTypes = {
	handleClickEle: PropTypes.func
}

export default React.memo(EleBar)
