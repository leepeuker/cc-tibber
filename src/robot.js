let Robot = class {

	constructor (posX, posY) {
		this.posX = posX
		this.posY = posY

		this.uniquePositions = new Set()
		this.uniquePositions.add(posX + '-' + posY)
	}

	move (direction, steps) {
		switch (direction) {
			case 'east':
				for (let i = 0; i < steps; i++) {
					this.posX++
					this.uniquePositions.add(this.posX + '-' + this.posY)
				}
				break
			case 'west':
				for (let i = 0; i < steps; i++) {
					this.posX--
					this.uniquePositions.add(this.posX + '-' + this.posY)
				}
				break
			case 'north':
				for (let i = 0; i < steps; i++) {
					this.posY--
					this.uniquePositions.add(this.posX + '-' + this.posY)
				}
				break
			case 'south':
				for (let i = 0; i < steps; i++) {
					this.posY++
					this.uniquePositions.add(this.posX + '-' + this.posY)
				}
				break
		}
	}

	getUniqueVisitedPositionsCount () {
		return this.uniquePositions.size
	}
}

module.exports = Robot
