import Categorias from "./components/Categorias";
import "./App.css"
import Router from "./Router";
import Carousel from "./components/Carousel/inde";
import ShapeDivider from "./components/ShapeDivider";



function App() {
  return (
    <div className="body">
      <div className="header">
        <div className="logo-header">
        <a href="/home"><img src="/pandora_title.png" alt="" /></a>
        </div>
        <Carousel />
        <ShapeDivider />
        <Categorias />
      </div>
      <Router />
    </div>
  );
}

export default App;
