
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
//import Select from 'react-select';
import { Link } from "react-router-dom";
import {useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../config";

export const CadastrarPedido = () => {

    const [data, setData] = useState([]);

    const [pedido, setPedido] = useState({        
        data: '',
        ClienteId: ''        
    });

    const[status, setStatus] = useState({
        nome:'',
        message:'',
    });

    const valorInput = e => setPedido({
        ...pedido,[e.target.name]: e.target.value
    });

    const getClientes = async () => {
        await axios.get(api + "/listaclientes")
            .then((response) => {
                console.log(response.data.clientes);
                setData(response.data.clientes);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log("Erro: sem conexão com a API.")
            })
    }

    useEffect(() => {
        getClientes();
    }, []);

    const cadPedido = async e => {
        e.preventDefault(); //não exibe os parametros na url
        console.log(pedido);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api+"/pedidos", pedido,{headers})
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
                    <h1>Cadastrar Pedido</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-pedidos" className="btn btn-outline-success btn-sn">Pedidos</Link>
                </div>
            </div>
            <hr className="m-1"></hr>

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadPedido}>
                <FormGroup className="p-2">
                    <Label>Cliente</Label>
                    <Input type="text" name="ClienteId" onChange={valorInput}/>                                    
                </FormGroup>
                
                <FormGroup className="p-2">
                    <Label>Data</Label>                    
                    <Input type="date" name="data" onChange={valorInput}/>
                </FormGroup>               

                <Button type="submit" outline color="success">Cadastrar</Button>
            </Form>
        </Container>
    );
};