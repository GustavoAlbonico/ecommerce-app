import Categorias from "./components/Categorias";
import "./App.css"
import Router from "./Router";
import Carousel from "./components/Carousel/inde";
import ShapeDivider from "./components/ShapeDivider";
import CardOferta from "./components/CardOferta";



function App() {
  return (
    <div className="body">
      <div className="header">
        <div className="logo-header">
        <img src="/pandora_title.png" alt="" />
        </div>
        <Carousel />
        <ShapeDivider />
        <Categorias />
        <CardOferta />
      </div>
      <Router />
    </div>
  );
}

export default App;
