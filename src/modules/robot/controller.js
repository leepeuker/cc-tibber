const dbClient = require('./../../helpers/db')
const express = require('express')
const robotServiceImport = require('./service')
const executionRepositoryImport = require('./../execution/repository')
const router = express.Router()

const executionRepository = new executionRepositoryImport(dbClient)
const robotService = new robotServiceImport(executionRepository)

router.post('/tibber-developer-test/enter-path', moveRoboter)

module.exports = router

async function moveRoboter (request, response) {
	const startCoordinateX = request.body.start.x
	const startCoordinateY = request.body.start.y
	const commands = request.body.commands

	let executionLog = await robotService.processCommands(startCoordinateX, startCoordinateY, commands)

	response.setHeader('Content-Type', 'application/json')
	response.send(JSON.stringify(executionLog))
}
