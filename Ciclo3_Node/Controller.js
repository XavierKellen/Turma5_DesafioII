const express = require('express');
const cors = require('cors');

const {Sequelize, sequelize} = require('./models');

const models=require('./models');

const app=express();
app.use(cors());
app.use(express.json());

let cliente=models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;
let compra = models.Compra;
let itemcompra = models.ItemCompra;
let produto = models.Produto;

app.get('/', function(req,res){
    res.send('Olá Mundo!')
});

app.post('/servicos', async(req,res) =>{
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Serviço criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar!"
        })
    });
});

app.post('/produtos', async(req,res) =>{
    await produto.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Produto criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar!"
        })
    });
});

app.post('/clientes', async(req,res) =>{
    await cliente.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Cliente criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar!"
        })
    });
});

app.post('/pedidos', async(req,res) =>{
    await pedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Pedido criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar!"
        })
    });
});

app.post('/compras', async(req,res) =>{
    await compra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Compra criada com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar!"
        })
    });
});

app.post('/itempedidos', async(req,res) =>{
    await itempedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Item criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar!"
        })
    });
});

app.post('/itemcompras', async(req,res) =>{
    await itemcompra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Item compra criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar!"
        })
    });
});

//Listar serviços cadastrados por onde crescente (DES, ASC...)
app.get('/listaservicos', async(req,res)=>{
    await servico.findAll({
        raw: true
        //order:[['nome','ASC']]
    }).then(function(servicos){
        res.json({servicos});
    });
});

//Listar produtos cadastrados por onde crescente (DES, ASC...)
app.get('/listaprodutos', async(req,res)=>{
    await produto.findAll({
        //raw: true
        order:[['nome','ASC']]
    }).then(function(produtos){
        res.json({produtos});
    });
});

//Listar clientes cadastrados através do get
app.get('/listaclientes', async(req,res)=>{
    await cliente.findAll({
        raw: true,
    }).then(function(clientes){
        res.json({clientes})
    });
});

//Listar todos os pedidos cadastrados 
app.get('/listapedidos', async(req,res)=>{
    await pedido.findAll({
        raw: true
    }).then(function(pedidos){
        res.json({pedidos});
    });
});

//Listar todos os itens pedido cadastrados 
app.get('/listaitempedidos', async(req,res)=>{
    await itempedido.findAll({
        raw: true
    }).then(function(itempedidos){
        res.json({itempedidos});
    });
});

//Listar todos os itens compra cadastrados 
app.get('/listaitemcompras', async(req,res)=>{
    await itemcompra.findAll({
        raw: true
    }).then(function(itemcompras){
        res.json({itemcompras});
    });
});

//Listar todas as compras cadastradas
app.get('/listacompras', async(req,res)=>{
    await compra.findAll({
        //.raw: true
        attributes: ['id', 'data', 'createdAt', 'ClienteId', 'updatedAt']
    }).then(function(compras){
        res.json({compras});
    });
});

//Mostrar quantidades de serviços cadastrados
app.get('/ofertaservicos', async(req,res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});

//Mostrar quantidades de produtos cadastrados
app.get('/ofertaprodutos', async(req,res)=>{
    await produto.count('id').then(function(produtos){
        res.json({produtos});
    });
});

//Mostrar quantidades de clientes cadastrados
app.get('/ofertaclientes', async(req,res)=>{
    await cliente.count('id').then(function(cliente){
        res.json({cliente});
    });
});

//Mostrar quantidades de pedidos cadastrados
app.get('/ofertapedidos', async(req,res)=>{
    await pedido.count('id').then(function(pedido){
        res.json({pedido});
    });
});

//consultar serviço através do Id
app.get('/servico/:id',async(req,res) =>{
    await servico.findByPk(req.params.id)
    .then(serv =>{
        return res.json({
            error: false,
            serv
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro: Não foi possível conectar."
        });
    });
});

//consultar serviço através do Id de serviço
app.get('/servico/:id/pedidos',async(req,res) =>{
    await itempedido.findAll({
        where: {ServicoId: req.params.id}})
    .then(item =>{
        return res.json({
            error: false,
            item
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro: Não foi possível conectar."
        });
    });
});

//consultar compras através do Id do produto
app.get('/produto/:id/compras',async(req,res) =>{
    await itemcompra.findAll({
        where: {ProdutoId: req.params.id}})
    .then(item =>{
        return res.json({
            error: false,
            item
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro: Não foi possível conectar."
        });
    });
});

//consultar os itens através do Id de pedidos
app.get('/pedido/:id/itens',async(req,res) =>{
    await itempedido.findAll({
        where: {PedidoId: req.params.id}})
    .then(item =>{
        return res.json({
            error: false,
            item
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro: Não foi possível conectar."
        });
    });
});

//consultar os itens através do Id da Compra
app.get('/compra/:id/itens',async(req,res) =>{
    await itemcompra.findAll({
        where: {CompraId: req.params.id}})
    .then(item =>{
        return res.json({
            error: false,
            item
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro: Não foi possível conectar."
        });
    });
});

//consultar cliente através do Id de pedidos
app.get('/cliente/:id/pedidos',async(req,res) =>{
    await pedido.findAll({
        where: {ClienteId: req.params.id}})
    .then(pedidos =>{
        return res.json({
            error: false,
            pedidos
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro: Não foi possível conectar."
        });
    });
});

