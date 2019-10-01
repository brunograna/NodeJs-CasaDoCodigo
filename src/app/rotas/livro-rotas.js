
const LivroControlador = require("../controlador/livro-controlador");
const livroControlador = new LivroControlador();

const Livro = require("../modelo/livro");

module.exports = (app) => {

    const rotasLivro = LivroControlador.rotas();

    app.get(rotasLivro.lista, livroControlador.lista());
    
    app.get(rotasLivro.edicao, livroControlador.formularioEdicao());
    
    app.route(rotasLivro.cadastro)
        .get(livroControlador.formularioCadastro())
        .post(Livro.validacoes, livroControlador.cadastra())
        .put(livroControlador.edita());
    
    app.delete(rotasLivro.delecao, livroControlador.remove());

};