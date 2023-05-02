function mostrarTema(tema){
  console.log(`Estoy aprendiendo ${tema}`);
}

const interval = setInterval(mostrarTema, 3000, 'Node.js');

clearInterval(interval);
