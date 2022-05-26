'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/article/index', controller.article.main.index);
  router.get('/article/list', controller.article.main.articleList);
  router.get('/article/category', controller.article.main.category);
  router.get('/article/list/:id', controller.article.main.articleListByCategoryId);
  router.get('/article/:id', controller.article.main.articleById);
};
