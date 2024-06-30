import "./App.css"
import Router from "./Router";
import HeaderMain from "./components/HeaderMain";


function App() {

  const verificaRota = (): boolean => (window.location.pathname === "/pedido" ? true : false);

  return (
    <div className="body">
      <HeaderMain disabledCarrinho={verificaRota()} />
      <div style={{marginTop:"65px"}}>
        <Router />
      </div>
    </div>
  );
}

export default App;
