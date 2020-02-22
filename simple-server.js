const express = require('express')
const app = express()
const opn = require('opn')

const port = 3000

app.use(express.static('./'))

app.listen(port, () => {
  console.log('Example app listening!')
  opn(`http://127.0.0.1:${port}/src/check-in.html`)
})

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
