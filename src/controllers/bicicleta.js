const Bicicleta = require ('../models/bicicleta');

exports.bicicleta_list = function (req, res) {
  res.render('bicicletas/index', { bicicletas: Bicicleta.allBicis })
}
