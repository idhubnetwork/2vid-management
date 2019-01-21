const express = require('express');

const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => res.send('index', (err, html) => {
  if (err) {
    console.error(err);
  } else {
    res.send(html);
  }
}));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
