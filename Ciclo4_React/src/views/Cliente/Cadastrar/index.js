
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { api } from "../../../config";

export const CadastrarCliente = () => {

    const [cliente, setCliente] = useState({
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: '',
        clienteDesde: ''    
    });

    const[status, setStatus] = useState({
        nome:'',
        message:'',
    });

    const valorInput = e => setCliente({
        ...cliente,[e.target.name]: e.target.value
    });

    const cadCliente = async e => {
        e.preventDefault(); //não exibe os parametros na url
        console.log(cliente);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api+"/clientes", cliente,{headers})
        .then((response)=>{
            //console.log(response.data.message);
            if (response.data.error){
                setStatus({
                    type: 'error',
                    messsage: response.data.message
                });
            }else{
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
            }
        })
        .catch(()=>{
            console.log("Erro: Sem conexão com a API.")
        })
    }

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Cliente</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente" className="btn btn-outline-success btn-sn">Clientes</Link>
                </div>
            </div>
            <hr className="m-1"></hr>

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadCliente}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>                    
                    <Input type="text" name="nome" placeholder="Nome do Cliente" onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Endereço</Label>                    
                    <Input type="text" name="endereco" placeholder="Descrição do Endereço" onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Cidade</Label>                    
                    <Input type="text" name="cidade" placeholder="Descrição da Cidade" onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>UF</Label>                    
                    <Input type="text" name="uf" placeholder="Estado" onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Nascimento</Label>                    
                    <Input type="date" name="nascimento" onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Cliente Desde</Label>                    
                    <Input type="date" name="clienteDesde" onChange={valorInput}/>
                </FormGroup>

                <Button type="submit" outline color="success">Cadastrar</Button>
            </Form>
        </Container>
    );
};