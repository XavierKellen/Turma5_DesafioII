import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { useEffect, useState } from "react";
//import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
//import { Container } from "reactstrap";

import { api } from "../../../config";
import { render } from "@testing-library/react";

export const EditarCliente = (props) => {

    const [idCliente, setIdCliente] = useState(props.match.params.idCliente);  
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState(''); 
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState(''); 
    const [nascimento, setNascimento] = useState('');          
    
    const [cliente, setCliente] = useState({      
        id: idCliente,                
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: ''    
    });   

    const valorInput = e => setCliente({
        ...cliente,[e.target.name]: e.target.value
    });


    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const edtCliente = async e => {
        e.preventDefault();        
        console.log(cliente);

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api+"/atualizacliente", cliente,{headers})
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
        const getCliente = async () =>{
            await axios.get(api+"/buscaclientes/"+idCliente)
            .then((response) =>{   
                //console.log(response.data.cliente[0]);    
                setNome(response.data.cliente[0].nome);
                setEndereco(response.data.cliente[0].endereco);
                setCidade(response.data.cliente[0].cidade);
                setUf(response.data.cliente[0].uf);
                setNascimento(response.data.cliente[0].nascimento);
                
                cliente['nome'] = response.data.cliente[0].nome;
                cliente['endereco'] = response.data.cliente[0].endereco;
                cliente['cidade'] = response.data.cliente[0].cidade;
                cliente['uf'] = response.data.cliente[0].uf;
                cliente['nascimento'] = response.data.cliente[0].nascimento;
            })
            .catch(() =>{
                setStatus({
                    type: 'error',
                    message: 'Erro: Impossível conectar-se a API.'
                })
            })
        }
        getCliente();
    },[idCliente]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Cliente</h1>
                    </div>                                    
                    
                    <hr className="m-1"/>
                    {status.type === 'error' ?
                        <Alert color="danger">{status.message} </Alert> : ""}
                    {status.type === 'success' ?
                        <Alert color="success">{status.message}</Alert> : ""}

                </div>
                <Form className="p-2" onSubmit={edtCliente}>
                    <FormGroup className="p-2">
                        <Label>Id do Cliente</Label>                    
                        <Input type="text" name="id" placeholder="Id do Cliente" 
                            defaultValue={idCliente} disabled />
                    </FormGroup>            

                    <FormGroup className="p-2">
                        <Label>Nome</Label>                    
                        <Input type="text" name="nome" placeholder="Nome do Cliente" 
                            onChange={valorInput} defaultValue={nome}  />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Endereco</Label>                    
                        <Input type="text" name="endereco" placeholder="Endereco do Cliente" 
                             onChange={valorInput} defaultValue={endereco}/>
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Cidade</Label>                    
                        <Input type="text" name="cidade" placeholder="Cidade" 
                              onChange={valorInput} defaultValue={cidade}/>
                    </FormGroup> 

                    <FormGroup className="p-2">
                        <Label>UF</Label>                    
                        <Input type="text" name="uf" placeholder="Estado" 
                              onChange={valorInput} defaultValue={uf}/>
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Data de Nascimento</Label>                    
                        <Input type="date" name="nascimento" placeholder="Data de Nascimento" 
                              onChange={valorInput} defaultValue={nascimento}/>
                    </FormGroup>                                   

                    <Button type="submit" outline color="success">Alterar</Button>
                    
                    <Link to={"/listar-cliente"}
                                    className="btn btn-outline-primary">
                            Voltar
                    </Link>
                </Form>

            </Container>
        </div>
    );
};