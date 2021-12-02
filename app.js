require('dotenv').config();

const express   = require('express');
const bodyParser = require('body-parser');
const app       = express();
const port      = process.env.PORT;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/cuentas', (req, res) => { 
    console.log(req.body);
    res.status(200).send({status: "OK"});
});

app.listen(port, () => {
    console.log(`Api de Onboarding, corre en el puerto ${port}`);
});