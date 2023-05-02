function mostrarTema(tema){
  console.log(`Estoy aprendiendo ${tema}`);
}

function sumar(a,b){
  console.log('Suma: ',a + b);
}

setTimeout(mostrarTema, 5000, 'Node.js');
setTimeout(sumar, 7000, 7, 5);
