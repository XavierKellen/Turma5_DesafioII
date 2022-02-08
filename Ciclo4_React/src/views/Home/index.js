import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <h1>Home</h1>
                </div>
                <div className="p-2">
                    <a href="/listar-cliente" className="btn btn-outline-success btn-sm">Cliente</a>
                    <a href="/listar-pedidos" className="btn btn-outline-success btn-sm">Pedido</a>
                    <a href="/listar-servicos" className="btn btn-outline-success btn-sm">Servico</a>

                    <a href="/listar-compras" className="btn btn-outline-success btn-sm">Compra</a>
                    <a href="/listar-produtos" className="btn btn-outline-success btn-sm">Produto</a>
                </div>

            </Container>
        </div>
    );
};