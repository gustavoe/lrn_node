# Ssqlite Básico

Vamos a demostrar lo básico para usar la base de datos Sqlite con Node.js

## Crear e inicializar el proyecto

```bash
mkdir sqlite_app
cd sqlite_app
npm init -y
```

```bash
npm i sqlite3
```

## Inicializamos la aplicación

Agregamos el archivo `app.js`

## Agregamos sqlite3 y conectamos a la base de datos

En el archivo `app.js`

```javascript
const sqlite3 = require("sqlite3").verbose();

// Conectar a la base de datos
const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});
```

## Crear una tabla

```javascript
sql = `CREATE TABLE users (id INTEGER PRIMARY KEY, first_name, last_name, username, password, email)`;
db.run(sql);
```

## Eliminar tabla

```javascript
sql = `DROP TABLE users`;
db.run(sql);
```

## Insertar una fila

```javascript
sql = `INSERT INTO users(first_name, last_name, username, password, email) values(?,?,?,?,?)`;
db.run(sql, ["juan", "perez", "jperez", "jperez@mail.com"], (err) => {
    if (err) return console.error(err.message);
});
```

## Leer datos

```javascript
sql = `SELECT * FROM users`;
db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
        console.log(row);
    });
});
```

## Actualizar datos

```javascript
sql = `UPDATE users SET first_name = ? WHERE id = ?`;
db.run(sql, ["Pepe", 2], (err) => {
    if (err) return console.error(err.message);
});
```

## Eliminar datos

```javascript
sql = `DELETE FROM users WHERE id = ?`;
db.run(sql, [2], (err) => {
    if (err) return console.error(err.message);
});
```
