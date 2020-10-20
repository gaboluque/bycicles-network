const Bicycle = require('../../models/bicycleModel');


exports.listBicycles = function (req, res) {
  res.status(200).json({
    bicycles: Bicycle.allBicycles,
  });
}

exports.createBicycle = function ({ body }, res) {
  const { id, model, color, lat, lng } = body;
  const newBicycle = new Bicycle(id, color, model, [lat, lng]);
  Bicycle.add(newBicycle);
  res.status(201).json({ bicycke: newBicycle });
}


exports.deleteBicycle = function ({ params }, res) {
  const { id } = params;
  Bicycle.removeById(id);
  res.status(204).send();
}
