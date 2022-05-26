'use strict';

const DB = {
    NAME: 'blogdb',
    TB_ARTICLE: 'article',
    TB_CATEGORY: 'category'
}

const TB_ARTICLE = {
    ID: DB.TB_ARTICLE + '.id',
    TITLE: DB.TB_ARTICLE + '.title',
    BRIEF: DB.TB_ARTICLE + '.brief',
    LAST_UPDATED: DB.TB_ARTICLE + '.last_updated',
    VIEW_COUNT: DB.TB_ARTICLE + '.view_count',
    CATEGORY_NAME: DB.TB_ARTICLE + '.category_name',
    CATEGORY_ID: DB.TB_ARTICLE + '.category_id',
    CONTENT: DB.TB_ARTICLE + '.content'
};

module.exports = { DB, TB_ARTICLE };
