const express = require('express');
const { infoCrsos, infoCursos } = require('./datos/cursos.js');

const PORT = process.env.port || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Servidor Express Home</h1>')
});

app.listen(PORT, () =>{
  console.log(`Escuchando en http://localhost:${PORT}`);
})
