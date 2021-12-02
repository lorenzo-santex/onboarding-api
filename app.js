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


// Cuentas
app.get('/cuentas', async (req, res) => {
    try {
        const cuentas = await Cuenta.findAll();
        res.status(200).json(cuentas);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get('/cuentas/:id', async (req, res) => {
    try {
        const cuenta = await Cuenta.findOne({
            attributes: ['id', 'nombre', 'pm', 'canal_principal', 'bienvenida'],
            where: {
                id: req.params.id
            }
        });
        const canales_secundarios = await CanalSecundario.findAll({
            attributes: ['canal'],
            where: {
                cuenta_id: cuenta.id
            }
        });
        console.log(canales_secundarios);

        const referentes = await Referente.findAll({
            attributes: ['referente'],
            where: {
                cuenta_id: cuenta.id
            }
        });
        console.log(referentes);

        let response = {
            cuenta: cuenta,
            canales_secundarios: canales_secundarios.map(function(cs){
                return cs.canal;
            }),
            referentes: referentes.map(function(ref){
                return ref.referente;
            }),
        };

        res.status(200).json(response);
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

// Referentes
app.get('/referentes', async (req, res) => {
    try {
        const referentes = await Referente.findAll();
        res.status(200).json(referentes);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Links
app.get('/links', async (req, res) => {
    try {
        const links = await Link.findAll();
        res.status(200).json(links);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Canal Secundario
app.get('/canales-secundarios', async (req, res) => {
    try {
        const canalesSecundario = await CanalSecundario.findAll();
        res.status(200).json(canalesSecundario);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.listen(port, () => {
    console.log(`Api de Onboarding, corre en el puerto ${port}`);
});