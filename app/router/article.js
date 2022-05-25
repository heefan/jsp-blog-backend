'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/article/index', controller.article.main.index);
  router.get('/article/list', controller.article.main.list);
  router.get('/article/category', controller.article.main.category);
  router.get('/article/getListById/:id', controller.article.main.getArticleListByTypeId);
  router.get('/article/getArticleById/:id', controller.article.main.getArticleById);
};
