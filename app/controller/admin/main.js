'use strict';

const ELoginSuccess = 'LOGIN SUCCESS';
const ELoginFailed = 'LOGIN FAILED';
const EAlreadyLoggedIn = 'YOU ALREADY LOGGED IN';
const ENotLoggedIn = 'YOU HAVE NOT LOGGED IN';

const Controller = require('egg').Controller;

const CATEGORY_TABLE = 'category';
const ARTICLE_TABLE = 'article';
class MainController extends Controller {

  async index() {
    this.ctx.body = 'API Test';
  }

  /** *********************************************************
   *    Article Operation
   ***********************************************************/
  async addArticle() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert(ARTICLE_TABLE, tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    };
  }

  async updateArticle() {
    const tmpArticle = this.ctx.request.body;

    const result = await this.app.mysql.update(ARTICLE_TABLE, tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    console.log(updateSuccess);
    this.ctx.body = {
      isScuccess: updateSuccess,
    };
  }

  async updateIsOnTop() {
    const tmpArticle = this.ctx.request.body;

    const sql = 'update article set is_on_top = ' + tmpArticle.is_on_top + ' where id = ' + tmpArticle.id;
    const updateResult = await this.app.mysql.query(sql);
    const updateSuccess = updateResult.affectedRows === 1;
    if (updateSuccess) {
      this.ctx.body = { data: 'success' };
    } else {
      this.ctx.body = { data: 'error' };
    }
  }

  async delArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete(ARTICLE_TABLE, { id });
    this.ctx.body = { data: res };
  }


  /** ********************************************************
   *  article table operation
   ***********************************************************/
  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
        'article.title as title,' +
        'article.brief as brief,' +
        "FROM_UNIXTIME(article.last_updated,'%dd/%mm/%Y' ) as last_updated," +
        'article.view_count as view_count,' +
        'article.episode_count as episode_count,' +
        'article.is_on_top as is_on_top,' +
        'category.name as category_name' +
        'FROM article LEFT JOIN category ON article.category_id = category.id ' +
        'ORDER BY article.id DESC ';

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };

  }
  async getArticleById() {
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
        'article.title as title,' +
        'article.brief as brief,' +
        'article.content as content,' +
        "FROM_UNIXTIME(article.last_updated,'%dd/%mm/%Y' ) as last_updated," +
        'article.view_count as view_count ,' +
        'article.episode_count as episode_count ,' +
        'category.name as category_name ,' +
        'category.id as category_id ' +
        'FROM article LEFT JOIN category ON article.category_id = category.id ' +
        'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  /** *******************************************************
   *  category table operation
   *********************************************************/
  async getCategory() {
    const res = await this.app.mysql.select(CATEGORY_TABLE);
    this.ctx.body = { data: res };
  }


  /** ********************************************************
   *  BBD table
   **********************************************************/
  async addBBD() {
    const tmpBBD = this.ctx.request.body;
    const result = await this.app.mysql.insert('bibidao', tmpBBD);
    const insertSuccess = result.affectedRows === 1;
    this.ctx.body = { isScuccess: insertSuccess };
  }

  async getListBBD() {
    const resList = await this.app.mysql.select('bibidao', {
      orders: [[ 'id', 'desc' ]],
    });
    console.log(resList);
    this.ctx.body = { list: resList };
  }

  async delBBDbyId() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('bibidao', { id });
    this.ctx.body = { data: res };
  }
}

module.exports = MainController;
