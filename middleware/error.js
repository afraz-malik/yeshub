const winston = require('winston');
module.exports = function (err, req, res, next) {
  winston.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly
  // res.status(500).send('Something failed.');
  return res.status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE).json({
    error: CONSTANTS.INTERNAL_ERROR,
    message: err.message
  }).end();
}