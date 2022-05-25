'use strict';

const Controller = require('egg').Controller;
class MainController extends Controller {

  constants = require('../../db_constant');

  async index() {
    const result = await this.app.mysql.get(this.constants.DB_TABLE_ARTICLE);
    console.log(result);
    this.ctx.body = result;
  }

  async list() {
    const id = this.constants.DB_TABLE_ARTICLE + '.id'
    const title = this.constants.DB_TABLE_ARTICLE + '.title'
    const brief = this.constants.DB_TABLE_ARTICLE + '.brief'
    const last_updated = this.constants.DB_TABLE_ARTICLE + '.last_updated'
    const view_count = this.constants.DB_TABLE_ARTICLE + '.view_count'
    const category_name = this.constants.DB_TABLE_ARTICLE + '.category_name'

    const sql = 'SELECT ' + id +  ' as id, '
        + title + ' as title, '
        + brief + ' as brief, '
        + 'FROM_UNIXTIME(' + last_updated + ",'%H:%i, %m/%d/%Y') as last_updated, "
        + view_count + ' as view_count, '
        + category_name + ' as category_name '
        + 'FROM ' + this.constants.DB_TABLE_ARTICLE + 'LEFT JOIN type ON ' + category_name + '=category.id';

    console.log(sql)

    return

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

  async getArticleListByTypeId() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
        'article.title as title,' +
        'article.brief as brief,' +
        'article.content as content,' +
        "FROM_UNIXTIME(article.last_updated,'%H:%i, %m/%d/%Y' ) as lastUpdated," +
        'article.view_count as view_count ,' +
        'category.name as category_name ,' +
        'category.id as category_id ' +
        'FROM article LEFT JOIN category ON article.category_id = category.id ' +
        'WHERE category_id =' + id;

    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }
}

module.exports = MainController;
