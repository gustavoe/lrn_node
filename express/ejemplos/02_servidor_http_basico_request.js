const http = require('http');

const server = http.createServer((req, res)=>{
  console.log("req ==>");
  console.log("url: ", req.url);
  console.log("method: ", req.method);
  console.log("headers:\n", req.headers);
  res.end("Hola mundo");
});

const port = 3000;

server.listen(port, ()=>{
  console.log(`El servidor está escuchando en http://localhost:${port}...`)
})


