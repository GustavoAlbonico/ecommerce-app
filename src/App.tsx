import Categorias from "./components/Categorias";
import Banner from "./components/BannerInicio/inde";
import "./App.css"
import Router from "./Router";

function App() {
  return (
    <div className="body">
      <div className="header">
        <div className="logo-header">
        <img src="/pandora_title_purple.png" alt="" />
        </div>
        <Banner />
        <div className="info">
          <span>Segurança na Compra</span>
          <span>Entrega em todo Brasil</span>
          <span>Diversas formas de pagamento</span>
          <span>Cashback</span>
        </div>
        <Categorias />
      </div>
      <Router />
    </div>
  );
}

export default App;
