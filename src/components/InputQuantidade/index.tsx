import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { FC } from "react";
import "./index.css";

interface InputQuantidadeProperties {
    quantidade: number,
    onChange: (quantidade: number) => void;
}

const InputQuantidade: FC<InputQuantidadeProperties> = ({
    quantidade,
    onChange
}) => {
    return <>
        <div className="div-input-quantidade">
            <Box className="box">
                <IconButton
                    className="remover-quantidade"
                    size="small"
                    onClick={(event) => {
                        const qtde = quantidade - 1;

                        if(qtde){
                            onChange(qtde);
                        }
                    }}
                    >
                    <Remove />            
                </IconButton>
                <TextField
                    className="input-quantidade"
                    margin="normal"
                    type="number"
                    size="small"
                    value={quantidade}
                    onChange={(event) => {
                        const quantidade = Number(event.target.value);

                        if(quantidade){
                            onChange(quantidade);
                        }
                    }} />
                <IconButton 
                    className="add-quantidade"
                    size="small"
                    onClick={(event) => {
                        const qtde = quantidade + 1;

                        if(qtde){
                            onChange(qtde);
                        }
                    }}>
                    <Add />
                </IconButton>
            </Box>
        </div>
    </>
}

export default InputQuantidade;