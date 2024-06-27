import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MinhaConta from "./pages/MinhaConta";
import HistoricoCompras from "./pages/HistoricoCompras";
import Cliente from "./pages/Cliente";
import Endereco from "./pages/Endereco";
import FinalizaCompra from "./pages/FinalizaCompra";
import DetalheProduto from "./pages/DetalheProduto";

const Router: FC = () => {
  
    return(
        <BrowserRouter>
          <Routes>
               <Route path="/home" element={<Home />}/>
               <Route path="/" element={<Home />}/>
               <Route path="/detalhes" element={<DetalheProduto />}/>
               <Route path="/usuario/minhaconta" element={<MinhaConta/>}/>
               <Route path="/usuario/pedidos" element={<HistoricoCompras/>}/>
               <Route path="/usuario/editar" element={<Cliente/>}/>
               <Route path="/usuario/endereco/editar" element={<Endereco acao="Editar"/>}/>
               <Route path="/usuario/endereco/adicionar" element={<Endereco acao="Adicionar"/>}/>
               <Route path="/pedido" element={<FinalizaCompra/>}/>
            
           </Routes>
        </BrowserRouter>

    )
   
  }
  
  export default Router;