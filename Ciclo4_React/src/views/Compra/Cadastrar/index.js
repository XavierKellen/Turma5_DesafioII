
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
//import Select from 'react-select';
import { Link } from "react-router-dom";
import {useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../config";

export const CadastrarCompra = () => {

    const [data, setData] = useState([]);

    const [compra, setCompra] = useState({        
        data: '',
        ClienteId: ''        
    });

    const[status, setStatus] = useState({
        nome:'',
        message:'',
    });

    const valorInput = e => setCompra({
        ...compra,[e.target.name]: e.target.value
    });    

    const cadCompra = async e => {
        e.preventDefault(); //não exibe os parametros na url
        console.log(compra);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api+"/compras", compra,{headers})
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
                    <h1>Cadastrar Compra</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-compras" className="btn btn-outline-success btn-sn">Compras</Link>
                </div>
            </div>
            <hr className="m-1"></hr>

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadCompra}>
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