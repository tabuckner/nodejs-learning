const express = require('express');

const app = express();

app.use('/poopy', (req, res, next) => {
  console.log('In the middleware twice.');
  res.send(`<h1>It's doodoo baby 💩!</h1>`);
});

app.use('/', (req, res, next) => {
  console.log('In the middleware once.');
  res.send(`<h1>My Sick App</h1>`);
});

app.listen(3000);
