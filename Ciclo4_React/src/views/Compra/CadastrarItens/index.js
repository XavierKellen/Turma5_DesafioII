
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
//import Select from 'react-select';
import { Link } from "react-router-dom";
import {useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../config";

export const CadastrarItemCompra = () => {

    const [data, setData] = useState([]);

    const [itemcompra, setItemCompra] = useState({         
        CompraId: '',
        ProdutoId: '',
        quantidade: '',
        valor: ''      
    });   

    const[status, setStatus] = useState({
        nome:'',
        message:'',
    });

    const valorInput = e => setItemCompra({
        ...itemcompra,[e.target.name]: e.target.value
    });    

    const cadItemCompra = async e => {
        e.preventDefault(); //não exibe os parametros na url
        console.log(itemcompra);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api+"/itemcompras", itemcompra,{headers})
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
                    <h1>Cadastrar Item da Compra</h1>
                </div>                
            </div>
            <hr className="m-1"></hr>

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
           
            <Form className="p-2" onSubmit={cadItemCompra}>
                <FormGroup className="p-2">
                    <Label>Id Compra</Label>
                    <Input type="text" name="CompraId" onChange={valorInput}/>                                    
                </FormGroup>
                
                <FormGroup className="p-2">
                    <Label>Id do Produto</Label>                    
                    <Input type="text" name="ProdutoId" onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Quantidade</Label>                    
                    <Input type="text" name="quantidade" onChange={valorInput}/>
                </FormGroup> 

                <FormGroup className="p-2">
                    <Label>Valor</Label>                    
                    <Input type="number" name="valor" onChange={valorInput}/>
                </FormGroup>  
                        
                <Button type="submit" outline color="success">Cadastrar</Button>
            </Form>
        </Container>
    );
};