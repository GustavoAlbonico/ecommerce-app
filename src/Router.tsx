import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DetalheProduto from "./pages/DetalheProduto";

const Router: FC = () => {
  
    return(
        <BrowserRouter>
          <Routes>
               <Route path="/home" element={<Home />}/>
               <Route path="/" element={<Home />}/>
               <Route path="/detalhes" element={<DetalheProduto />}/> 
           </Routes>
        </BrowserRouter>

    )
   
  }
  
  export default Router;