const { check } = require('express-validator/check');
class Livro {
    static validacoes(){
        return [
            check('titulo').isLength({ min: 5 }).withMessage("O Campo Titulo deve ter no mínimo 5 caracteres"),
            check("preco").isCurrency().withMessage("O Preço deve ser um valor monetário válido")
        ]
    }
}
module.exports = Livro;