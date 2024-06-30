import { useEffect, useState } from "react";
import "./App.css"
import Router from "./Router";
import HeaderMain from "./components/HeaderMain";


function App() {
  const [marginTop, setMarginTop] = useState<string>('');

  const verificaRotaCarrinho = (): boolean => (window.location.pathname === "/pedido" ? true : false);

  const verificaRotaLogin = (): boolean => (window.location.pathname === "/usuario/login" ? true : false);

  useEffect(() => {
    if(!verificaRotaLogin()){
      setMarginTop("65px");
    }
  });

  return (
    <div className="body">
      {
        !verificaRotaLogin() &&
          <HeaderMain 
            disabledCarrinho={verificaRotaCarrinho()} 
          />
      }
      <div style={{ marginTop: marginTop }}>
        <Router />
      </div>
    </div>
  );
}

export default App;
