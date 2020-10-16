const Bicycle = require('../models/bicycleModel');

exports.listBicycles = function (req, res) {
  res.render('bicycles/index', { bicycles: Bicycle.allBicycles })
}

exports.newBicycle = function (req, res) {
  res.render('bicycles/new')
}

exports.createBicycle = function ({ body }, res) {
  const { id, model, color, lat, lng } = body;
  const newBicycle = new Bicycle(id, color, model, [lat, lng]);
  Bicycle.add(newBicycle);
  res.redirect('/bicycles');
}

exports.deleteBicycle = function ({ params }, res) {
  const { id } = params;
  Bicycle.removeById(id);
  res.redirect('/bicycles');
}
