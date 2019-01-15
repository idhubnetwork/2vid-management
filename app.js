const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => res.send('index',function(err, html) {
  res.send("hello world");
  // console.log('helloworld')
}))
// app.get('/', (req, res) => res.send('index'))


app.listen(3000, () => console.log('Example app listening on port 3000!'))
