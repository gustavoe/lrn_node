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
