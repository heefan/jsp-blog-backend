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


  async getArticleById() {
    const id = this.ctx.params.id;

    if (id) {
      const sql1 = 'UPDATE article SET view_count = (view_count+1) WHERE id =' + id;

      const updateResult = await this.app.mysql.query(sql1);
      const updateSuccess = updateResult.affectedRows === 1;
      if (updateSuccess) {
        const sql2 = 'SELECT id, category_id, title, content,' +
            'brief, view_count, episode_count, content_html, brief_html,' +
            "FROM_UNIXTIME(last_updated,'%dd/%mm/%YY' ) as last_updated " +
            'FROM article WHERE id=' + id;

        let result2 = await this.app.mysql.query(sql2);
        result2 = JSON.stringify(result2);
        result2 = JSON.parse(result2);
        const categoryId = result2[0].category_id;
        const sql3 = 'SELECT name FROM category WHERE id=' + categoryId;
        let result3 = await this.app.mysql.query(sql3);

        // console.log(result3)
        result3 = JSON.stringify(result3);
        result3 = JSON.parse(result3);
        result2[0].name = result3[0].name;
        this.ctx.body = { data: result2 };
      } else {
        console.log('id错误1');
        this.ctx.body = { data: 'id错误' };
      }
    } else {
      console.log('id错误2');
      this.ctx.body = { data: 'id错误' };
    }
  }


  async category() {
    const result = await this.app.mysql.select(this.constants.DB_TABLE_CATEGORY);
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
