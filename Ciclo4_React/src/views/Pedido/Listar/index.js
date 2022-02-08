/*export const ListarPedido = () =>{
    return(
        <div>Listar pedidos</div>
    );
};*/

import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "react-bootstrap/lib/Breadcrumb";
import { Link } from "react-router-dom";
import { Alert, Container } from "reactstrap";
import { Table } from "reactstrap";

import { api } from "../../../config";

export const ListarPedido = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidos= async () => {
        await axios.get(api + "/listapedidos")
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
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações dos Pedidos </h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrar-pedido"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>

                    {status.type == 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>Cliente ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.data}</td>
                                <td>{item.ClienteId}</td>

                                <td className="text-center/">
                                    <Link to={"listar-itens-pedido/" + item.id}
                                    className="btn btn-outline-primary btn-sm">Consultar Itens</Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>

            </Container>
        </div>
    );
};
