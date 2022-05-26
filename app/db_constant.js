'use strict';

module.exports = Object.freeze({
    DB_NAME : 'blogdb',
    DB_TABLE_ARTICLE: 'article',
    DB_TABLE_CATEGORY: 'category',
    TB_ARTICLE_ID: this.DB_TABLE_ARTICLE + '.id',
    TB_ARTICLE_TITLE: this.DB_TABLE_ARTICLE + '.title',
    TB_ARTICLE_BRIEF: this.DB_TABLE_ARTICLE + '.brief',
    TB_ARTICLE_LAST_UPDATED: this.DB_TABLE_ARTICLE + '.last_updated',
    TB_ARTICLE_VIEW_COUNT: this.DB_TABLE_ARTICLE + '.view_count',
    TB_ARTICLE_CATEGORY_NAME: this.DB_TABLE_ARTICLE + '.category_name',
    TB_ARTICLE_CATEGORY_ID: this.DB_TABLE_ARTICLE + '.category_id',
});
