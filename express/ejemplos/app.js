const http = require('http');

const server = http.createServer((req, res)=>{
  if (req.method === "GET" && req.url === "/"){
    res.end("<h1>HOME MAS</h1>");
  }
});

const PORT = 3000;
server.listen(PORT, ()=>{
  console.log('Eschcnan')
})
