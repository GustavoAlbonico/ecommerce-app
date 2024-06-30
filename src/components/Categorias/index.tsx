import { FC } from "react";
import "./index.css"

const Categorias: FC = () => {
    return <>
      <div className="menu-categorias">
        <ul>
        <div className="line"></div>
          <li><a href="/CARTAS"><img src="\categorias\cartas.png" alt="Botão que leva para a categoria de Cartas" /></a></li>
          <li><a href="/MAGIC"><img src="\categorias\magic.png" alt="Botão que leva para a categoria de Magic" /></a></li>
          <li><a href="/RPG"><img src="\categorias\rpg.png" alt="Botão que leva para a categoria de RPG" /></a></li>
          <li><a href="/TABULEIRO"><img src="\categorias\tabuleiro.png" alt="Botão que leva para a categoria de Tabuleiro" /></a></li>
        </ul>
      </div>
    </>
  }
  
  export default Categorias;