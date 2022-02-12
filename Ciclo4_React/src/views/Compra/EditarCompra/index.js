import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

import { useEffect, useState } from "react";
//import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
//import { Container } from "reactstrap";

import { api } from "../../../config";

export const EditarCompra = (props) => {

    const [idCompra, setIdCompra] = useState(props.match.params.idCompra);
    const [idProduto, setIdProduto] = useState(props.match.params.idProduto);      
    
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    
    const [produto, setProduto] = useState({
        CompraId: idCompra,
        ProdutoId: idProduto,               
        quantidade: '',
        valor: ''    
    });   

    const valorInput = e => setProduto({
        ...produto,[e.target.name]: e.target.value
    });


    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const edtCompra = async e => {
        e.preventDefault();        
        console.log(produto);

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api+"/compras/"+idCompra+"/editaritem", produto,{headers})
        .then((response) => {
            setStatus({
                type: 'success',
                message: 'Alteração realizada com sucesso'
            })
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: Não foi possível realizar a alteração'
            })    
        })
    };

    const getItemCompra = async () =>{
        await axios.get(api+"/itemcompra/"+idCompra+"/"+idProduto)
        .then((response) =>{               
            setQuantidade(response.data.item[0].quantidade);                
            setValor(response.data.item[0].valor);                
            
            produto['quantidade'] = response.data.item[0].quantidade;
            produto['valor'] = response.data.item[0].valor;
        })
        .catch(() =>{
            setStatus({
                type: 'error',
                message: 'Erro: Impossível conectar-se a API.'
            })
        })
    };

    useEffect(() => {    
        getItemCompra();
    },[idCompra, idProduto]);

    const delItemCompra = async (idCompra, idProduto) => {        
        console.log(produto);

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.delete(api+"/excluiritemcompra/"+idCompra+"/"+idProduto, {headers})
        .then((response) => {
            setStatus({
                type: 'success',
                message: 'Exclusão realizada com sucesso'
                //getItemCompra();
            })
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: Não foi possível realizar a alteração'
            })    
        })
    };    

    

   

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Item da Compra</h1>
                    </div>                                    
                    <div className="p-2">
                        <Link to="/listar-pedidos" className="m-auto btn btn-outline-primary btn-sm">
                            Pedidos    
                        </Link>   
                    </div>    
                    <hr className="m-1"/>
                    {status.type === 'error' ?
                        <Alert color="danger">{status.message} </Alert> : ""}
                    {status.type === 'success' ?
                        <Alert color="success">{status.message}</Alert> : ""}

                </div>
                <Form className="p-2" onSubmit={edtCompra}>
                    <FormGroup className="p-2">
                        <Label>Id da Compra</Label>                    
                        <Input type="text" name="CompraId" placeholder="Id da Compra" 
                            defaultValue={idCompra} disabled />
                    </FormGroup>            

                    <FormGroup className="p-2">
                        <Label>Id do Produto</Label>                    
                        <Input type="text" name="ServicoId" placeholder="Id do Produto" 
                            defaultValue={idProduto} disabled />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Quantidade</Label>                    
                        <Input type="text" name="quantidade" placeholder="Quantidade do serviço" 
                             onChange={valorInput} defaultValue={quantidade}/>
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Valor</Label>                    
                        <Input type="text" name="valor" placeholder="Valor" 
                              onChange={valorInput} defaultValue={valor}/>
                    </FormGroup>                                    

                    <Button type="submit" outline color="success">Alterar</Button>                                       

                    <Link onclick={function(){ delItemCompra(idCompra,idProduto)}}                   
                        className="m-auto btn btn-outline-danger">
                            Excluir Item    
                    </Link>

                    <Link to={"/listar-itens-compra/" +idCompra}
                                    className="btn btn-outline-primary">
                            Voltar
                    </Link>
                </Form>

            </Container>
        </div>
    );
};