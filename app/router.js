'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/article')(app);
  require('./router/admin')(app);
  require('./router/category')(app);
};
