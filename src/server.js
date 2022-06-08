const dbClient = require('./helpers/db')
const bodyParser = require('body-parser')
const express = require('express')
const executionRepository = require('./modules/execution/repository')
const robot = require('./modules/roboter/roboter')
const port = 5000

const repo = new executionRepository(dbClient)

const app = express()
app.use(bodyParser.json())

app.post('/tibber-developer-test/enter-path', async function (request, response) {
	const commands = request.body.commands
	const actualRobot = new robot(request.body.start.x, request.body.start.y)

	const startTime = performance.now()
	commands.forEach((command) => {
		actualRobot.move(command.direction, command.steps)
	})
	const endTime = performance.now()

	await repo.add(actualRobot.getUniqueVisitedPositionsCount(), commands.length, endTime - startTime)

	response.setHeader('Content-Type', 'application/json')
	response.send(JSON.stringify(await repo.fetchLatestExecution()))
});

(async () => {
	await dbClient.connect()

	app.listen(port, () => {
		console.log(`Listening at http://localhost:${port}`)
	})
})()
