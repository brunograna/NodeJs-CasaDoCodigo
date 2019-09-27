require("marko/node-require").install();
require("marko/express");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("*", (req, resp, next)=>{
    const inicio = new Date().getTime();
    next();
    const fim = new Date().getTime();
    console.log(`This request took ${(fim-inicio)} ms`);
});

const routes = require("../app/routes/routes");
routes(app);

module.exports = app;