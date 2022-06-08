let ExecutionRepository = class {

	constructor (databaseClient) {
		this.databaseClient = databaseClient
	}

	async add (uniquePositionsCount, commandCount, duration) {
		const sql = 'INSERT INTO executions(commands, result, duration) VALUES($1, $2, $3)'
		const values = [commandCount, uniquePositionsCount, duration]

		await this.databaseClient.query(sql, values)
			.catch(e => console.error(e.stack))
	}

	async fetchLatestExecution () {
		const sql = 'SELECT * FROM executions ORDER BY TIMESTAMP DESC LIMIT 1'

		return await this.databaseClient
			.query(sql)
			.then((result) => {
				return result.rows[0]
			})
			.catch(e => console.error(e.stack))
	}
}

module.exports = ExecutionRepository
