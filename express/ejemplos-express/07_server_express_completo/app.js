const express = require('express');
const { infoCursos } = require('./datos/cursos.js');

const PORT = process.env.port || 3000;

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

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
