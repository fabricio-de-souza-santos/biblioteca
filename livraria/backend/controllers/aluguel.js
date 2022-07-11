const aluguel = require('../models/aluguel')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads/')
        
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage: storage})

module.exports = app => {
    app.get('/aluguel/list', (req, res) => {
        aluguel.lista(res);
    });
    app.get('/uploads/:caminho', (req, res) => {
        const caminho = req.params.caminho;
        aluguel.enviarimg(caminho,res);
    });
    app.get('/aluguel/:id', (req, res) => { 
        const id = parseInt(req.params.id);
        aluguel.buscaPorId(id, res);
    });
    
    app.post('/aluguel/post',upload.single('caminho_img'),(req, res) => {
        const Aluguel = req.body
        const img =req.file.path
        
        aluguel.adiciona(Aluguel,img, res)
     
    })
    app.patch('/aluguel/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
     
        aluguel.altera(id, valores, res)
    })
    app.delete('/aluguel/:id', (req, res) => {
        const id = parseInt(req.params.id)
 
        aluguel.deleta(id, res)
    })
    
    
    
}