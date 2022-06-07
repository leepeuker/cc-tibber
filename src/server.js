// @ts-check

const { Client } = require('pg')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 5000

const client = new Client({
	password: 'root', user: 'root', host: 'postgres',
})

app.use(bodyParser.json())

app.post('/tibber-developer-test/enter-path', async function (request, response) {
	let uniquePositions = new Set()
	let posX = request.body.start.x
	let posY = request.body.start.y

	let commands = request.body.commands

	uniquePositions.add(posX + '-' + posY)

	let startTime = performance.now()

	commands.forEach((command) => {
		switch (command.direction) {
			case 'east':
				for (let i = 0; i < command.steps; i++) {
					posX++
					uniquePositions.add(posX + '-' + posY)
				}
				break
			case 'west':
				posX -= command.steps
				for (let i = 0; i < command.steps; i++) {
					posX--
					uniquePositions.add(posX + '-' + posY)
				}
				break
			case 'north':
				for (let i = 0; i < command.steps; i++) {
					posY--
					uniquePositions.add(posX + '-' + posY)
				}
				break
			case 'south':
				posY += command.steps
				for (let i = 0; i < command.steps; i++) {
					posY++
					uniquePositions.add(posX + '-' + posY)
				}
				break
		}
	})

	let endTime = performance.now()

	let uniquePositionsCount = uniquePositions.size
	let commandCount = commands.length
	let duration = endTime - startTime

	const sql = 'INSERT INTO executions(commands, result, duration) VALUES($1, $2, $3)'
	const values = [uniquePositionsCount, commandCount, duration]

	await client.query(sql, values, (err, res) => {
			console.log(err, res)
		}
	)

	const lastExecution = await client
		.query('SELECT * FROM executions ORDER BY TIMESTAMP DESC LIMIT 1')
		.then((payload) => {
			return payload.rows
		})
		.catch(() => {
			throw new Error('Query failed')
		})

	response.setHeader('Content-Type', 'application/json')
	response.send(JSON.stringify(lastExecution[0]))
});

(async () => {
	await client.connect()

	app.listen(port, () => {
		console.log(`Listening at http://localhost:${port}`)
	})
})()
