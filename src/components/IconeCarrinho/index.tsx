import React, { FC } from "react";
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import "./IconeCarrinho.css";

interface IconeCarrinhoProps {
  itemCount: number;
}

const IconeCarrinho: FC<IconeCarrinhoProps> = ({ itemCount }) => {
  return (
    <div className="container-cart">
      <Badge badgeContent={itemCount} color="primary">
        <ShoppingCart color="primary" sx={{ fontSize: 40 }} />
      </Badge>
    </div>
  );
};

export default IconeCarrinho;
