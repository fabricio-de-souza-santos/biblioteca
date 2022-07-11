const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

 
class aluguel {
    adiciona(aluguel,caminho_img, res) {
        const data_retirada = moment().format('YYYY-MM-DD')
        const data_prevista = moment(aluguel.data_prevista, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const data_devolucao = moment(aluguel.data_devolucao, 'DD/MM/YYYY').format('YYYY-MM-DD')
 
        const dataEhValida = moment(data_prevista).isSameOrAfter(data_retirada) && moment(data_devolucao).isSameOrAfter(data_retirada)
        const clienteEhValido = aluguel.nome_cliente.length >=5
 
        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
 
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length
 
        if(existemErros) {
            res.status(400).json(erros)
        } else {        
            const alugueldatado = {...aluguel, data_retirada,data_prevista,data_devolucao,caminho_img}
            
            const sql = 'INSERT INTO aluguel SET ?'
            conexao.query(sql, alugueldatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
    }
    lista(res) {
        const sql = 'SELECT * FROM aluguel'
 
        conexao.query(sql, (erro, resultados) => { 
            if(erro) {
                res.status(400).json(erro)
            } else { 
                res.status(200).json(resultados)
        }})
    
    }
    enviaImg(caminho,res){
        res.sendFile(caminho)
    }
    buscaPorId(id, res) {
        const sql = `SELECT * FROM aluguel WHERE id=${id}`;
     
        conexao.query(sql, (erro, resultados) => { 
            const aluguel = resultados[0];
            if(erro) { 
                res.status(400).json(erro);
            } else {
                res.status(200).json(aluguel);
            }
     
        });
    }
    altera(id, valores, res) {
        if(valores.data_retirada) {
            valores.data_prevista = moment(valores.data_prevista, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        }
        if(valores.data_prevista) {
            valores.data_prevista = moment(valores.data_prevista, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        }
        if(valores.data_devolucao) {
            valores.data_devolucao = moment(valores.data_devolucao, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }                  
        const sql = 'UPDATE aluguel SET ? WHERE id=?'
 
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
	    });
    }


    deleta(id, res) {
        const sql = 'DELETE FROM aluguel WHERE id=?'
 
        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}






module.exports = new aluguel