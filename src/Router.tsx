import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Magic from "./pages/Magic";
import RPG from "./pages/RPG";
import Cartas from "./pages/Cartas";
import Tabuleiro from "./pages/Tabuleiro";

const Router: FC = () => {
  
    return(
        <BrowserRouter>
          <Routes>
               <Route path="/home" element={<Home />}/>
               <Route path="/" element={<Home />}/>
               <Route path="/cartas" element={<Cartas />}/>
               <Route path="/magic" element={<Magic />}/>
               <Route path="/rpg" element={<RPG />}/>
               <Route path="/tabuleiro" element={<Tabuleiro />}/>
            
           </Routes>
        </BrowserRouter>

    )
   
  }
  
  export default Router;