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

exports.editBicycle = function ({ params }, res) {
  const bicycle = Bicycle.findById(params.id);
  console.log(bicycle);
  res.render('bicycles/edit', { bicycle })
}

exports.updateBicycle = function ({ params, body }, res) {
  const { id } = params;
  const bicycle = Bicycle.findById(params.id);
  const { model, color, lat, lng } = body;
  const newBicycle = new Bicycle(undefined, color, model, [lat, lng]);
  Bicycle.updateById(id, newBicycle);
  res.redirect('/bicycles');
}
