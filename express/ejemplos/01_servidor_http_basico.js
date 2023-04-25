const http = require('http');

const server = http.createServer((req, res)=>{
  console.log("Se ha recibido una petición");
  res.end("Hola mundo");
});

const port = 3000;

server.listen(port, ()=>{
  console.log(`El servidor está escuchando en http://localhost:${port}...`)
})
