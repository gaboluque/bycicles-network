const mongoose = require('mongoose');

const { Schema } = mongoose;

const bicycleSchema = new Schema({
  code: Number,
  color: String,
  model: String,
  location: {
    type: [Number],
    index: { type: '2dsphere', sparse: true },
  },
});

bicycleSchema.statics.createInstance = function (code, color, model, location) {
  return new this({ code, color, model, location });
};

bicycleSchema.methods.toString = function () {
  return `code: ${this.code} | color: ${this.color}`;
};

bicycleSchema.statics.allBicycles = function (cb) {
  return this.find({}, cb);
};

bicycleSchema.statics.add = function (bicycle, cb) {
  this.create(bicycle, cb);
};

bicycleSchema.statics.findByCode = function (code, cb) {
  return this.findOne({ code }, cb);
};

bicycleSchema.statics.deleteByCode = function (code, cb) {
  return this.deleteOne({ code }, cb);
};

module.exports = mongoose.model('Bicycle', bicycleSchema);

/* 

// No-database model

class Bicycle {
  constructor(id, color, model, location) {
    this.id = id;
    this.color = color;
    this.model = model;
    this.location = location;
  }

  toString() {
    return 'id: ' + this.id + ' | color: ' + this.color;
  }

  static add(bicycle) {
    Bicycle.allBicycles.push(bicycle);
  }

  static findById(bicycleId) {
    const found = [...Bicycle.allBicycles].find(
      ({ id }) => id == `${bicycleId}`
    );
    if (!found) {
      throw new Error('Bicycle not found!')
    }
    return found;
  }

  static findIndexById(bicycleId) {
    const foundIndex = [...Bicycle.allBicycles].findIndex(
      ({ id }) => id == `${bicycleId}`
    );
    if (foundIndex < 0) {
      throw new Error('Bicycle not found!')
    }
    return foundIndex;
  }

  static removeById(bicycleId) {
    const foundIndex = this.findIndexById(bicycleId);
    Bicycle.allBicycles.splice(foundIndex, 1);
  }

  static updateById(bicycleId, DTO) {
    let updateBicycle = this.findById(bicycleId);
    updateBicycle.model = DTO.model;
    updateBicycle.color = DTO.color;
    updateBicycle.location = DTO.location;
  }
}


Bicycle.allBicycles = [];

// const bicycle1 = new Bicycle(1, 'Red', 'Mountain', [4.712825, -74.048137]);
// const bicycle2 = new Bicycle(2, 'Blue', 'Urban', [4.710980, -74.072070]);
//
// Bicycle.add(bicycle1);
// Bicycle.add(bicycle2);

module.exports = Bicycle; */
