# Express


<!-- vim-markdown-toc GFM -->

* [1. Creando un servidor con `http`](#1-creando-un-servidor-con-http)
* [2. URLs](#2-urls)
    * [2.1. Anatomía de una URL](#21-anatomía-de-una-url)
    * [2.2. Módulo URL](#22-módulo-url)
* [3. Routing en Node.js](#3-routing-en-nodejs)
* [4. Nodemon](#4-nodemon)
* [5. Express](#5-express)
    * [5.1. Servidor básico](#51-servidor-básico)
    * [5.2. Rutas que devuelven datos](#52-rutas-que-devuelven-datos)
    * [5.3. Parámetros de ruta](#53-parámetros-de-ruta)
    * [5.4. Parámetros query](#54-parámetros-query)
* [5.5. Routers en express](#55-routers-en-express)
    * [5.6. Routers en distintos archivos](#56-routers-en-distintos-archivos)
* [6. Manejar variables de entorno](#6-manejar-variables-de-entorno)
* [7. Crear servidor https](#7-crear-servidor-https)

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
const miURL = new URL('https://www.ejemplo.org/cursos/programacion?ordenar=vistas&nivel=1');

console.log(miURL.hostname);
console.log(miURL.pathname);

console.log(miURL.searchParams);
console.log(miURL.searchParams.get('ordenar'));
console.log(miURL.searchParams.get('nivel'));
```

## 3. Routing en Node.js

En general una ruta está definida por los siguientes elementos: 
* Método
* Path
* Como manejarlo

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
Se pueden eliminar los `res.statusCode = 200;` ya que es el status por defecto.

Podemos realizar las peticiones con curl:

```bash
curl -X GET http://localhost:3000/ 
curl -X GET http://localhost:3000/cursos 
curl -X GET http://localhost:3000/cursos/programacion 
curl -X POST http://localhost:3000/cursos/programacion -H Content-Type: application/json -d '{titulo: 123456, quantity: 100}'
```

## 4. Nodemon

Instalar [nodemon](https://nodemon.io/)

```bash
npm install -g nodemon
```
y para invocarlo, si por ejemplo, nuestra aplicación es `app.js`

```bash
nodemon app.js
```
Si estamos en powershell no nos permite invocarlo, hay que cambiar al bash o al command prompt

## 5. Express

### 5.1. Servidor básico

Inicializar la aplicación

```javascript
mkdir app-express && cd app-express
npm init -y
npm i express
```
 Nuestro primer servidor puede ser algo asi:

```javascript
const express = require('express');
const { infoCrsos } = require('./cursos');

const PORT = process.env.port || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Servidor Express Home</h1>')
});

app.listen(PORT, () =>{
  console.log(`Escuchando en http://localhost:${PORT}`);
})
```

### 5.2. Rutas que devuelven datos

Podemos agregar algunas rutas

```javascript
const express = require('express');
const { infoCrsos, infoCursos } = require('./cursos');

const PORT = process.env.port || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Servidor Express Home</h1>')
});

app.get('/api/cursos', (req, res) => {
  res.send(JSON.stringify(infoCursos));
})

app.get('/api/cursos/programacion', (req, res) => {
  res.send(JSON.stringify(infoCursos.programacion));
})

app.get('/api/cursos/matematicas', (req, res) => {
  res.send(JSON.stringify(infoCursos.matematicas));
})

app.listen(PORT, () =>{
  console.log(`Escuchando en http://localhost:${PORT}`);
})
```
### 5.3. Parámetros de ruta

Para agregar parámetros de ruta lo hacemos precedidos de dos puntos en la ruta

```javascript
app.get('/api/cursos/programacion/:lenguaje', (req, res) => {})
```
El parámetro estará disponible en la colección `req.params`

```javascript
  const lenguaje = req.params.lenguaje;
```

Ejemplo:

```javascript
app.get('/api/cursos/programacion/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);
  if (resultados.length === 0){
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
  }
  res.send(JSON.stringify(resultados));
})

app.get('/api/cursos/matematicas/:tema', (req, res) => {
  const tema = req.params.tema;
  const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema);
  if (resultados.length === 0){
    return res.status(404).send(`No se encontraron cursos de ${tema}`);
  }
  res.send(JSON.stringify(resultados));
})
```
Podemos combinar más de un parámetro

```javascript
app.get('/api/cursos/programacion/:lenguaje/:nivel', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);
  if (resultados.length === 0){
    return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
  }
  res.send(JSON.stringify(resultados));
})
```
### 5.4. Parámetros query

Los parámetros query o querystring están disponibles en la colección `req.query`

```javascript
  const ordenar = req.query.ordenar;
```
Ejemplo:

```javascript
app.get('/api/cursos/programacion/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);
  if (resultados.length === 0){
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
  }
  
  if (req.query.ordenar === 'vistas'){
    return res.send(JSON.stringify(resultados.sort((a,b) => b.vistas - a.vistas)));
  }
  
  res.send(JSON.stringify(resultados));
})
```
## 5.5. Routers en express

Nos evitan tener que definir la ruta base una y otra vez

Definimos los routers de esta manera:

```javascript
const routerProgramacion = express.Router();
app.use('/api/cursos/programacion', routerProgramacion);
```

Y luego usamos: 

```javascript
routerProgramacion.get('/', (req, res) => {
  res.send(JSON.stringify(infoCursos.programacion));
})

routerProgramacion.get('/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);
  if (resultados.length === 0){
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
  }
  
  if (req.query.ordenar === 'vistas'){
    return res.send(JSON.stringify(resultados.sort((a,b) => b.vistas - a.vistas)));
  }
  
  res.send(JSON.stringify(resultados));
})

```

Ejemplo completo: 

```javascript
const express = require('express');
const { infoCrsos, infoCursos } = require('./cursos');

const PORT = process.env.port || 3000;

const app = express();

// Routers

const routerProgramacion = express.Router();
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = express.Router();
app.use('/api/cursos/matematicas', routerMatematicas);


// Routing

app.get('/', (req, res) => {
  res.send('<h1>Servidor Express Home</h1>')
});

app.get('/api/cursos', (req, res) => {
  res.send(JSON.stringify(infoCursos));
})

routerProgramacion.get('/', (req, res) => {
  res.send(JSON.stringify(infoCursos.programacion));
})

routerProgramacion.get('/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);
  if (resultados.length === 0){
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
  }
  
  if (req.query.ordenar === 'vistas'){
    return res.send(JSON.stringify(resultados.sort((a,b) => b.vistas - a.vistas)));
  }
  
  res.send(JSON.stringify(resultados));
})

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);
  if (resultados.length === 0){
    return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
  }
  res.send(JSON.stringify(resultados));
})

routerMatematicas.get('/', (req, res) => {
  res.send(JSON.stringify(infoCursos.matematicas));
})

routerMatematicas.get('/:tema', (req, res) => {
  const tema = req.params.tema;
  const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema);
  if (resultados.length === 0){
    return res.status(404).send(`No se encontraron cursos de ${tema}`);
  }
  res.send(JSON.stringify(resultados));
})

