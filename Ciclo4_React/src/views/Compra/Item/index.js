import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "react-bootstrap/lib/Breadcrumb";
import { Link } from "react-router-dom";
import { Alert, Container } from "reactstrap";
import { Table } from "reactstrap";

import { api } from "../../../config";

export const ItensCompra = (props) => {
    //console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(api + "/compra/"+id+"/itens")
        .then((response) => {
                console.log(response.data.item);
                setData(response.data.item);
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
        getItens();
    }, [id]);

    return (
        <div>
            <Container>
                <div>
                    <h1>Itens da Compra</h1>
                </div>
                <div className="m-auto p-2">
                    <Link to="/cadastrar-item-compra"
                        className="btn btn-outline-primary btn-sm">Cadastrar Itens</Link>
                </div>
                {status.type == 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                
                <Table striped>
                    <thead>
                        <tr>
                            <th>Compra</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Valor</th>                           
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.CompraId}>
                                <td>{item.CompraId}</td>
                                <td>{item.ProdutoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>  

                                <td className="text-center/">
                                    <Link to={"/editar-item-compra/"+item.CompraId+"/"+item.ProdutoId}
                                    className="btn btn-outline-primary btn-sm">Alterar Item</Link>
                                </td>                                 
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};