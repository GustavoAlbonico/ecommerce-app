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
          backgroundColor: "#850d85",
          color: "white",
          height: 39,
          width: 150,
          border: "1px solid white",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#8d288d",
            border: "1px solid #8d288d",
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
