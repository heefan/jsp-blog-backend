'use strict';

const Controller = require('egg').Controller;
const DBConst = require("../../db_constant");
class MainController extends Controller {
    async categoryList() {
        const result = await this.app.mysql.select(DBConst.DB.TB_CATEGORY);
        this.ctx.body = {data: result};
    }
}

module.exports = MainController;
