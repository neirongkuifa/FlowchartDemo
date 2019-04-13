import React from 'react'
import PropTypes from 'prop-types'

/**
 * Function Component that only re-render when props change
 * @function
 * @param {*} props
 * @returns {Object}
 */
const DisplayJSON = props => {
	return <div>{props.json}</div>
}

DisplayJSON.propTypes = {
	json: PropTypes.string
}

export default React.memo(DisplayJSON)
