import React from 'react';
import IconeCarrinho from './IconeCarrinho';

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
 