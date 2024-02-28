const moment = require('moment');

const getDateTime = ()=> {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

const getDate = ()=> {
  return moment().format('YYYY-MM-DD');
}

module.exports = {
  getDateTime,
  getDate,
};