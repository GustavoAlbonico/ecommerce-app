import { FC, useEffect, useState } from "react"
import { buscaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore";
import { STATUS_CODE, apiGet } from "../../api/RestClient";

const PedidoEndereco: FC = () => {
  const [cliente, setCliente] = useState<ICliente>();
  const [usuarioSessaoNome, setUsuarioSessaoNome] = useState<string>("Usuário");

  const carregarCliente = async () => {

      const usuarioSessao = buscaUsuarioSessao();
      
      if(usuarioSessao.login){

          setUsuarioSessaoNome(usuarioSessao.login);

          const response = await apiGet(`cliente/carregar/usuario/${usuarioSessao.id}`);
  
          if (response.status === STATUS_CODE.OK) {
              setCliente(response.data[0]);
          }
      }
  }

  useEffect(() => {
      carregarCliente();
  }, []);
  return <>

  pedido endereco funciona

  </>
}

export default PedidoEndereco;