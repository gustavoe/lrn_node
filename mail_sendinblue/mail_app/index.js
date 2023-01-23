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
