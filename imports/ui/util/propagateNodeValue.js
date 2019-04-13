/**
 * Propagete node value when the first node have two args
 * @function
 * @param { Object } links
 * @param { Object } nodes
 * @param { string } id
 */
const defaultErrHandler = () => console.log('Calculation Error!')

const propagateNodeValue = (
	links,
	nodes,
	id,
	errHandler = defaultErrHandler
) => {
	const keys = Object.keys(nodes[id].portIn)
	if (keys.length === 2) {
		let arg1 =
			nodes[id].portIn[keys[0]] === '1'
				? nodes[links[keys[0]].from].value
				: nodes[links[keys[1]].from].value

		let arg2 =
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
				if (arg2 === 0) {
					errHandler(
						'arg2 of Divide cannot be 0, please enter a different value!'
					)
					arg2 = 1
				}
				nodes[id].value = arg1 / arg2
				break
		}

		// If node has outgoing link, propagate result
		if (nodes[id].portOut !== '') {
			propagateNodeValue(links, nodes, links[nodes[id].portOut].to)
		}
	}
}

export default propagateNodeValue
