import { FC } from "react";
import "./index.css";
import { Button } from "@mui/material";

interface BotaoPadraoProperties {
  label: string;
  onClick: () => void;
}

const BotaoDetalhes: FC<BotaoPadraoProperties> = ({ label, onClick }) => {
  return (
    <>
      <Button
        sx={{
          backgroundColor: "purple",
          color: "white",
          height: 39,
          width: 150,
          border: "1px solid white",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#862886",
            border: "1px solid #862886",
            fontWeight: "bold",
          },
        }}
        onClick={onClick}
      >
        {label}
      </Button>
    </>
  );
};

export default BotaoDetalhes;
