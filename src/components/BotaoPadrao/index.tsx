import { Button } from "@mui/material";
import { FC } from "react";

const BotaoPadrao: FC = () => {
    return <>
      <Button sx={{
        backgroundColor: 'purple',
        color: 'white'
      }}>Comprar</Button>
    </>
  }
  
  export default BotaoPadrao;