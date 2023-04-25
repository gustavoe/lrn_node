const http = require('http');

const server = http.createServer((req, res)=>{
  console.log("res ==>");
  console.log("statusCode: ", res.statusCode);

  // Podemos cambiar el statusCode
  res.statusCode = 404;
  console.log("statusCode: ", res.statusCode);
  
  // Podemos configurar la cabecera
  res.setHeader("content-type", "application/json");
  console.log("header: ", res.getHeaders())
  
  res.end("Hola mundo");
});

const port = 3000;

server.listen(port, ()=>{
  console.log(`El servidor está escuchando en http://localhost:${port}...`)
})
