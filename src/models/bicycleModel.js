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

  static removeById(bicycleId) {
    const foundIndex = [...Bicycle.allBicycles].findIndex(({id}) =>  id == `${bicycleId}`);
    console.log('index', foundIndex);
    Bicycle.allBicycles.splice(foundIndex, 1);
    console.log(Bicycle.allBicycles);
  }
}


Bicycle.allBicycles = [];

const bicycle1 = new Bicycle(1, 'Red', 'Mountain', [4.710990, -74.072091]);
const bicycle2 = new Bicycle(2, 'Blue', 'Urban', [4.710991, -74.072085]);

Bicycle.add(bicycle1);
Bicycle.add(bicycle2);

module.exports = Bicycle;
