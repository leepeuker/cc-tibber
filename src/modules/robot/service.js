const robotImport = require('./robot')

let service = class {

	constructor (executionRepository) {
		this.executionRepository = executionRepository
	}

	async processCommands (startCoordinateX, startCoordinateY, commands) {
		const startTime = performance.now()

		const robot = new robotImport(startCoordinateX, startCoordinateY)

		commands.forEach((command) => {
			robot.move(command.direction, command.steps)
		})

		const endTime = performance.now()

		await this.executionRepository.add(robot.getUniqueVisitedPositionsCount(), commands.length, endTime - startTime)

		return await this.executionRepository.fetchLatestExecution()
	}
}

module.exports = service
