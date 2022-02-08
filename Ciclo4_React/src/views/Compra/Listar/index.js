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

export const ListarCompra = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCompras= async () => {
        await axios.get(api + "/listacompras")
            .then((response) => {
                console.log(response.data.compras);
                setData(response.data.compras);
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
        getCompras();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações das Compras </h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrar-compra"
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
                                    <Link to={"listar-itens-compra/" + item.id}
                                    className="btn btn-outline-primary btn-sm">Consultar Produtos</Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>

            </Container>
        </div>
    );
};
