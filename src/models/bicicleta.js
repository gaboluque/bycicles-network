class Bicicleta {
  constructor(id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
  }


  toString() {
    return 'id: ' + this.id + ' | color: ' + this.color;
  }


  static add(bici) {
    Bicicleta.allBicis.push(bici);
  }
}


Bicicleta.allBicis = [];

const bici1 = new Bicicleta(1, 'rojo', 'urbana', [4.710990, -74.072091]);
const bici2 = new Bicicleta(1, 'rojo', 'urbana', [4.710991, -74.072085]);

Bicicleta.add(bici1);
Bicicleta.add(bici2);

module.exports = Bicicleta;
