const Bicycle = require('../../src/models/Bicycle');
const { dbConnect, dbClose } = require('../utils/dbUtils');

describe('Bicycle', () => {
  beforeAll((done) => {
    dbConnect();
    done();
  });

  beforeEach((done) => {
    Bicycle.deleteMany({}, done);
  });

  afterAll((done) => {
    dbClose();
    done();
  });

  describe('Bicycle.createInstance', () => {
    it('should create instance', () => {
      const bicycle = Bicycle.createInstance(1, 'green', 'urban', [
        -34.5,
        -54.1,
      ]);
      expect(bicycle.code).toBe(1);
      expect(bicycle.model).toBe('urban');
      expect(bicycle.color).toBe('green');
      expect(bicycle.location).toEqual([-34.5, -54.1]);
    });
  });

  describe('Bicycle.allBicycles', () => {
    it('should start empty', (done) => {
      Bicycle.allBicycles((_err, bicycles) => {
        expect(bicycles.length).toBe(0);
        done();
      });
    });
  });

  describe('Bicycle.add', () => {
    it('should add one bicycle', (done) => {
      const bicycle = new Bicycle({ code: 1, color: 'green', model: 'urban' });
      Bicycle.add(bicycle, () => {
        Bicycle.allBicycles((_err, bicycles) => {
          expect(bicycles.length).toBe(1);
          done();
        });
      });
    });
  });

  describe('Bicycle.findByCode', () => {
    it('should find one bicycle given correct code', (done) => {
      Bicycle.allBicycles((_err, bicycles) => {
        expect(bicycles.length).toBe(0);

        const bicycle = new Bicycle({
          code: 1,
          color: 'green',
          model: 'urban',
        });
        Bicycle.add(bicycle, () => {
          Bicycle.findByCode(1, (_, newBicycle) => {
            expect(newBicycle.code).toBe(bicycle.code);
            expect(newBicycle.color).toBe(bicycle.color);
            expect(newBicycle.model).toBe(bicycle.model);
            done();
          });
        });
      });
    });
  });

  describe('Bicycle.deleteByCode', () => {
    it('should delete one bicycle given correct code', (done) => {
      Bicycle.allBicycles((_err, bicycles) => {
        expect(bicycles.length).toBe(0);

        const bicycle = new Bicycle({
          code: 1,
          color: 'green',
          model: 'urban',
        });
        Bicycle.add(bicycle, () => {
          Bicycle.deleteByCode(1, (_, { deletedCount }) => {
            expect(deletedCount).toBe(1);
            done();
          });
        });
      });
    });
  });

  /* describe('Bicycle.allBicycles', () => {
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
  }) */
});
