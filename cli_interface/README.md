# Crear interfaces CLI con node.js  

Vamos a demostrar como crear una aplicaciónd de consola con Node.js usando la librería [inquirer.js](https://www.npmjs.com/package/inquirer)

## Crear e inicializar el proyecto

```bash
mkdir cli_app
cd cli_app
npm init -y
```

```bash
npm i inquirer
```

**NOTA** A partir de la versión 9 de inquirer es un módulo esm nativo, esto quiere decir que no se puede usar la sintaxis `require('inquirer')`. 
Hay dos formas de solucionar esto:

* una de ellas es agregar lo siguiente al archivo `package.json`

```json
{
  // ...
  "type": "module",
  // ...
}
```

* la otra alternativa es instalar la versión 8 de inquirer:  

```bash
npm i inquirer@^8.0.0
```

## Inicializamos la aplicación

Agregamos el archivo `app.js`

