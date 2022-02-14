import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { Home } from './views/Home'
import { ListarCliente } from './views/Cliente/Listar/';
import { ListarPedido } from './views/Pedido/Listar/';
import { ListarServico } from './views/Servico/Listar/';
import { Menu } from './Components/Menu';
import { PedidosServico } from './views/Servico/Item';
import { Cadastrar } from './views/Servico/Cadastrar';
import { PedidosCliente } from './views/Cliente/Pedido';
import { CadastrarCliente } from './views/Cliente/Cadastrar';
import { ItensPedido } from './views/Pedido/Item';
import { CadastrarPedido }  from './views/Pedido/Cadastrar/';
import { CadastrarItemPedido } from './views/Pedido/CadastrarItens/'; 
import { ListarCompra } from './views/Compra/Listar/';
import { CadastrarCompra } from './views/Compra/Cadastrar/';
import { ListarProduto } from './views/Produto/Listar/';
import { CadastrarProduto } from './views/Produto/Cadastrar/';
import { ComprasProduto } from './views/Produto/Item/';
import { CadastrarItemCompra } from './views/Compra/CadastrarItens/';
import { ItensCompra } from './views/Compra/Item/';
import { EditarPedido } from './views/Pedido/EditarPedido/';
import { EditarCompra } from './views/Compra/EditarCompra/';
import { EditarCliente } from './views/Cliente/EditarCliente/';
import { EditarServico } from './views/Servico/EditarServico/';
import { EditarProduto } from './views/Produto/EditarProduto/';
 
function App() {
  return (
    <div>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path = "/listar-cliente" component={ListarCliente}></Route>
          <Route path = "/listar-pedidos" component={ListarPedido}></Route>
          <Route path = "/listar-servicos" component={ListarServico}></Route>
          <Route path = "/listar-pedido/:id" component={PedidosServico}/>
          <Route path="/listar-cliente-pedido/:id" component={PedidosCliente}/>
          <Route path = "/cadastrarservico" component = {Cadastrar} ></Route>
          <Route path="/cadastrarcliente" component={CadastrarCliente}></Route>
          <Route path="/listar-itens-pedido/:id" component={ItensPedido}></Route>
          <Route path="/cadastrar-pedido" component={CadastrarPedido}></Route>
          <Route path="/cadastar-item-pedido/:idPedido" component={CadastrarItemPedido}></Route>
          <Route path="/listar-compras" component={ListarCompra}></Route>
          <Route path="/cadastrar-compra" component={CadastrarCompra}></Route>
          <Route path="/listar-produtos" component={ListarProduto}></Route>
          <Route path="/cadastrar-produto" component={CadastrarProduto}></Route>
          <Route path="/listar-compra/:id" component={ComprasProduto}></Route>
          <Route path="/cadastrar-item-compra" component={CadastrarItemCompra}></Route>
          <Route path="/listar-itens-compra/:id" component={ItensCompra}></Route>
          <Route path="/editar-item-pedido/:idPedido/:idServico" component={EditarPedido}></Route>          
          <Route path="/editar-item-compra/:idCompra/:idProduto" component={EditarCompra}></Route>
          <Route path="/editar-cliente/:idCliente" component={EditarCliente}></Route>
          <Route path="/editar-servico/:idServico" component={EditarServico}></Route>
          <Route path="/editar-produto/:idProduto" component={EditarProduto}></Route>
        </Switch>
      </Router>


    </div>
  );
}

export default App;
