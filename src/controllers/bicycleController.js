const Bicycle = require('../models/Bicycle');

exports.listBicycles = (req, res) => {
  res.render('bicycles/index', { bicycles: Bicycle.allBicycles });
};

exports.newBicycle = (req, res) => {
  res.render('bicycles/new');
};

exports.createBicycle = ({ body }, res) => {
  const { code, model, color, lat, lng } = body;
  const newBicycle = new Bicycle(code, color, model, [lat, lng]);
  Bicycle.add(newBicycle);
  res.redirect('/bicycles');
};

exports.deleteBicycle = ({ params }, res) => {
  const { code } = params;
  Bicycle.removeByCode(code);
  res.redirect('/bicycles');
};

exports.editBicycle = ({ params }, res) => {
  const bicycle = Bicycle.findById(params.id);
  res.render('bicycles/edit', { bicycle });
};

exports.updateBicycle = ({ params, body }, res) => {
  const { id } = params;
  Bicycle.findById(params.id);
  const { model, color, lat, lng } = body;
  const newBicycle = new Bicycle(undefined, color, model, [lat, lng]);
  Bicycle.updateById(id, newBicycle);
  res.redirect('/bicycles');
};
