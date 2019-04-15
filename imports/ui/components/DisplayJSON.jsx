import React from 'react'
import PropTypes from 'prop-types'

/**
 * Function Component that only re-render when props change
 * @function DisplayJSON
 * @param {Object} props
 * @returns {Object}
 */
const DisplayJSON = props => {
	return <div data-test='json'>{props.json}</div>
}

DisplayJSON.propTypes = {
	json: PropTypes.string
}

export default DisplayJSON
