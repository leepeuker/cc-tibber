const bodyParser = require('body-parser')
const express = require('express')
const port = 5000

const app = express()
app.use(bodyParser.json())

app.use('/', require('./modules/robot/controller'))

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})
