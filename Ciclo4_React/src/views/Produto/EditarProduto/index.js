import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { useEffect, useState } from "react";
//import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
//import { Container } from "reactstrap";

import { api } from "../../../config";
import { render } from "@testing-library/react";

export const EditarProduto = (props) => {

    const [idProduto, setIdProduto] = useState(props.match.params.idProduto);  
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState(''); 
                  
    const [produto, setProduto] = useState({      
        id: idProduto,                
        nome: '',
        descricao: ''  
    });   

    const valorInput = e => setProduto({
        ...produto,[e.target.name]: e.target.value
    });


    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const edtProduto = async e => {
        e.preventDefault();        
        console.log(produto);

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api+"/atualizaproduto", produto,{headers})
        .then((response) => {
            setStatus({
                type: 'success',
                message: 'Alteração realizada com sucesso'
            })
            //return <render to={"/listar-cliente"}/> 
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: Não foi possível realizar a alteração'
            })    
        })
    };

    useEffect(() => {
        const getProduto = async () =>{
            await axios.get(api+"/buscaprodutos/"+idProduto)
            .then((response) =>{   
                //console.log(response.data.cliente[0]);    
                setNome(response.data.produto[0].nome);
                setDescricao (response.data.produto[0].descricao);                
                
                produto['nome'] = response.data.produto[0].nome;
                produto['descricao'] = response.data.produto[0].descricao;               
            })
            .catch(() =>{
                setStatus({
                    type: 'error',
                    message: 'Erro: Impossível conectar-se a API.'
                })
            })
        }
        getProduto();
    },[idProduto]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Produto</h1>
                    </div>                                    
                    
                    <hr className="m-1"/>
                    {status.type === 'error' ?
                        <Alert color="danger">{status.message} </Alert> : ""}
                    {status.type === 'success' ?
                        <Alert color="success">{status.message}</Alert> : ""}

                </div>
                <Form className="p-2" onSubmit={edtProduto}>
                    <FormGroup className="p-2">
                        <Label>Id do Produto</Label>                    
                        <Input type="text" name="id" placeholder="Id do Produto" 
                            defaultValue={idProduto} disabled />
                    </FormGroup>            

                    <FormGroup className="p-2">
                        <Label>Nome</Label>                    
                        <Input type="text" name="nome" placeholder="Nome do Produto" 
                            onChange={valorInput} defaultValue={nome}  />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Descrição</Label>                    
                        <Input type="text" name="descricao" placeholder="Descrição do Produto" 
                             onChange={valorInput} defaultValue={descricao}/>
                    </FormGroup>
                                                                                            
                    <Button type="submit" outline color="success">Alterar</Button>
                    
                    <Link to={"/listar-produtos"}
                                    className="btn btn-outline-primary">
                            Voltar
                    </Link>
                </Form>

            </Container>
        </div>
    );
};