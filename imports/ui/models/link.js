class Link {
	constructor(from, to) {
		this.id = from + to
		this.from = from
		this.to = to
	}

	setOrigin(from) {
		this.from = from
	}

	setDest(to) {
		this.to = to
	}
}

export default Link
