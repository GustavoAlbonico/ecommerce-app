import { FC, useEffect, useState } from "react";
import "./index.css";
import InputQuantidade from "../../components/InputQuantidade";
import { useParams } from "react-router-dom";
import { IProdutoDetalhe } from "./types";
import { ICarrinhoStore } from "../../store/CarrinhoStore/types";
import { STATUS_CODE, apiGet } from "../../api/RestClient";
import ConfirmarModal from "../../components/ConfirmarModal";
import { atualizaItensCarrinhoStore, buscaItensCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import BotaoDetalhes from "../../components/BotaoDetalhes";

const DetalheProduto: FC = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState<IProdutoDetalhe>();
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const carrinho:ICarrinhoStore[] = buscaItensCarrinho();

  useEffect(() => {
      
      apiGet(`/produto/carregar/${id}`).then((response) => {
          if(response.status === STATUS_CODE.OK){
              
              setProduto(response.data);

              const carrinhoItem 
                  = carrinho.find((c: ICarrinhoStore) => c.id === response.data.id);

              if(carrinhoItem){
                  setQuantidadeProduto(carrinhoItem.quantidade);
              }
          }
      });
  
  }, []);

  useEffect(() => {
    apiGet(`produto/carregar/${id}`).then((response) => {
      if (response.status === STATUS_CODE.OK) {
        setProduto(response.data);
      }
    });
  }, []);

  const transformaValorReais = (valorUnitario: number): string => {
    return Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' }).format(valorUnitario)
}


  return (
    <>
      <section className="detalhes-produto-section">
        <img src={`/produtos/${produto?.imagem}`} alt="" />
        <div className="detalhes-produto-body">
          <h3 className="detalhes-produto-title">{produto?.nome}</h3>
          <p className="detalhes-produto-descricao">{produto?.descricao}</p>
          <div className="detalhes-produto-card-info">
            <div className="detalhes-produto-info">
              <span>Classificação indicativa</span>
              <span>{produto?.classificacaoIndicativa}</span>
            </div>
            <div className="detalhes-produto-info">
              <span>Nº de jogadores</span>
              <span>{produto?.numeroJogadores}</span>
            </div>
          </div>
          <p className="detalhe-produto-preco">{transformaValorReais(produto?.valorUnitario || 0)}</p>
          <div className="detalhe-produto-quantidade-botao">
          <InputQuantidade
            quantidade={quantidadeProduto || 0}
            onChange={(quantidade: number) => {

              if(quantidade > (produto?.quantidadeEstoque || 0)) return;

              setQuantidadeProduto(quantidade);
            }}
          />
          <BotaoDetalhes label="Comprar"
                                onClick={() => { 
                                   setOpenModal(true);
                                }} />
          </div>
        </div>
      </section>

      <ConfirmarModal
            open={openModal} 
            titulo=" "
            mensagem="Tem certeza que deseja adicionar produto no carrinho?"
            onCancelar={() => {
                setOpenModal(false);
            }}
            onConfirmar={() => {
                if(produto){
                    const carrinhoItem: ICarrinhoStore = 
                        {...produto, quantidade: quantidadeProduto || 0}

                    atualizaItensCarrinhoStore(carrinhoItem);

                    window.location.href = "/home";
                }

                setOpenModal(false);
            }}/>
    </>
  );
};

export default DetalheProduto;
