class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarAtendimentos()
        
        
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS aluguel (id int NOT NULL AUTO_INCREMENT, nome_cliente varchar(50) NOT NULL, nome_livro varchar(50), telefone varchar(20) NOT NULL, multa decimal NOT NULL DEFAULT "0", data_retirada date, data_prevista date NOT NULL, data_devolucao date,caminho_img varchar(100) NOT NULL, PRIMARY KEY(id))'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela aluguel criada com sucesso')
            }
        })
    }
    dadosAutomaticos(){
     const sql1 ="REPLACE INTO livraria.aluguel (id, nome_cliente, nome_livro, telefone, data_retirada,data_prevista,data_devolucao,multa,caminho_img) VALUES ('1','joao', 'pearcy jackson', '71888888888','2022-05-02','2022-05-26','2022-05-26',0,'uploads/pearcy_jackson.jpg'),('2','luiz vencimento', 'marley e eu', '71777777777','2022-05-25','2022-06-02','2022-06-01',0,'uploads/marley_e_eu.jpg'),('3','victor', 'chapeuzinho vermelho', '71555555555','2022-05-22','2022-05-27','2022-05-28',20,'uploads/chapeuzinho_vermelho.jpg'),('4','andre azoubel', 'senhor dos aneis', '71924242424','2021-12-15','2021-01-15','2022-02-15',20,'uploads/senhor_dos_aneis.jpg'),('5','maria', 'joao e maria', '71222222222','2022-05-20','2022-05-26','2022-05-26',0,'uploads/joao_e_maria.jpg'),('6','fernando', 'james bond', '71111111111','2022-06-01','2022-06-05','2022-06-06',20,'uploads/james_bond.jpg'),('7','tulio', 'aprenda python do jeito certo', '71212121221','2022-06-02','2022-06-06','2022-06-16',20,'uploads/aprenda_python_do_jeito_certo.jpg'),('8','cleber','java como programar', '75241786321','2022-05-19','2022-05-29','2022-05-25',0,'uploads/java_como_programar.jpg'),('9','galdir', 'deitels-internet and world wide web how to program', '71999999999','2022-05-10','2022-05-15','2022-05-13',0,'uploads/deitels_internet_and_world_wide_web_how_to_program.jpg'),('10','fabricio', 'C: como programar', '71998989898','2022-05-17','2022-05-26','2022-05-28',20,'uploads/c_como_programar.jpg')"
        this.conexao.query(sql1, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('dados inseridos com sucesso')
            }
        })

    } 
    



}

module.exports = new Tabelas