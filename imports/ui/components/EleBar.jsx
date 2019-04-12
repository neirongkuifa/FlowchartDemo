import React from 'react'

const EleBar = props => {
	return (
		<div style={styles.eleContainer}>
			<div
				data-test='ele-plus'
				style={styles.element}
				onClick={() => props.handleClickEle('+')}>
				+
			</div>
			<div
				data-test='ele-minus'
				style={styles.element}
				onClick={() => props.handleClickEle('-')}>
				-
			</div>
			<div
				data-test='ele-mul'
				style={styles.element}
				onClick={() => props.handleClickEle('×')}>
				×
			</div>
			<div
				data-test='ele-dvd'
				style={styles.element}
				onClick={() => props.handleClickEle('÷')}>
				÷
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
		lineHeight: '70px'
	},
	eleContainer: {
		display: 'flex'
	}
}

export default React.memo(EleBar)
