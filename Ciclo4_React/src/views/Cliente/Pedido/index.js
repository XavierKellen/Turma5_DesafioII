import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "react-bootstrap/lib/Breadcrumb";
import { Link } from "react-router-dom";
import { Alert, Container } from "reactstrap";
import { Table } from "reactstrap";

import { api } from "../../../config";

export const PedidosCliente = (props) => {
    //console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidos = async () => {
        await axios.get(api + "/cliente/"+id+"/pedidos")
        .then((response) => {
                console.log(response.data.pedidos);
                setData(response.data.pedidos);
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
        getPedidos();
    }, [id]);

    return (
        <div>
            <Container>
                <div>
                    <h1>Pedidos dos Clientes </h1>
                </div>
                {status.type == 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(pedidos => (
                            <tr key={pedidos.id}>
                                <td>{pedidos.id}</td>
                                <td>{pedidos.data}</td>                                                                
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Container>
        </div>
    );
};