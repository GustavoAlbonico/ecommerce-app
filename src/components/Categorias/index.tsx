import { FC } from "react";
import "./index.css"

const Categorias: FC = () => {
    return <>
      <div className="menu-categorias">
        <ul>
        <div className="line"></div>
          <li><a href="/cartas"><img src="\categorias\cartas.png" alt="Botão que leva para a categoria de Cartas" /></a></li>
          <li><a href="/magic"><img src="\categorias\magic.png" alt="Botão que leva para a categoria de Magic" /></a></li>
          <li><a href="/rpg"><img src="\categorias\rpg.png" alt="Botão que leva para a categoria de RPG" /></a></li>
          <li><a href="/tabuleiro"><img src="\categorias\tabuleiro.png" alt="Botão que leva para a categoria de Tabuleiro" /></a></li>
        </ul>
      </div>
    </>
  }
  
  export default Categorias;