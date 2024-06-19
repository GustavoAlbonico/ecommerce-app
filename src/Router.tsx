import React from 'react';
import IconeCarrinho from './IconeCarrinho';
import Magic from "./pages/Magic";
import RPG from "./pages/RPG";
import Cartas from "./pages/Cartas";
import Tabuleiro from "./pages/Tabuleiro";

const App: React.FC = () => {
  const itemCount = 5; // Exemplo de número de itens no carrinho

  return (
    <div>
      <h1>Meu Sistema</h1>
      <IconeCarrinho itemCount={itemCount} />
    </div>
  );
}

export default App;
 