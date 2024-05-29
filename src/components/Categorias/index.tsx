import { FC } from "react";

const MenuBar: FC = () => {
    return <>
      <div className="menu">
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/produtos">Produtos</a></li>
          <li><a href="/sobre">Sobre</a></li>
        </ul>
      </div>
    </>
  }
  
  export default MenuBar;