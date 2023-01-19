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
