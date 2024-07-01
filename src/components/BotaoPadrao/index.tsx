import { Button } from "@mui/material";
import { FC } from "react";

const BotaoPadrao: FC = () => {
  return (
    <>
      <Button
        sx={{
          backgroundColor: "#850d85",
          color: "white",
          border: "1px solid white",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#8d288d",
            border: "1px solid #8d288d",
            fontWeight: "bold",
          },
        }}
      >
        Comprar
      </Button>
    </>
  );
};

export default BotaoPadrao;
