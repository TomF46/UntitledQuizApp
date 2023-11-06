if (process.env.NODE_ENV === 'production') {
  module.exports = require('./proStore');
} else {
  module.exports = require('./devStore');
}
