const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   console.log('Fake Middleware 1');
// });

// app.use((req, res, next) => {
//   console.log('Fake Middleware 2');
// });

app.use('/users', (req, res, next) => {
  console.log('Users middleware.');
  res.send(`
    <h1>It's doodoo baby 💩!</h1>
    <ul>
      <li>User 1</li>
      <li>User 2</li>
      <li>User 3</li>
    </ul>
  `);
});

app.use('/', (req, res, next) => {
  console.log('Catch-all route.');
  res.send(`<h1>My Catch All Route</h1>`);
});

app.listen(3000);
