'use strict';

/**
 *  Admin Router
 */

module.exports = app => {
  const { router, controller } = app;

  const adminauth = app.middleware.adminauth();
  router.get('/admin/index', controller.admin.main.index);
  router.get('/admin/getCategory', adminauth, controller.admin.main.getCategory);
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle);
  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);
  router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList);
  router.get('/admin/delArticle/:id', adminauth, controller.admin.main.delArticle);
  router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById);
  router.post('/admin/doLogIn', controller.admin.main.doLogIn);
  router.post('/admin/isLoggedIn', controller.admin.main.isLoggedIn);
  router.get('/admin/doLogOut', adminauth, controller.admin.main.doLogOut);
  router.post('/admin/addBBD', adminauth, controller.admin.main.addBBD);
  router.get('/admin/getListBBD', adminauth, controller.admin.main.getListBBD);
  router.get('/admin/delBBDbyId/:id', adminauth, controller.admin.main.delBBDbyId);
  router.post('/admin/updateIsOnTop', adminauth, controller.admin.main.updateIsOnTop);
};
