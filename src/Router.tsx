import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const Router: FC = () => {
  
    return(
        <BrowserRouter>
          <Routes>
               <Route path="/home" element={<Home />}/>
               <Route path="/" element={<Home />}/>
            
           </Routes>
        </BrowserRouter>

    )
   
  }
  
  export default Router;