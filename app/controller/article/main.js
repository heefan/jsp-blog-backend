'use strict';

const Controller = require('egg').Controller;
const DBConst = require("../../db_constant");
class MainController extends Controller {

  async index() {
    const result = await this.app.mysql.get(this.constants.DB_TABLE_ARTICLE);
    console.log(result);
    this.ctx.body = result;
  }

  async articleList() {
    const sql = 'SELECT ' + DBConst.TB_ARTICLE.ID  + ' as id, '
        + DBConst.TB_ARTICLE.TITLE + ' as title, '
        + DBConst.TB_ARTICLE.BRIEF + ' as brief, '
        + 'FROM_UNIXTIME(' + DBConst.TB_ARTICLE.LAST_UPDATED + ",'%H:%i, %m/%d/%Y') as last_updated, "
        + DBConst.TB_ARTICLE.VIEW_COUNT + ' as view_count, '
        + DBConst.TB_ARTICLE.CATEGORY_NAME + ' as category_name '
        + 'FROM ' + DBConst.DB.TB_ARTICLE + ' ORDER BY article.id DESC';

    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results,
    };
  }

  async articleById() {
    const id = this.ctx.params.id;
    let id_n = Number(id);
    if (!Number.isInteger(id_n)) {
      this.ctx.body = {data: 'invalid id'}
      return
    }

    const viewCountUpdateSql = 'UPDATE ' + DBConst.DB.TB_ARTICLE
        + ' SET ' +  DBConst.TB_ARTICLE.VIEW_COUNT + '=(' + DBConst.TB_ARTICLE.VIEW_COUNT + '+1) '
        + 'WHERE ' + DBConst.TB_ARTICLE.ID + '=' + id;

    console.log(viewCountUpdateSql);
    const updateResult = await this.app.mysql.query(viewCountUpdateSql);
    const updateSuccess = updateResult.affectedRows === 1;

    if (!updateSuccess) {
      this.ctx.body = {data: 'update failed'}
      return
    }

    const querySql = 'SELECT ' + DBConst.TB_ARTICLE.ID  + ' as id, '
        + DBConst.TB_ARTICLE.TITLE + ' as title, '
        + DBConst.TB_ARTICLE.BRIEF + ' as brief, '
        + DBConst.TB_ARTICLE.CATEGORY_ID + ' as category_id, '
        + DBConst.TB_ARTICLE.VIEW_COUNT + ' as view_count, '
        + 'FROM_UNIXTIME(' + DBConst.TB_ARTICLE.LAST_UPDATED + ",'%H:%i, %m/%d/%Y') as last_updated "
        + 'FROM ' + DBConst.DB.TB_ARTICLE + ' WHERE id=' + id;

    let result = await this.app.mysql.query(querySql);
    result = JSON.stringify(result);
    result = JSON.parse(result);
    const categoryId = result[0].category_id;

    const queryNameSql = 'SELECT name FROM category WHERE id=' + categoryId;
    let nameRet = await this.app.mysql.query(queryNameSql);

    nameRet = JSON.stringify(nameRet);
    nameRet = JSON.parse(nameRet);
    result[0].name = nameRet[0].name;
    this.ctx.body = { data: result };
  }

  async articleListByCategoryId() {
    const id = this.ctx.params.id;

    const sql = 'SELECT ' + DBConst.TB_ARTICLE.ID +  ' as id, '
        + DBConst.TB_ARTICLE.TITLE + ' as title, '
        + DBConst.TB_ARTICLE.CONTENT + ' as content, '
        + 'FROM_UNIXTIME(' + DBConst.TB_ARTICLE.LAST_UPDATED + ",'%H:%i, %m/%d/%Y') as last_updated, "
        + DBConst.TB_ARTICLE.VIEW_COUNT + ' as view_count, '
        + DBConst.TB_ARTICLE.CATEGORY_NAME + ' as category_name '
        + 'FROM ' +  DBConst.DB.TB_ARTICLE  + ' '  //+  ' LEFT JOIN category ON article.category_id = category.id ' +
        + 'WHERE ' + DBConst.TB_ARTICLE.CATEGORY_ID + '=id';

    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }
}

module.exports = MainController;
