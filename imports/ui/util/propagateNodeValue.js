/**
 * Propagete node value when the first node have two args
 * @function
 * @param { Object } links
 * @param { Object } nodes
 * @param { string } id
 */
const propagateNodeValue = (links, nodes, id) => {
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
			propagateNodeValue(links, nodes, links[nodes[id].portOut].to)
		}
	}
}

export default propagateNodeValue
