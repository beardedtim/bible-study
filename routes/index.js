const Router = require("@koa/router");
const books = require("./books");
const translations = require("./translations");

const router = new Router();

module.exports = router.use(books.routes()).use(translations.routes());
