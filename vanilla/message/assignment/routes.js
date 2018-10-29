const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write(`
      <html>
        <head><title>Home Page</title></head>
        <body>
          <h1>Welcome to The App</h1>
          <form action="/create-user" method="POST">
            <h3>Add a User</h3>
            <input type="text" name="username">
            <button type="submit">Send</button>
          </form>
        </body>
      </html>
    `);
    return res.end();
  }
  if (url === '/users' && method === 'GET') {
    res.write(`
      <html>
        <head><title>Users</title></head>
        <body>
          <ul>
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
            <li>User 4</li>
            <li>User 5</li>
          </ul>
        </body>
      </html>
    `);
    return res.end();
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const newUser = parsedBody.split('=')[1];
      console.log(`${newUser} has been added.\n`);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });
  }
  res.write(`
    <html>
      <head><title>Home</title></head>
      <body>
        <h1>Home Route</h1>
      </body>
    </html>
  `);
  res.end();
};

module.exports = requestHandler;
