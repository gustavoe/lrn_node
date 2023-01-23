# Enviar mail usando sendinblue

## Crear cuenta gratuita en sendinblue

Crear una cuenta en [sendinblue](https://es.sendinblue.com/) siguiendo los pasos

## Crear e inicializar el proyecto

```bash
mkdir mail_app
cd mail_app
npm init -y
```

## Instalar el SDK en el proyecto

```bash
npi-v3-sdk --save
```

## Inicializamos la aplicación

Agregamos el archivo `app.js`

## Crear la función que envía mails

Crear la función que envía los mails usando la api key provista por sendinblue

En el archivo `app.js`

```javascript
var SibApiV3Sdk = require("sib-api-v3-sdk");
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
    "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";

new SibApiV3Sdk.TransactionalEmailsApi()
    .sendTransacEmail({
        subject: "Test de mail con Send In Blue",
        sender: {
            email: "gustavo.echeverria@live.com",
            name: "Gustavo Echeverria",
        },
        replyTo: {
            email: "gustavo.echeverria@live.com",
            name: "Gustavo Echeverria",
        },
        to: [
            {
                name: "Gustavo Echeverria",
                email: "gustavo.echeverria@live.com",
            },
        ],
        htmlContent:
            "<html><body><h1>Esta es una prueba {{params.bodyMessage}}</h1></body></html>",
        params: { bodyMessage: "de email automatizado con Send In Blue" },
    })
    .then(
        function (data) {
            console.log(data);
        },
        function (error) {
            console.error(error);
        }
    );
```
