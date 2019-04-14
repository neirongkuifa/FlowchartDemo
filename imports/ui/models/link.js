/**
 * Model for link instance
 * @class Link
 */
class Link {
	constructor(from, to) {
		this.id = from + to
		this.from = from
		this.to = to
	}
}

export default Link
