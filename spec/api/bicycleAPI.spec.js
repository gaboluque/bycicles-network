/* eslint-disable no-unused-vars */
const Bicycle = require('../../src/models/Bicycle');
const { testBicycle } = require('../utils/bicycleUtils');
const { appRequest } = require('../utils/commonUtils');
const { dbConnect, dbClose } = require('../utils/dbUtils');

const baseUrl = '/api/bicycles';

describe('Bicycle API', () => {
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

  describe('Index Bicycles', () => {
    it('should fetch all bicycles', (done) => {
      Bicycle.allBicycles((_err, bicycles) => {
        expect(bicycles.length).toBe(0);
      });
      Bicycle.create(testBicycle);

      appRequest.get(baseUrl).then((response) => {
        expect(response.statusCode).toBe(200);
        const data = response.body.bicycles;
        expect(data.length).toBe(1);
        const firstBicylcle = data[0];
        expect(firstBicylcle.id).toBe(testBicycle.id);
        expect(firstBicylcle.model).toBe(testBicycle.model);
        expect(firstBicylcle.color).toBe(testBicycle.color);
        expect(firstBicylcle.location).toEqual(testBicycle.location);
        done();
      });
    });
  });

  describe('createBicycle', () => {
    it('should create new bicycle', (done) => {
      const headers = { 'content-type': 'application/json' };
      const newBicycle = {
        code: 1,
        color: 'Red',
        model: 'Mountain',
        lat: 4.712825,
        lng: -74.048137,
      };

      appRequest
        .post(baseUrl)
        .set('content-type', 'application/json')
        .send(newBicycle)
        .then((response) => {
          expect(response.statusCode).toBe(201);
          const data = response.body.bicycle;
          expect(data.code).toBe(newBicycle.code);
          expect(data.color).toBe(newBicycle.color);
          expect(data.model).toBe(newBicycle.model);
          expect(data.location).toEqual([newBicycle.lat, newBicycle.lng]);
          done();
        });
    });
  });

  describe('deleteBicycle', () => {
    it('should delete bicycle', (done) => {
      const headers = { 'content-type': 'application/json' };

      appRequest.delete(`${baseUrl}/1`).then((response) => {
        expect(response.statusCode).toBe(204);
        done();
      });
    });
  });
});
