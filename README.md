# ecommerce-app
**Front-End do projeto Ecommerce relacionado a matéria de desenvolvimento web 4ª fase ADS**
**Ecommerce de Jogos**

**Equipe:**
Barbara [linkedin](https://www.linkedin.com/in/barbara-stefani-d-b052b1140/), 
Gustavo [linkedin](https://www.linkedin.com/in/gustavo-albonico-goncalves/), 
Julia  [linkedin](https://www.linkedin.com/in/juliatibes/), 
Maria Eduarda [linkedin](https://www.linkedin.com/in/maria-eduarda-rebelo-961306193/).

**Proposta:**
- Criar uma aplicação  web para suportar um ecommerce, com frontend e backend.
- De acordo com o tema do ecommerce, deve ser criado um layout especifico para o frontend.
- Deve ser possível o cliente realizar o cadastro e fazer pedidos.
- Bem como lsitar todos os pedidos realizados para o mesmo.

**Escopo:**
- Tela inicial deve listar os produtos disponíveis do ecommerce.
- Ainda na tela incial (home) deve ser possível listar os produtos por categorias, com no mínimo 5 produtos em cada uma.
- Produtos devem ter controle de estoque.
- Caso o produto não tenha estoque deve estar visível para o cliente, e não pode ser adicionado para compra.
- Deve ser poss´vel adicionar ao carrinho produtos com quantidade máxima de 5 unidades cada.
- Deve ser possível fazer o login do cliente na tela inicial(home).
- Se o cliente não estiver logado quando finalizar o carrinho, deve ser solicitado o login.
- A tela seguinte deve solicitar o endereço de entrega do pedido.
- Para finalizar o pedido deve ser solicitado a forma de pagamento do pedido.
- As formas que serão a aceitas serão: boleto, pix e cartão de crédito.
- Os status aceitos no pedido serão: pendente, pago, entregue ou cancelado.
- Atualização de status deve ocorrer por uma rota no backend, sem insert no banco de dados.
- Para o cadastro de cliente deve ter uma tela onde seja possível a manutenção dados do cliente.
- Deve ser possível adicionar, editar ou excluir endereços do cliente. Deve ser na mesma tela de manutenção do cliente

**Requisitos:**
- Frontend: Reactjs + Typescript
- Backend: Java + JPA
- Banco de dados: Postgresql

**Tutorial para rodar a aplicação completa:**
   - Front [APP](https://github.com/GustavoAlbonico/ecommerce-app).
     - Clone o projeto.
     - Abra o projeto com a IDEA.
     - npm i para instalar as dependências.
     - npm start para iniciar o projeto.
        - OBS: CTRL + C parar o projeto se necessário.
   - Back [API](https://github.com/GustavoAlbonico/ecommerce-api)
     - Clone o projeto
     - Abra o projeto com a sua IDEA para Java
     - Configure o arquivo .yml com as informações do seu banco
     - Crie o banco de dados com o nome informado no arquivo .yml
     - Iniciei o projeto (Vai ser inseridos dados automaticamente quando iniciar o projeto).
       - OBS: Necessário excluir e criar o banco quando reiniciar o back-end para os dados não duplicar.
  

