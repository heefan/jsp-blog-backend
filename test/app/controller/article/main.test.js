'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const pkg = require("../../../../package.json");

describe('test/app/controller/article/main.test.js', () => {
    it('should assert', () => {
        const pkg = require('../../../package.json');
        assert(app.config.keys.startsWith(pkg.name));

        // const ctx = app.mockContext({});
        // yield ctx.service.xx();
    });

    it('should GET /', () => {
        return app.httpRequest()
            .get('/')
            .expect('hi, egg')
            .expect(200);
    });
});
