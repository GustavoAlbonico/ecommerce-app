import { Button } from "@mui/material";
import { FC } from "react";

const BotaoPadrao: FC = () => {
  return (
    <>
      <Button
        sx={{
          backgroundColor: "purple",
          color: "white",
          border: "1px solid white",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#862886",
            border: "1px solid #862886",
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
