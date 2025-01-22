const debug = require('debug')('server:config:handlebars');

module.exports = function(app) {
  const hbs = require('hbs');

  app.set("view engine", "hbs");

  require('handlebars-helpers')({
    handlebars: hbs
  });
}