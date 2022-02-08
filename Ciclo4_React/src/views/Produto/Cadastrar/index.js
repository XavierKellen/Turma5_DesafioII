
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { api } from "../../../config";

export const CadastrarProduto = () => {

    const [produto, setProduto] = useState({
        nome: '',
        descricao: ''    
    });

    const[status, setStatus] = useState({
        nome:'',
        message:'',
    });

    const valorInput = e => setProduto({
        ...produto,[e.target.name]: e.target.value
    });

    const cadProduto = async e => {
        e.preventDefault(); //não exibe os parametros na url
        console.log(produto);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api+"/produtos", produto,{headers})
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
                    <h1>Cadastrar Produto</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-produtos" className="btn btn-outline-success btn-sn">Produtos</Link>
                </div>
            </div>
            <hr className="m-1"></hr>

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadProduto}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>                    
                    <Input type="text" name="nome" placeholder="Nome do serviço" onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Descrição</Label>                    
                    <Input type="text" name="descricao" placeholder="Descrição do serviço" onChange={valorInput}/>
                </FormGroup>

                <Button type="submit" outline color="success">Cadastrar</Button>
            </Form>
        </Container>
    );
};