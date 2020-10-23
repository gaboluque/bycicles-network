const Bicycle = require('../../src/models/Bicycle');
const Booking = require('../../src/models/Booking');
const User = require('../../src/models/User');
const { dbConnect, dbClose } = require('../utils/dbUtils');
const { testBicycle } = require('../utils/bicycleUtils');

describe('User', () => {
  beforeAll((done) => {
    dbConnect();
    done();
  });

  beforeEach((done) => {
    Booking.deleteMany({}).then(() => {
      User.deleteMany({}).then(() => {
        Bicycle.deleteMany({}, done);
      });
    });
  });

  afterAll((done) => {
    dbClose();
    done();
  });

  describe('User.bookBicycle', () => {
    it('should book a bicycle', (done) => {
      const user = new User({ name: 'John' });
      user.save();
      const bicycle = new Bicycle(testBicycle);
      bicycle.save();

      const today = new Date('2020-10-23');
      const tomorrow = new Date('2020-10-24');

      user.bookBicycle(bicycle.id, today, tomorrow, () => {
        Booking.find({})
          .populate('user')
          .populate('bicycle')
          .exec((_error, bookings) => {
            expect(bookings.length).toBe(1);
            expect(bookings[0].totalDays()).toBe(2);
            expect(bookings[0].bicycle.code).toBe(testBicycle.code);
            expect(bookings[0].user.name).toBe(user.name);
            done();
          });
      });
    });
  });
});
