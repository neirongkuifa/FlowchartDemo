/**
 * Model for node instance
 * @class Node
 */
class Node {
	constructor(x, y, symbol) {
		this.id = Date.now().toString()
		this.x = x
		this.y = y
		this.portOut = {}
		this.portIn = {}
		this.symbol = symbol
	}

	set(x, y) {
		this.x = x
		this.y = y
	}
}

export default Node
