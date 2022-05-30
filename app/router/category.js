'use strict';

module.exports = app => {
    const { router, controller } = app;
    router.get('/category/list', controller.category.main.categoryList);
};
