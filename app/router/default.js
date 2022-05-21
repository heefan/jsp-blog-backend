'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/default/index', controller.default.home.index);
  router.get('/default/getArticleList', controller.default.home.getArticleList);
  router.get('/default/getCategory', controller.default.home.getCategory);
  router.get('/default/getListById/:id', controller.default.home.getArticleListByTypeId);
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById);
};
