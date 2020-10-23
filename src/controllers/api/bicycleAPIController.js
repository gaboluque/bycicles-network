const Bicycle = require('../../models/Bicycle');

exports.listBicycles = (req, res) => {
  Bicycle.allBicycles((_, bicycles) => {
    res.status(200).json({
      bicycles,
    });
  });
};

exports.createBicycle = ({ body }, res) => {
  const { code, model, color, lat, lng } = body;
  const newBicycle = new Bicycle({ code, color, model, location: [lat, lng] });
  Bicycle.add(newBicycle, (_, bicycle) => {
    res.status(201).json({ bicycle });
  });
};

exports.deleteBicycle = ({ params }, res) => {
  const { code } = params;
  Bicycle.deleteByCode(code);
  res.status(204).send();
};
