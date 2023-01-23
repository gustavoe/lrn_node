const sqlite3 = require("sqlite3").verbose();
let sql;

// Conectar a la base de datos
const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

// Crear tabla
// sql = `CREATE TABLE users (id INTEGER PRIMARY KEY, first_name, last_name, username, password, email)`;
//db.run(sql);

// Eliminar tabla
// sql = `DROP TABLE users`;
// db.run(sql);

// Insertar una fila
// sql = `INSERT INTO users(first_name, last_name, username, password, email) values(?,?,?,?,?)`;
// db.run(sql, ["juan", "perez", "jperez", "jperez@mail.com"], (err) => {
//     if (err) return console.error(err.message);
// });

// Actualizar datos
sql = `UPDATE users SET first_name = ? WHERE id = ?`;
db.run(sql, ["Pepe", 2], (err) => {
    if (err) return console.error(err.message);
});

// Eliminar datos
sql = `DELETE FROM users WHERE id = ?`;
db.run(sql, [2], (err) => {
    if (err) return console.error(err.message);
});

// Leer datos
sql = `SELECT * FROM users`;
db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
        console.log(row);
    });
});
