let Bicycle = require('../../src/models/bicycleModel');
let request = require('request');
let server = require('../../bin/www');

const testBicycle = new Bicycle(1, 'Red', 'Mountain', [4.712825, -74.048137]);

describe('Bicycle API', () => {

  beforeEach(() => {
    Bicycle.allBicycles = [];
  })

  describe('Index Bicycles', () => {
    it('should fetch all bicycles', (done) => {
      expect(Bicycle.allBicycles.length).toBe(0);
      Bicycle.add(testBicycle);

      request.get('http://localhost:3000/api/bicycles', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        console.log(body["bicycles"]);
        done();
      })
    })
  })
})
