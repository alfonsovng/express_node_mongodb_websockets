const debug = require('debug')('server:controllers:usuarisController');
const Usuari = require('../models/usuariModel');

const UsuarisController = {
    list:async (req, res, next)=>{
        const usuaris = await Usuari.find({});
        // res.send(usuaris);
        res.render("usuaris/list", { usuaris: usuaris });
    }
}

module.exports = UsuarisController;