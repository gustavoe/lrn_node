# Enviar mail usando sendinblue

## Crear cuenta gratuita en sendinblue

Crear una cuenta en [sendinblue](https://es.sendinblue.com/) siguiendo los pasos

## Crear e inicializar el proyecto

```bash
mkdir mail_app
cd mail_app
npm init -y
```

## Instalar los paquetes necesariosn en el proyecto

```bash
npm i sib-api-v3-sdk dotenv
```

## Inicializamos la aplicación

Agregamos el archivo `index.js`

## Crear la función que envía mails

Crear la función que envía los mails usando la api key provista por sendinblue

En el archivo `index.js`

```javascript
const Sib = require("sib-api-v3-sdk");
require("dotenv").config();

const client = Sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();

const sender = {
    email: "gustavo.echeverria@live.com",
    name: "Gustavo Echeverria",
};

const receivers = [
    {
        email: "gustavo.echeverria@gmail.com",
        name: "Gustavo Echeverria",
    },
];

tranEmailApi
    .sendTransacEmail({
        sender,
        to: receivers,
        subject: "Test email usando SIB",
        textContent: `Este es un mail de prueba con el mensaje: {{params.mensaje}}`,
        params: {
            mensaje: "muy importante para vos",
        },
    })
    .then(console.log)
    .catch(console.log);
```
