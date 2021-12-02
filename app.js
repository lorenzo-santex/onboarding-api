require('dotenv').config();

const express   = require('express');
const bodyParser = require('body-parser');
const Cuenta = require('./models').Cuenta;
const CanalSecundario = require('./models').CanalSecundario;
const Referente = require('./models').Referente;
const Link = require('./models').Link;
const app       = express();
const port      = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/cuentas', async (req, res) => {
    try {
        const cuentas = await Cuenta.findAll();
        res.status(200).json(cuentas);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.post('/cuentas', async (req, res) => { 
    console.log(req.body);
    const cuenta = await Cuenta.create({ 
        nombre: req.body.nombre, 
        pm: req.body.pm, 
        canal_principal: req.body.canal_principal, 
        bienvenida:req.body.bienvenida });
    console.log(cuenta);

    const canalesACrear = req.body.canales_secundarios.map( function (canal_secundario) {
        return { cuenta_id: cuenta.id, canal: canal_secundario };
    });

    console.log(canalesACrear);
    const canales_secundarios = await CanalSecundario.bulkCreate(canalesACrear); 
    console.log ( canales_secundarios);

    const referentesACrear = req.body.referentes.map( function (referente) {
        return { cuenta_id: cuenta.id, referente: referente };
    });
    console.log(referentesACrear);
    const referentes = await Referente.bulkCreate(referentesACrear); 

    res.status(200).send({status: "OK"});
});

app.listen(port, () => {
    console.log(`Api de Onboarding, corre en el puerto ${port}`);
});