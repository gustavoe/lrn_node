# Sequelize Básico

Vamos a crear una API usando Node.js + Express + Sqlite3 + Sequelize

## Crear e inicializar el proyecto

```bash
mkdir sequelize_api
cd sequelize_api
npm init -y
```

```bash
npm i express
npm i sqlite3
npm i sequelize
```

```bash
npm install --save-dev nodemon
```

En el archivo `package.json` agregamos un elemento `start` al elemento `scripts`:

```json
    "scripts": {
        "start": "nodemon index",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
```

## Crear un servidor básico con Express

Agregar el archivo `index.js` en la carpeta raiz con el código básico para inicializar un server Express

```javascript
const express = require("express");

const app = express();

app.listen(3000, () => {
    console.log("Aplicación corriendo en http://localhost:3000");
});
```

Ya podemos correr nuestro servidor y verificar que está funcionando:

```bash
npm start
```

## Agregar acceso a datos con Sequelize

Vamos a crear ahora otro archivo en la carpeta raiz que podemos llamar `database.js`

Aquí vamos a implementar el acceso a los datos usando `Sequelize`. Podemos profundizar más revisando la documentación de [Sequelize](https://sequelize.org/)

database.js

```javascript
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test-db", "user", "pass", {
    dialect: "sqlite",
    host: "./db.sqlite",
});

module.exports = sequelize;
```

En este caso estamos usando una base de datos con persistencia: apropiada para desarrollo y para producción eventualmente, también podríamos usar una base de datos en memoria reemplazando el valor de la clave `host`

database.js

```javascript
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test-db", "user", "pass", {
    dialect: "sqlite",
    host: ":memory:",
});

module.exports = sequelize;
```

Por ahora usaremos la primera variante.

Vamos a llamar al método `sync()` para crear la base de datos. Éste método es asincrónico por lo tanto devuelve una promesa.
Antes tenemos que incluir el módulo `database.js` en la aplicación.
Nuestro archivo `index.js` quedará entonces así:

```javascript
const express = require("express");
const sequelize = require("./database");

sequelize.sync().then(() => console.log("Base de Datos: Lista"));

const app = express();

app.listen(3000, () => {
    console.log("Aplicación corriendo en http://localhost:3000");
});
```

En este punto, si todo anduvo bien, tendremos creado el archivo de la base de datos `db.sqlite` en la carpeta raíz de la aplicación.

## Crear el modelo: Cliente

Los modelos se pueden definir de dos maneras en Sequelize:

-   Llamando `sequelize.define(modelName, attributes, options)`
-   Extendiendo `Model` y llamando `init(attributes, options)`

Vamos a realizar este ejemplo sencillo utilizando la entidad `Cliente` con atributos: `nombre`, `apellido`, `email`

Agregamos un archivo `Cliente.js` con el siguiente contenido:

```javascript
const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database");

class Cliente extends Model {}

Cliente.init(
    {
        nombre: { type: DataTypes.STRING },
        apellido: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
    },
    {
        sequelize,
        modelName: "cliente",
    }
);

module.exports = Cliente;
```

Alternativamente podemos usar la otra sintaxis para definir el modelo:

```javascript
const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database");

const Cliente = sequelize.define(
    "Cliente",
    {
        nombre: { type: DataTypes.STRING },
        apellido: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
    },
    {
        sequelize,
        modelName: "cliente",
        timestamps: false,
    }
);

module.exports = Cliente;
```

Agregamos un endpoint para post en la aplicación y el archivo `index.js` queda:

```javascript
const express = require("express");
const sequelize = require("./database");
const Cliente = require("./Cliente");

sequelize.sync().then(() => console.log("Base de Datos: Lista"));

const app = express();

app.use(express.json());

app.post("/clientes", (req, res) => {
    Cliente.create(req.body).then(() => res.send("Cliente creado."));
});

app.listen(3000, () => {
    console.log("Aplicación corriendo en http://localhost:3000");
});
```

La línea:

```
app.use(express.json());
```

agrega el middleware necesario para tratar el contenido del body cuando viene json

Ya podemos probar nuestra API con cUrl, Postman u otro cliente

## Testear con cUrl

```bash
curl -X POST http://localhost:3000/clientes  -H 'Content-Type: application/json'  -d '{"nombre":"Juan","apellido":"Perez","email":"jperez@mail.com"}'
```

Podemos verificar con algún cliente de base de datos que nuestra tabla Clientes tenga la fila que acabamos de insertar

## Algunas observaciones adicionales.

Como se verá Sequelize incluye, por defecto, dos columnas para timestamp: `createdAt`, `updatedAt`. En general esta información resulta de utilidad, pero puede ser que hagamos una implementación propia o que simplemente no la queremos.

Para eso necesitamos agregar la clave `timestamps: false` en el parámetro `options` cuando inicializamos el modelo.

```javascript
const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database");

class Cliente extends Model {}

Cliente.init(
    {
        nombre: { type: DataTypes.STRING },
        apellido: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
    },
    {
        sequelize,
        modelName: "cliente",
        timestamps: false,
    }
);

module.exports = Cliente;
```

Pero esto no eliminará las columnas a menos que agreguemos la clave ya que la base de datos existe. Para lograr esto necesitamos agregar la clave `force:true` como parámetro al método `sync()`

```javascript
const express = require("express");
const sequelize = require("./database");
const Cliente = require("./Cliente");

sequelize.sync({ force: true }).then(() => console.log("Base de Datos: Lista"));

const app = express();

app.use(express.json());

app.post("/clientes", (req, res) => {
    Cliente.create(req.body).then(() => res.send("Cliente creado."));
});

app.listen(3000, () => {
    console.log("Aplicación corriendo en http://localhost:3000");
});
```

Usemos `async` `await`

```javascript
const express = require("express");
const sequelize = require("./database");
const Cliente = require("./Cliente");

// sequelize.sync({ force: true }).then(() => console.log("Base de Datos: Lista"));
sequelize.sync().then(() => console.log("Base de Datos: Lista"));

const app = express();

app.use(express.json());

app.post("/clientes", async (req, res) => {
    await Cliente.create(req.body);
    res.send("Cliente creado.");
});

app.listen(3000, () => {
    console.log("Aplicación corriendo en http://localhost:3000");
});
```

## Implementamos el `get`

```javascript
const express = require("express");
const sequelize = require("./database");
const Cliente = require("./Cliente");

// sequelize.sync({ force: true }).then(() => console.log("Base de Datos: Lista"));
sequelize.sync().then(() => console.log("Base de Datos: Lista"));

const app = express();

app.use(express.json());

app.get("/clientes", async (req, res) => {
    const clientes = await Cliente.findAll();
    res.send(clientes);
});

app.post("/clientes", async (req, res) => {
    await Cliente.create(req.body);
    res.send("Cliente creado.");
});

app.listen(3000, () => {
    console.log("Aplicación corriendo en http://localhost:3000");
});
```

## Testear con cUrl

```bash
curl -X GET http://localhost:3000/clientes  -H 'Content-Type: application/json'
```

## Para recuperar usando un parámetro

En este caso usamos el id para recuperar un cliente

```javascript
const express = require("express");
const sequelize = require("./database");
const Cliente = require("./Cliente");

// sequelize.sync({ force: true }).then(() => console.log("Base de Datos: Lista"));
sequelize.sync().then(() => console.log("Base de Datos: Lista"));

const app = express();

app.use(express.json());

app.get("/clientes", async (req, res) => {
    const clientes = await Cliente.findAll();
    res.send(clientes);
});

app.get("/clientes/:id", async (req, res) => {
    const requestedId = req.params.id;
    const cliente = await Cliente.findOne({ where: { id: requestedId } });
    res.send(cliente);
});

app.post("/clientes", async (req, res) => {
    await Cliente.create(req.body);
    res.send("Cliente creado.");
});

app.listen(3000, () => {
    console.log("Aplicación corriendo en http://localhost:3000");
});
```

## Testear con cUrl

```bash
curl -X GET http://localhost:3000/clientes/3  -H 'Content-Type: application/json'
```

## Actualizar un cliente

```javascript
const express = require("express");
const sequelize = require("./database");
const Cliente = require("./Cliente");

// sequelize.sync({ force: true }).then(() => console.log("Base de Datos: Lista"));
sequelize.sync().then(() => console.log("Base de Datos: Lista"));

const app = express();

app.use(express.json());

app.get("/clientes", async (req, res) => {
    const clientes = await Cliente.findAll();
    res.send(clientes);
});

app.get("/clientes/:id", async (req, res) => {
    const requestedId = req.params.id;
    const cliente = await Cliente.findOne({ where: { id: requestedId } });
    res.send(cliente);
});

app.post("/clientes", async (req, res) => {
    await Cliente.create(req.body);
    res.send("Cliente creado.");
});

app.put("/clientes/:id", async (req, res) => {
    const requestedId = req.params.id;
    const cliente = await Cliente.findOne({ where: { id: requestedId } });
    cliente.nombre = req.body.nombre;
    cliente.apellido = req.body.apellido;
    await cliente.save();
    res.send("Cliente actualizado");
});

app.listen(3000, () => {
    console.log("Aplicación corriendo en http://localhost:3000");
});
```

## Testear con cUrl

```bash
curl -X PUT http://localhost:3000/clientes/3  -H 'Content-Type: application/json'  -d '{"nombre":"Luis","apellido":"Tangalangoose","email":"a@mail.com"}'
curl -X GET http://localhost:3000/clientes/3  -H 'Content-Type: application/json'
```

## Eliminar un cliente

```javascript
const express = require("express");
const sequelize = require("./database");
const Cliente = require("./Cliente");

// sequelize.sync({ force: true }).then(() => console.log("Base de Datos: Lista"));
sequelize.sync().then(() => console.log("Base de Datos: Lista"));

const app = express();

app.use(express.json());

app.get("/clientes", async (req, res) => {
    const clientes = await Cliente.findAll();
    res.send(clientes);
});

app.get("/clientes/:id", async (req, res) => {
    const requestedId = req.params.id;
    const cliente = await Cliente.findOne({ where: { id: requestedId } });
    res.send(cliente);
});

app.post("/clientes", async (req, res) => {
    await Cliente.create(req.body);
    res.send("Cliente creado.");
});

app.put("/clientes/:id", async (req, res) => {
    const requestedId = req.params.id;
    const cliente = await Cliente.findOne({ where: { id: requestedId } });
    cliente.nombre = req.body.nombre;
    cliente.apellido = req.body.apellido;
    await cliente.save();
    res.send("Cliente actualizado");
});

app.delete("/clientes/:id", async (req, res) => {
    const requestedId = req.params.id;
    await Cliente.destroy({ where: { id: requestedId } });
    res.send("Cliente eliminado");
});

app.listen(3000, () => {
    console.log("Aplicación corriendo en http://localhost:3000");
});
```

## Testear con cUrl

```bash
curl -X DELETE http://localhost:3000/clientes/3  -H 'Content-Type: application/json'
curl -X GET http://localhost:3000/clientes  -H 'Content-Type: application/json'
```