app.listen(PORT, () =>{
  console.log(`Escuchando en http://localhost:${PORT}`);
})
```
### 5.6. Routers en distintos archivos

`./app.js`
```javascript
const express = require('express');
const { infoCursos } = require('./datos/cursos.js');

const PORT = process.env.port || 3000;

const app = express();

// Routers
const routerProgramacion = require('./routers/programacion.js');
const routerMatematicas = require('./routers/matematicas.js');

app.use('/api/cursos/programacion', routerProgramacion);
app.use('/api/cursos/matematicas', routerMatematicas);


// Routing

app.get('/', (req, res) => {
  res.send('<h1>Servidor Express Home</h1>')
});

app.get('/api/cursos', (req, res) => {
  res.send(JSON.stringify(infoCursos));
})


app.listen(PORT, () =>{
  console.log(`Escuchando en http://localhost:${PORT}`);
})
```

`./routers/matematicas.js`
```javascript
const express = require('express');

const {matematicas} = require('../datos/cursos.js').infoCursos;

const routerMatematicas = express.Router();

routerMatematicas.get('/', (req, res) => {
    res.send(JSON.stringify(matematicas));
});
  
routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema;
    const resultados = matematicas.filter(curso => curso.tema === tema);
    if (resultados.length === 0){
      return res.status(404).send(`No se encontraron cursos de ${tema}`);
    }
    res.send(JSON.stringify(resultados));
});

module.exports = routerMatematicas;
```

`./routers/programacion.js`
```javascript
const express = require('express');

const {programacion} = require('../datos/cursos.js').infoCursos;

const routerProgramacion = express.Router();

routerProgramacion.get('/', (req, res) => {
    res.send(JSON.stringify(programacion));
});
  
routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje);
    if (resultados.length === 0){
      return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
    }
    
    if (req.query.ordenar === 'vistas'){
      return res.send(JSON.stringify(resultados.sort((a,b) => b.vistas - a.vistas)));
    }
    
    res.send(JSON.stringify(resultados));
});
  
routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);
    if (resultados.length === 0){
      return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
    }
    res.send(JSON.stringify(resultados));
});

module.exports = routerProgramacion;
```
## 6. Manejar variables de entorno

Antes que nada: agregar `.env` al archivo `.gitignore` para que no terminemos versionando información sensible.

`.gitignore`

```
# dependencies
/node_modules

# misc
.DS_Store
.env

```

Luego creamos nuestro archivo `.env` (podemos hacerlo a partir de un `.env.default` que sirva como plantilla)

`.env`

```
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mypassword
DB_NAME=desarrolloactivo_db
```

Tenemos que instalar `dotenv` como dependencia: 

```bash
npm i dotenv
```

E incluir la siguiente linea en el código fuente

```javascript
require('dotenv').config()
```
Las variables de entorno estarán disponibles en `process.env`

```javascript
    console.log (process.env.DB_PASSWORD)
```

## 7. Crear servidor https

Ver [Cómo crear un servidor https con Node.js y Express](https://www.jacobsoft.com.mx/es_mx/como-crear-un-servidor-https-con-node-js-y-express/)

Instalar las dependencias


```bash
npm i express
```


```bash
npm i fs
npm i https
```

Crear los archivos de certificado autofirmado: `certificado.crt` y `certificado.key` y los copiamos en la carpeta del proyecto. Esto se puede hacer usando **OpenSSL**.

```javascript
const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();

const PUERTO = 443;

https.createServer({
   cert: fs.readFileSync('certificado.crt'),
   key: fs.readFileSync('certificado.key')
 },app).listen(PUERTO, function(){
	console.log('Servidor https correindo en el puerto 443');
});

app.get('/', function(req, res){
	res.send('Hola, estas en la pagina inicial');
	console.log('Se recibio una petición get a través de https');
});

```