//consultar produto através do Id
app.get('/produto/:id',async(req,res) =>{
    await produto.findByPk(req.params.id)
    .then(prod =>{
        return res.json({
            error: false,
            prod
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro: Não foi possível conectar."
        });
    });
});

//alterar informações registradas no banco de dados através do get
/*app.get('/atualizaservico', async(req,res)=>{
    await servico.findByPk(1)
    .then(serv =>{
        serv.nome = 'HTML/CSS/JS';
        serv.descricao = 'Páginas estáticas e dinâmicas estilizadas';
        serv.save();
        return res.json({serv});
    });
});*/

app.put('/atualizaservico', async(req,res) =>{
    await servico.update(req.body, {
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na tentativa de alteração do serviço!"
        });
    });
});

app.put('/atualizaproduto', async(req,res) =>{
    await produto.update(req.body, {
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto foi alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na tentativa de alteração do serviço!"
        });
    });
});

app.put('/atualizacliente', async(req,res) =>{
    await cliente.update(req.body, {
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente foi alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na tentativa de alteração do cliente!"
        });
    });
});


//Busca de pedido pelo Id
app.get('/pedidos/:id', async(req,res)=>{
    await pedido.findByPk(req.params.id,{include:[{all: true}]})
    .then(ped=>{
        return  res.json({ped});
    });
});

//Busca de compra pelo Id
app.get('/compras/:id', async(req,res)=>{
    await compra.findOne({attributes: ['id', 'data', 'createdAt', 'ClienteId', 'updatedAt'],
                          where: {id:req.params.id}    
    }).then(com=>{
        return  res.json({com});
    });
});

//alterar quantidade ou valor no pedido
app.put('/pedidos/:id/editaritem', async(req,res)=>{
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor,
    };

    if (!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'Pedido não foi encontrado'
        });
    };
    if(!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        });
    };

    await itempedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId},
            {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: "Pedido foi alterado com sucesso!",
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

app.put('/compras/:id/editaritem', async(req,res)=>{
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor,
    };

    if (!await compra.findOne({attributes: ['id', 'data', 'createdAt', 'ClienteId', 'updatedAt'],
                               where: {id: req.params.id}
                             })){
        return res.status(400).json({
            error: true,
            message: 'Compra não foi encontrada'
        });
    };

    if(!await produto.findByPk(req.body.ProdutoId)){
        return res.status(400).json({
            error: true,
            message: 'Produto não foi encontrado.'
        });
    };

    await itemcompra.update(item, {
        where: Sequelize.and({ProdutoId: req.body.ProdutoId},
            {CompraId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: "Compra foi alterada com sucesso!",
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

//excluir cliente com get (requisição externa)
app.get('/excluircliente/:id', async(req,res)=>{
    await cliente.destroy({
        where: {id: req.params.id}  
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o cliente."
        });
    });
});

app.get('/excluirpedido/:id', async(req,res)=>{
    await pedido.destroy({
        where: {id: req.params.id}  
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o pedido."
        });
    });
});

app.get('/excluircompra/:id', async(req,res)=>{
    await compra.destroy({
        where: {id: req.params.id}  
    }).then(function(){
        return res.json({
            error: false,
            message: "Compra foi excluída com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir a compra."
        });
    });
});

app.get('/excluirservico/:id', async(req,res)=>{
    await servico.destroy({
        where: {id: req.params.id}  
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o serviço."
        });
    });
});

app.get('/excluirproduto/:id', async(req,res)=>{
    await produto.destroy({
        where: {id: req.params.id}  
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto foi excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o produto."
        });
    });
});

//consultar o item do pedido
app.get('/itempedido/:idPedido/:idServico',async(req,res) =>{
    await itempedido.findAll({
        where: Sequelize.and({PedidoId: req.params.idPedido},
                             {ServicoId: req.params.idServico})               
    }).then(item =>{
        return res.json({
            error: false,
            item
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro: Não foi possível conectar."
        });
    });
});

app.delete('/excluiritempedido/:idPedido/:idServico', async(req,res)=>{
    await itempedido.destroy({
        where: Sequelize.and({PedidoId: req.params.idPedido},
                             {ServicoId: req.params.idServico})  
    }).then(function(){
        return res.json({
            error: false,
            message: "Item do Pedido foi excluído com sucesso!"
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o Item do Pedido."
        });
    });
});

//consultar o item da compra
app.get('/itemcompra/:idCompra/:idProduto',async(req,res) =>{
    await itemcompra.findAll({
        where: Sequelize.and({CompraId: req.params.idCompra},
                             {ProdutoId: req.params.idProduto})               
    }).then(item =>{
        return res.json({
            error: false,
            item
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro: Não foi possível conectar."
        });
    });
});

app.delete('/excluiritemcompra/:idCompra/:idProduto', async(req,res)=>{
    await itemcompra.destroy({
        where: Sequelize.and({CompraId: req.params.idCompra},
                             {ProdutoId: req.params.idProduto})  
    }).then(function(){
        return res.json({
            error: false,
            message: "Item da Compra foi excluído com sucesso!"
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o Item da Compra."
        });
    });
});


let port=process.env.PORT || 3001; //3001

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001') //3001
});