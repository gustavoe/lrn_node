# Express


<!-- vim-markdown-toc GFM -->

* [1. Creando un servidor con `http`](#1-creando-un-servidor-con-http)
* [2. URLs](#2-urls)

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
```javascript
```
```javascript
```
