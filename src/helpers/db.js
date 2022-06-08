require('dotenv').config()
const { Client } = require('pg')

const dbClient = new Client({
	database: process.env.POSTGRES_DB,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.POSTGRES_HOST,
})

module.exports = dbClient
