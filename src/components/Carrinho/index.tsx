import { Close, ShoppingCart } from "@mui/icons-material";
import { FC, useEffect, useState } from "react";
import "./index.css"
import { Badge, Box, Button, Drawer, Typography } from "@mui/material";
import { atualizaItensCarrinhoStore, buscaItensCarrinho, obterQuantidadeCarrinho, removeItemCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import { ICarrinhoStore } from "../../store/CarrinhoStore/types";
import InputQuantidade from "../InputQuantidade";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { color } from "html2canvas/dist/types/css/types/color";
const Carrinho: FC = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [carrinho, setCarrinho] = useState<ICarrinhoStore[]>(buscaItensCarrinho);
    const [valorTotal, setValorTotal] = useState<string>();

    const atualizarQuantidadeCarrinho = (item: ICarrinhoStore) => {
        const carrinhoAtualizado = atualizaItensCarrinhoStore(item);

        setCarrinho(carrinhoAtualizado);
    }

    const transformaValorReais = (valorUnitario: number): string => {
        return Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' }).format(valorUnitario)
    }

    const removerItemDoCarrinho = (id: number) => {
        const carrinhoAtualizado = removeItemCarrinho(id);

        setCarrinho(carrinhoAtualizado);
    }

    const calculaValorTotal = () => {
        const listaCarrinho: ICarrinhoStore[] = buscaItensCarrinho();

        let somaTotal: number = 0;

        listaCarrinho.forEach((carrinho: ICarrinhoStore) => {
            somaTotal += carrinho.quantidade * carrinho.valorUnitario;
        });

        setValorTotal(Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' }).format(somaTotal));
    }

    const redirecionamento = () => window.location.href = '/pedido';

    useEffect(() => {
        setCarrinho(buscaItensCarrinho());
    }, [])

    return <>
        <div
            className="carrinho"
            onClick={() => {
                calculaValorTotal();
                setOpenDrawer(true);
            }}
        >
            <Badge
                badgeContent={obterQuantidadeCarrinho()}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}>
                <ShoppingCart sx={{ color: "#803EA0", fontSize: "34px" }} />
            </Badge>
        </div>
        <Drawer
            open={openDrawer}
            anchor="right"
            classes={{ // ele esperar um objeto java
                paper: "tamanho-paper-drawer"
            }}
        >
            <Box
                margin={"0 10px 15px 10px"}
            >
                <Button
                    sx={{ color: "#803EA0" }}
                    variant="text"
                    startIcon={<Close sx={{ color: "#803EA0" }} />}
                    onClick={() => {
                        setOpenDrawer(false);
                    }}
                >
                    Fechar
                </Button>
            </Box>
            <Box
                marginRight={"10px"}
                marginLeft={"10px"}
            >
                {!carrinho?.length && <>
                    <div className="carrinho-vazio">
                        <Box>
                            <Typography sx={{fontSize: "14px", fontWeight: "bolder"}} variant="body1">
                                Seu Carrinho está vazio.
                            </Typography>
                        </Box>
                        <img src="/carrinho-vazio.svg" />
                    </div>
                </>}
                {carrinho?.map((item: ICarrinhoStore) => {
                    return <>
                        <div className="card-carrinho">
                            <img src={window.origin + "/produtos/" + item.imagem} alt={item.nome} />
                            <p id="nomeProduto" title={item.nome}>{item.nome}</p>
                            <p>{transformaValorReais(item.valorUnitario)}</p>
                            <div>
                                <InputQuantidade
                                    quantidade={item.quantidade}
                                    onChange={(quantidade: number) => {
                                        const carrinhoAtualizado: ICarrinhoStore = {
                                            ...item,
                                            quantidade: quantidade,
                                        }
                                        atualizarQuantidadeCarrinho(carrinhoAtualizado);
                                        calculaValorTotal();
                                    }}
                                />
                            </div>
                            <RemoveShoppingCartIcon
                                onClick={() => {
                                    removerItemDoCarrinho(item.id);
                                    calculaValorTotal();
                                }}
                                sx={{ color: "#d32f2f", cursor: "pointer" }}
                            />
                        </div>
                    </>
                })}
            </Box>
            <div className="carrinho-footer">
                <h3>Total: {valorTotal}</h3>
                <Button
                    sx={{
                        backgroundColor: '#803EA0',
                        color: 'white',
                        opacity: "0.9",
                        '&:hover': {
                            backgroundColor: '#803EA0',
                            opacity: "1",
                        }
                    }}
                    variant="contained"
                    onClick={redirecionamento}
                >
                    Finalizar Compra
                </Button>
            </div>
        </Drawer>
    </>
}

export default Carrinho;