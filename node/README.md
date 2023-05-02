# Node.js

<!-- vim-markdown-toc GFM -->

* [1. Generalidades](#1-generalidades)
* [2. Módulos en Node.js](#2-módulos-en-nodejs)
    * [2.1. Exportar componentes](#21-exportar-componentes)
    * [2.2. Importar desde un módulo](#22-importar-desde-un-módulo)
* [3. Módulos built-in](#3-módulos-built-in)
    * [3.1. Módule console](#31-módule-console)
    * [3.2. Módulo process](#32-módulo-process)
    * [3.3. Módulo os](#33-módulo-os)
    * [3.4. Módulo timers](#34-módulo-timers)
    * [3.5. Módulo fs](#35-módulo-fs)

<!-- vim-markdown-toc -->

## 1. Generalidades

**Node.js** es un **entorno de ejecución** de JavaScript orientado a **eventos asíncronos**.

** Evento síncrono** evento que se ejecuta como parte del proceso principal de la aplicación

Node.js
- Open source
- Multiplataforma
- Basado en el motor V8 de Google

## 2. Módulos en Node.js

Ventajas
- Evitar repetición de código
- Reutilizar código
- Es más fácil encontrar y corregir bugs
- Es más fácil modificar el código
- Es más fácil agregar nueva funcionalidad

En Node.js usamos módulos llamados * CommonJS Modules * (en contraposición de los * ES Modules *)

### 2.1. Exportar componentes

Para exportar elementos de un módulo usamos `module.exports`. 

`module.exports` es un **objeto**

Podemos exportar la función saludar de la siguiente manera:

```javascript
function saludar(nombre){
  return `Hola ${nombre}`;
}

module.exports = saludar;
```
Como experimento puede resultar útil ver qué tiene `module.exports` antes y después de asignarle algo

```javascript
function saludar(nombre){
  return `Hola ${nombre}`;
}

console.log(module.exports);

module.exports = saludar;

console.log(module.exports);
```

Podemos exportar más de un elemento o función: 

```javascript
function saludar(nombre){
  return `Hola ${nombre}`;
}

function saludarHolaMundo(){
  return `¡Hola Mundo!`;
}

module.exports.saludar = saludar;
module.exports.saludarHolaMundo = saludarHolaMundo;
```
o, de esta forma:

```javascript
function saludar(nombre){
  return `Hola ${nombre}`;
}

function saludarHolaMundo(){
  return `¡Hola Mundo!`;
}

module.exports = {
  saludar: saludar,
  saludarHolaMundo: saludarHolaMundo
}
```
### 2.2. Importar desde un módulo

Para importar (o incluir) usamos `require()`

```javascript
const saludos = require('./saludos.js');
```
y usamos las funciones incluidas:

```javascript
const saludos = require('./saludos.js');

console.log(saludos.saludar('Pepe'));
console.log(saludos.saludarHolaMundo());
```
No necesariamente tenemos que importar todos los componentes del módulo. Usando desestructuración podemos importar algún o algunos componentes de forma selectiva. Por ejemplo si solo usáramos `saludarHolaMundo()`:

```javascript
const { saludarHolaMundo } = require('/saludos.js');

console.log(saludarHolaMundo());
```
Y podemos incluir más de un componente de esta misma forma:

```javascript
const { saludar, saludarHolaMundo } = require('/saludos.js');

console.log(saludar('Pepe'));
console.log(saludarHolaMundo());
```

## 3. Módulos built-in

### 3.1. Módule console

Algunos métodos útiles de éste módulo son:

* console.log()
* console.warn()
* console.error()
* console.assert()
* console.table()

```javascript
console.error(new Error('¡Ocurrió un error!'));
```

### 3.2. Módulo process

Podemos ver todo el objeto process con: 

```javascript
console.log(process);
```
Un poco más interesante es ver información del entorno con:

```javascript
console.log(process.env);
```

También en `process.argv` podemos acceder a los argumentos con los que se llamó al programa. Si llamamos al programa con: 

```bash
node app.js 6 7
```
Los elementos 2 y 3 del array `process.argv` corresponderan a los argumentos 6 y 7. Las posiciones se cuentan a partir de 2 porque las dos primeras son para node y el nombre del programa respectivamente

```javascript
console.log(process.argv[2]);  // 6
console.log(process.argv[3]);  // 7

// [node, app.js, 6, 7]
//   0      1     2  3 
```
Podemos conocer acerca del uso de la memoria mediante:

```javascript
console.log(process.memoryUsage());
```

### 3.3. Módulo os

Este módulo no está disponible de forma global por lo tanto hay que incluirlo con `require`


```javascript
const os = require('os');

console.log(os.type());
console.log(os.homedir());
console.log(os.userInfo());
```

### 3.4. Módulo timers

`setTimeout` nos permite ejecutar una función de forma diferida

Su sintaxis es: 

`setTimeout(funcion, retraso, argumentos)`

```javascript
function mostrarTema(tema){
  console.log(`Estoy aprendiendo ${tema}`);
}

function sumar(a,b){
  console.log('Suma: ',a + b);
}

setTimeout(mostrarTema, 5000, 'Node.js');
setTimeout(sumar, 7000, 7, 5);
```

`setImmediate` nos permite ejecutar una función de manera asíncrona con la máxima prioridad

```javascript
function mostrarTema(tema){
  console.log(`Estoy aprendiendo ${tema}`);
}


console.log('Antes de setImmediate()');

setImmediate(mostrarTema, 'Node.js');

console.log('Después de setImmediate()');
```

`setInterval()` nos permite ejecutar una función a intervalos específicos de tiempo: 

```javascript
function mostrarTema(tema){
  console.log(`Estoy aprendiendo ${tema}`);
}

setInterval(mostrarTema, 3000, 'Node.js');
```
Para cancelar un `setInterval()` podemos usar  `clearInterval()`. También hay un `clearTimeout()` que funciona de manera análoga.

```javascript
function mostrarTema(tema){
  console.log(`Estoy aprendiendo ${tema}`);
}

const interval = setInterval(mostrarTema, 3000, 'Node.js');

clearInterval(interval);
```

### 3.5. Módulo fs
