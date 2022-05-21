'use strict';


const ELoginSuccess = 'LOGIN SUCCESS';
const ELoginFailed = 'LOGIN FAILED';
const EAlreadyLoggedIn = 'YOU ALREADY LOGGED IN';
const ENotLoggedIn = 'YOU HAVE NOT LOGGED IN';

const Controller = require('egg').Controller;
class AuthController extends Controller {
  async login() {
    const username = this.ctx.request.body.username;
    const password = this.ctx.request.body.password;
    const sql = " SELECT username FROM admin_user WHERE username = '" + username +
      "' AND password = '" + password + "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: ELoginSuccess, openId };
    } else {
      this.ctx.body = { data: ELoginFailed };
    }
  }

  async logout() {
    this.ctx.session.openId = null;
    this.ctx.body = { data: ELoginSuccess };
  }

  async isLoggedIn() {
    const cOpenId = this.ctx.request.body.openId;
    const sOpenId = this.ctx.session.openId.openId;
    if (sOpenId && cOpenId === sOpenId) {
      this.ctx.body = { data: EAlreadyLoggedIn };
    } else {
      this.ctx.body = { data: ENotLoggedIn };
    }
  }
}

module.exports = AuthController;
