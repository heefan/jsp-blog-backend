'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/article/index', controller.article.main.index);
  router.get('/article/getArticleList', controller.article.main.getArticleList);
  router.get('/article/getCategory', controller.article.main.getCategory);
  router.get('/article/getListById/:id', controller.article.main.getArticleListByTypeId);
  router.get('/article/getArticleById/:id', controller.article.main.getArticleById);
};
