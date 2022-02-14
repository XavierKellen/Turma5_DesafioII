import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { useEffect, useState } from "react";
//import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
//import { Container } from "reactstrap";

import { api } from "../../../config";
import { render } from "@testing-library/react";

export const EditarServico = (props) => {

    const [idServico, setIdServico] = useState(props.match.params.idServico);  
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState(''); 
                  
    const [servico, setServico] = useState({      
        id: idServico,                
        nome: '',
        descricao: ''  
    });   

    const valorInput = e => setServico({
        ...servico,[e.target.name]: e.target.value
    });


    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const edtServico = async e => {
        e.preventDefault();        
        console.log(servico);

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api+"/atualizaservico", servico,{headers})
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
        const getServico = async () =>{
            await axios.get(api+"/buscaservicos/"+idServico)
            .then((response) =>{   
                //console.log(response.data.cliente[0]);    
                setNome(response.data.servico[0].nome);
                setDescricao (response.data.servico[0].descricao);                
                
                servico['nome'] = response.data.servico[0].nome;
                servico['descricao'] = response.data.servico[0].descricao;               
            })
            .catch(() =>{
                setStatus({
                    type: 'error',
                    message: 'Erro: Impossível conectar-se a API.'
                })
            })
        }
        getServico();
    },[idServico]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Serviço</h1>
                    </div>                                    
                    
                    <hr className="m-1"/>
                    {status.type === 'error' ?
                        <Alert color="danger">{status.message} </Alert> : ""}
                    {status.type === 'success' ?
                        <Alert color="success">{status.message}</Alert> : ""}

                </div>
                <Form className="p-2" onSubmit={edtServico}>
                    <FormGroup className="p-2">
                        <Label>Id do Serviço</Label>                    
                        <Input type="text" name="id" placeholder="Id do Serviço" 
                            defaultValue={idServico} disabled />
                    </FormGroup>            

                    <FormGroup className="p-2">
                        <Label>Nome</Label>                    
                        <Input type="text" name="nome" placeholder="Nome do Serviço" 
                            onChange={valorInput} defaultValue={nome}  />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Descrição</Label>                    
                        <Input type="text" name="descricao" placeholder="Descrição do Serviço" 
                             onChange={valorInput} defaultValue={descricao}/>
                    </FormGroup>
                                                                                            
                    <Button type="submit" outline color="success">Alterar</Button>
                    
                    <Link to={"/listar-servicos"}
                                    className="btn btn-outline-primary">
                            Voltar
                    </Link>
                </Form>

            </Container>
        </div>
    );
};