# Express


<!-- vim-markdown-toc GFM -->

* [1. Creando un servidor con `http`](#1-creando-un-servidor-con-http)
* [2. URLs](#2-urls)
    * [2.1. Anatomía de una URL](#21-anatomía-de-una-url)
    * [2.2. Módulo URL](#22-módulo-url)

<!-- vim-markdown-toc -->

## 1. Creando un servidor con `http`

```javascript
const http = require('http');

const server = http.createServer((req, res)=>{
  console.log("Se ha recibido una petición");
  res.end("Hola mundo");
});

const port = 3000;

server.listen(port, ()=>{
  console.log(`El servidor está escuchando en http://localhost:${port}...`)
})
```
Se puede acceder a datos importantes de la petición usando las propiedades del objeto `req`

```javascript
  console.log("req ==>");
  console.log("url: ", req.url);
  console.log("method: ", req.method);
  console.log("headers:\n", req.headers);
```
Y visualizar o modificar propiedades de la respuesta mediante `res`

```javascript
  console.log("res ==>");
  console.log("statusCode: ", res.statusCode);

  // Podemos cambiar el statusCode
  res.statusCode = 404;
  console.log("statusCode: ", res.statusCode);
  
  // Podemos configurar la cabecera
  res.setHeader("content-type", "application/json");
  console.log("header: ", res.getHeaders())
  
  res.end("Hola mundo");
```

## 2. URLs

### 2.1. Anatomía de una URL

`https://www.freecodecamp.org/espanol/`
`https://www.ejemplo.com/usuarios/14`
`https://www.google.com/search?q=cursos+de+node`

* `www`: subdominio
* `freecodecamp`: dominio
* `org`: TLD Top Level Domain - Dominio de nivel superior
* `/espanol/`: path - archivo o directorio en el servidor
* `/usuarios/14`: parámetro de ruta
* `?q=cursos+de+node&page=1`: querystring - parámetro query

### 2.2. Módulo URL

Mediante las propiedades del módulo url podemos obtener los distintos elementos de una url.

```javascript
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
    let cuerpo = '';

    req.on('data', contenido => {
      cuerpo += contenido.toString();
    })

    req.on('end', ()=>{
      console.log(cuerpo);
      console.log(typeof cuerpo);

      cuerpo = JSON.parse(cuerpo);

      console.log(typeof cuerpo);
      console.log(cuerpo);
      console.log(cuerpo.titulo);

      return res.end("El servidor recibió una solicitud POST para /cursos/programacion")
    })
    //return res.end("El servidor recibió una solicitud POST para /cursos/programacion")
  } 
}

const port = 3000;

server.listen(port, ()=>{
  console.log(`Server escuchando en http://localhost:${port}`);
})
```
Podemos realizar las peticiones con curl:

```bash
curl -X GET http://localhost:3000/ 
curl -X GET http://localhost:3000/cursos 
curl -X GET http://localhost:3000/cursos/programacion 
curl -X POST http://localhost:3000/cursos/programacion -H Content-Type: application/json -d '{titulo: 123456, quantity: 100}'

```





```javascript
```
```javascript
```
```javascript
```
```javascript
```
```javascript
```
```javascript
```
