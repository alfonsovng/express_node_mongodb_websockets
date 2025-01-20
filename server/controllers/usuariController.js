const debug = require('debug')('server:controllers:usuariController');
const Usuari = require('../models/usuariModel');

const UsuariController = {
    list:async (req, res, next)=>{
        const usuaris = await Usuari.find({});
        // res.send(usuaris);
        res.render("usuari/list", { usuaris: usuaris });
    }
}

module.exports = UsuariController;