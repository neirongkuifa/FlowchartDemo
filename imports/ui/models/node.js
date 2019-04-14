/**
 * Model for node instance
 * @class Node
 */
class Node {
	constructor(x, y, symbol, value) {
		this.id = Date.now().toString()
		this.x = x
		this.y = y
		this.portOut = ''
		this.portIn = {}
		this.symbol = symbol
		this.value = value
	}
}

export default Node
