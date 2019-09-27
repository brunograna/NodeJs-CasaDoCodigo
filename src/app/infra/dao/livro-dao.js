class LivroDao {

    constructor(db) {
        this._db = db;
    }

    lista(){
        return new Promise((resolve, reject)=>{
            this._db.all(
                "SELECT * FROM livros",
                (error, result) => {
                    if (error) return reject("Não foi possível completar a operação");

                    return resolve(result);
                }
            )
        });
    }

    salvar(livro){
        return new Promise((resolve, reject)=>{
            this._db.run(
                `INSERT INTO livros (
                    titulo,
                    preco,
                    descricao
                ) VALUES (
                    ?, ?, ?
                )`,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                (error) => {
                    if(error) return reject("Não foi possível cadastrar o livro");

                    resolve();
                }
            )
        });
    }


    buscarPorId(id){
        return new Promise((resolve, reject)=>{
            this._db.get(
                `SELECT * FROM livros WHERE id = ?`,
                [id],
                (error, result) => {
                    if(error) return reject("Livro não encontrado");

                    return resolve(result);
                }
            )
        });
    }

    atualizar(livro){
        return new Promise((resolve, reject)=>{
            this._db.run(
                `UPDATE livros SET titulo=?,preco=?,descricao=? WHERE id=?`,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
                (error)=>{
                    if(error) return reject("Não foi possivel atualizar o livro");

                    resolve();
                }
            )
        });
    }

    deletar(id){
        return new Promise((resolve, reject)=>{
            this._db.run(
                `DELETE FROM livros WHERE id = ?`,
                [
                    id
                ],
                (error) => {
                    if(error) return reject("Não foi possível apagar o livro");

                    resolve();
                }
            )
        });
    }
}
module.exports = LivroDao;
