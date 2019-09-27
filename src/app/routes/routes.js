const LivroDao = require("../infra/dao/livro-dao")
const db = require("../../config/database");

module.exports = (app) =>{
    
    app.get("/", (req, resp) => {
        resp.marko(
            require("../views/home/index.marko")
        );
    });

    app.get("/livros", (req, resp) => {

        const livroDao = new LivroDao(db);

        livroDao.lista()
                    .then((result)=>{
                        resp.marko(
                            require("../views/livros/lista/lista.marko"),
                            {
                                livros : result
                            }
                        );
                    })
                    .catch(error => console.log(error));

    });

    app.get("/livros/form", (req, resp) => {
        resp.marko( require("../views/livros/form/form.marko") );
    });

    app.post("/livros", (req, resp) => {
       
        livroDao.salvar(req.body)
                .then(resp.redirect("/livros"))
                .catch(error => console.log(error));
    });

    app.get("/livros/:id", (req, resp) => {       
        const livro_id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscarPorId(livro_id)
                            .then((livro)=>{
                                resp.marko(
                                    require("../views/livros/editar/editar.marko"),
                                    {
                                        livro : livro
                                    }
                                )
                               
                            })
                            .catch(error => {
                                console.log(error);
                                resp.redirect("/livros");
                            });
    

    });


    app.post("/livros/update", (req, resp)=>{
        const livroDao = new LivroDao(db);

        livroDao.atualizar(req.body)
                        .then(()=>{
                            resp.redirect(`/livros/${req.body.id}`)
                        })
                        .catch((error)=>console.log("Algo deu errado\n"+error));
    });
    
    app.get("/livros/delete/:id", (req, resp) => {
        const livroDao = new LivroDao(db);

        const livro_id = req.params.id;

        livroDao.deletar(livro_id)
                        .then(()=>{
                            resp.redirect("/livros");
                        })
                        .catch((error)=>console.log("Algo deu errado \n"+error));
    });
}