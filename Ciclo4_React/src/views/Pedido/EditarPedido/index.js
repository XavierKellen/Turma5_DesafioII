import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

import { useEffect, useState } from "react";
//import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
//import { Container } from "reactstrap";

import { api } from "../../../config";

export const EditarPedido = (props) => {

    const [idPedido, setIdPedido] = useState(props.match.params.idPedido);
    const [idServico, setIdServico] = useState(props.match.params.idServico);      
    //const [PedidoId, setPedidoId] = useState('');
    //const [ServicoId, setServicoId] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    
    const [servico, setServico] = useState({      
        PedidoId: idPedido,
        ServicoId: idServico,
        quantidade: '',
        valor: ''    
    });   

    const valorInput = e => setServico({
        ...servico,[e.target.name]: e.target.value
    });


    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const edtPedido = async e => {
        e.preventDefault();        
        console.log(servico);

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api+"/pedidos/"+idPedido+"/editaritem", servico,{headers})
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

    useEffect(() => {
        const getItemPedido = async () =>{
            await axios.get(api+"/itempedido/"+idPedido+"/"+idServico)
            .then((response) =>{               
                setQuantidade(response.data.item[0].quantidade);                
                setValor(response.data.item[0].valor);                
                
                servico['quantidade'] = response.data.item[0].quantidade;
                servico['valor'] = response.data.item[0].valor;
            })
            .catch(() =>{
                setStatus({
                    type: 'error',
                    message: 'Erro: Impossível conectar-se a API.'
                })
            })
        }
        getItemPedido();
    },[idPedido, idServico]);

   

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Item do Pedido</h1>
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
                <Form className="p-2" onSubmit={edtPedido}>
                    <FormGroup className="p-2">
                        <Label>Id do Pedido</Label>                    
                        <Input type="text" name="PedidoId" placeholder="Id do Pedido" 
                            defaultValue={idPedido} disabled />
                    </FormGroup>            

                    <FormGroup className="p-2">
                        <Label>Id do Serviço</Label>                    
                        <Input type="text" name="ServicoId" placeholder="Id do Serviço" 
                            defaultValue={idServico} disabled />
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
                    
                    <Link to={"/listar-itens-pedido/" +idPedido}
                                    className="btn btn-outline-primary">
                            Voltar
                    </Link>
                </Form>

            </Container>
        </div>
    );
};