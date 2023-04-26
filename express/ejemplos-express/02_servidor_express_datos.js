const express = require('express');
const { infoCrsos, infoCursos } = require('./datos/cursos.js');

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
