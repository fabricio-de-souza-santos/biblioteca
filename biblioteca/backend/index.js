const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('conectado com sucesso')
        
        Tabelas.init(conexao)
        Tabelas.dadosAutomaticos()
        
        const app = customExpress()

        app.listen(8080, () => console.log('Servidor rodando na porta 3000'))
    }
})
