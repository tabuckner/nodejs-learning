const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write(`
      <html>
        <head><title>Enter Message</title></head>
        <body>
          <form action="/message" method="POST">
            <input type="text" name="message">
            <button type="submit">Send</button>
          </form>
        </body>
      </html>
    `);
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const fileName = 'message.txt';
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile(fileName, message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
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
});

server.listen(6969);
