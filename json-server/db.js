const therapists = require('./data/counsellor-mock.json');
const availabilities = require('./data/availability-mock.json');
const bookingRequests = require('./data/booking-requests.json');
module.exports = () => ({
  therapists,
  availabilities,
  bookingRequests,
});
