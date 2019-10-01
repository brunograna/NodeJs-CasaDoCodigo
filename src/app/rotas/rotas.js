const baseRotas =  require("../rotas/base-rotas");
const livroRotas =  require("../rotas/livro-rotas");

module.exports = (app) => {

    baseRotas(app);
    livroRotas(app);  

};