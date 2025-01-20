const debug = require('debug')('server:controllers:indexController');

const IndexController = {
    index:(req, res, next)=>{
        debug("index()");
        res.render("index", { title: 'Express' });
    }
}

module.exports = IndexController;