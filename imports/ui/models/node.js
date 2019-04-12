class Node {
	// ToDo Add in and out
	constructor(x, y, symbol) {
		this.id = Date.now().toString()
		this.x = x
		this.y = y
		this.portOut = new Set()
		this.portIn = new Set()
		this.symbol = symbol
	}

	set(x, y) {
		this.x = x
		this.y = y
	}
}

export default Node
