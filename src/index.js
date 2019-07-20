const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('superagent')

app.use(express.static('public'))
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
  res.send('it works')
})
