/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1625381691944_2132';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'password',
      database: 'blogdb',
    },
    app: true,
    agent: false,
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };

  config.cors = {
    origin: 'http://localhost:3000',
    credentials: true,
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS',
  };

  // 长文本设置
  config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '5024kb',
    jsonLimit: '5024kb',
    strict: true,
    // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
  };


  return {
    ...config,
    ...userConfig,
  };
};
