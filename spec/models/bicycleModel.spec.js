let Bicycle = require('../../src/models/bicycleModel');


const testBicycle = new Bicycle(1, 'Red', 'Mountain', [4.712825, -74.048137]);

describe('Bicycle', () => {


  beforeEach(() => {
    Bicycle.allBicycles = [];
  })

  describe('Bicycle.allBicycles', () => {
    it('should start empty', () => {
      expect(Bicycle.allBicycles.length).toBe(0);
    })
  })

  describe('Bicycle.add', () => {
    it('should add one bicycle', () => {
      expect(Bicycle.allBicycles.length).toBe(0);

      Bicycle.add(testBicycle);

      expect(Bicycle.allBicycles.length).toBe(1);
      expect(Bicycle.allBicycles[0]).toBe(testBicycle);
    })
  })

  describe('Bicycle.findById', () => {
    it('should find one bicycle given correct id', () => {
      expect(Bicycle.allBicycles.length).toBe(0);
      Bicycle.add(testBicycle);

      const foundBicycle = Bicycle.findById(1);
      expect(foundBicycle.id).toBe(1);
      expect(foundBicycle.model).toBe(testBicycle.model);
      expect(foundBicycle.color).toBe(testBicycle.color);
      expect(foundBicycle.location).toBe(testBicycle.location);
    })
  })
})

