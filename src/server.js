require('dotenv').config()
const { Client } = require('pg')
const bodyParser = require('body-parser')
const express = require('express')
const executionRepository = require('./modules/executions/repository')
const robot = require('./robot')
const port = process.env.APP_PORT

const client = new Client({
	database: process.env.POSTGRES_DB,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.POSTGRES_HOST,
})
const repo = new executionRepository(client)

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
	await client.connect()

	app.listen(port, () => {
		console.log(`Listening at http://localhost:${port}`)
	})
})()
