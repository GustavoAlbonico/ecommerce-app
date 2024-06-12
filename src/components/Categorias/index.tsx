import { FC } from "react";
import "./index.css"

const Categorias: FC = () => {
    return <>
      <div className="menu">
        <ul>
          <li><a href="/cartas"><img src="http://localhost:3000/1.png" alt="" /></a></li>
          <li><a href="/magic"><img src="http://localhost:3000/1.png" alt="" /></a></li>
          <li><a href="/rpg"><img src="http://localhost:3000/1.png" alt="" /></a></li>
          <li><a href="/tabuleiro"><img src="http://localhost:3000/1.png" alt="" /></a></li>
        </ul>
      </div>
    </>
  }
  
  export default Categorias;