# Atividade - Restaurante em Node.js

Desenvolva uma API Rest para um restaurante, controlando os pratos pedidos pelos clientes.

As seguintes regras de negócio devem ser validadas:

- Um cliente deve ter um CPF válido registrado
- Nomes de pratos devem conter apenas letras, tendo no mínimo 3 e no máximo 50 caracteres

Além das operações básicas de CRUD deve ser possível gerar os seguintes relatórios:

- Listar todos os pratos, ordenados por quantidade de pedidos
- Listar os 5 clientes que mais fizeram pedidos, seus nomes e quantos pedidos fizeram
- Listar os 5 clientes que mais gastaram, seus nomes e quanto gastaram

Documentação:
Crie um arquivo "documentacao.txt" na pasta raíz do seu repositório, indicando as rotas, seus parâmetros e sua descrição.

Formato:
VERBO /rota?parametro : Descrição
{
"atributo1",
"atributo2"
}

- comentários adicionais

Exemplo:
GET /clientes?active : Lista todos os clientes filtrado por active

- Active é um campo booleano que indica se o usuário está ativo
