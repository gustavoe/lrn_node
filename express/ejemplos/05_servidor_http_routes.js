const http = require('http');
const cursos = require("./cursos");

const server = http.createServer((req, res) => {
  const {method} = req;
  
  switch(method){
    case 'GET': 
      return manejarSolicitudGET(req, res);
    case 'POST':
      return manejarSolicitudPOST(req, res);

    default: 
      console.log(`El método ${method} no puede ser manejado por el servidor`);
  }

});

function manejarSolicitudGET(req, res){
  const path = req.url;

  if (path === '/'){
    res.statusCode = 200;
    return res.end("Bienvenidos")
  } else if (path === '/cursos'){
    res.statusCode = 200;
    return res.end(JSON.stringify(cursos.infoCursos));
  } else if (path === '/cursos/programacion'){
    res.statusCode = 200;
    return res.end(JSON.stringify(cursos.infoCursos.programacion));
  } else {
    res.statusCode = 404;
    return res.end('El recurso solicitado no existe...');
  }
}


function manejarSolicitudPOST(req, res){
  const path = req.url;

  if (path === '/cursos/programacion'){
    res.statusCode = 200;
    return res.end("El servidor recibió una solicitud POST para /cursos/programacion")
  } 
}

const port = 3000;

server.listen(port, ()=>{
  console.log(`Server escuchando en http://localhost:${port}`);
})
