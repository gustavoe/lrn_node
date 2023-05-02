function mostrarTema(tema){
  console.log(`Estoy aprendiendo ${tema}`);
}


console.log('Antes de setImmediate()');

setImmediate(mostrarTema, 'Node.js');

console.log('Después de setImmediate()');
