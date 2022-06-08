let robot = class {

	constructor (startCoordinateX, startCoordinateY) {
		this.coordinateX = startCoordinateX
		this.coordinateY = startCoordinateY

		this.uniquePositions = new Set()
		this.uniquePositions.add(this.getCurrentCoordinatesFormatted())
	}

	move (direction, steps) {
		for (let stepsMoved = 0; stepsMoved < steps; stepsMoved++) {
			switch (direction) {
				case 'east':
					this.moveEast(steps)
					break
				case 'west':
					this.moveWest(steps)
					break
				case 'north':
					this.moveNorth(steps)
					break
				case 'south':
					this.moveSouth(steps)
					break
				default:
					throw 'Direction not supported: ' + direction
			}
		}
	}

	moveEast () {
		this.coordinateX++
		this.uniquePositions.add(this.getCurrentCoordinatesFormatted())
	}

	moveWest () {
		this.coordinateX--
		this.uniquePositions.add(this.getCurrentCoordinatesFormatted())
	}

	moveNorth () {
		this.coordinateY--
		this.uniquePositions.add(this.getCurrentCoordinatesFormatted())
	}

	moveSouth () {
		this.coordinateY++
		this.uniquePositions.add(this.getCurrentCoordinatesFormatted())
	}

	getCurrentCoordinatesFormatted () {
		return this.coordinateX + '-' + this.coordinateY
	}

	getUniqueVisitedPositionsCount () {
		return this.uniquePositions.size
	}
}

module.exports = robot
