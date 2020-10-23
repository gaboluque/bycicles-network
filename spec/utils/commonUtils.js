const request = require('supertest');
const app = require('../../src/app');

exports.appRequest = request(app);
