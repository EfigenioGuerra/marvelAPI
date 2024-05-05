# Guia Detalhado da API
Este guia detalha as funcionalidades de cada rota disponível na API, ajudando você a entender como interagir com ela.

Busca de Personagens
GET /characters
Esta rota retorna uma lista de todos os personagens disponíveis.

GET /characters/:id
Retorna os detalhes de um personagem específico com o ID fornecido.

Busca de Quadrinhos
GET /comics
Retorna uma lista de todos os quadrinhos disponíveis.

GET /comics/:id
Retorna os detalhes de um quadrinho específico com o ID fornecido.

Busca de Escritores
GET /creators
Retorna uma lista de todos os escritores disponíveis.

GET /creators/:id
Retorna os detalhes de um escritor específico com o ID fornecido.

Operações no Banco de Dados - Personagens
GET /charactersDB
Retorna uma lista de todos os personagens armazenados no banco de dados.

GET /charactersDB/:id
Retorna os detalhes de um personagem específico armazenado no banco de dados com o ID fornecido.

POST /charactersDB
Adiciona um novo personagem ao banco de dados.

PUT /charactersDB/:id
Atualiza os detalhes de um personagem específico no banco de dados com o ID fornecido.

DELETE /charactersDB/:id
Remove um personagem do banco de dados com o ID fornecido.

Operações no Banco de Dados - Quadrinhos
GET /comicsDB
Retorna uma lista de todos os quadrinhos armazenados no banco de dados.

GET /comicsDB/:id
Retorna os detalhes de um quadrinho específico armazenado no banco de dados com o ID fornecido.

POST /comicsDB
Adiciona um novo quadrinho ao banco de dados.

PUT /comicsDB/:id
Atualiza os detalhes de um quadrinho específico no banco de dados com o ID fornecido.

DELETE /comicsDB/:id
Remove um quadrinho do banco de dados com o ID fornecido.

Operações no Banco de Dados - Escritores
GET /creatorsDB
Retorna uma lista de todos os escritores armazenados no banco de dados.

GET /creatorsDB/:id
Retorna os detalhes de um escritor específico armazenado no banco de dados com o ID fornecido.

POST /creatorsDB
Adiciona um novo escritor ao banco de dados.

PUT /creatorsDB/:id
Atualiza os detalhes de um escritor específico no banco de dados com o ID fornecido.

DELETE /creatorsDB/:id
Remove um escritor do banco de dados com o ID fornecido.

Rotas Adicionais
Personagens
GET /charactersDB/nome/:name
Retorna os detalhes de um personagem armazenado no banco de dados com o nome fornecido.

GET /charactersDB/maisQueMilComics
Retorna uma lista de personagens que têm mais de 1000 quadrinhos publicados.

Quadrinhos
GET /comicsDB/title/:title
Retorna os detalhes de um quadrinho armazenado no banco de dados com o título fornecido.

GET /comicsDB/comicsComMaisDe25Paginas
Retorna uma lista de quadrinhos que têm mais de 25 páginas.

Escritores
GET /creatorsDB/creator/:fullName
Retorna os detalhes de um escritor armazenado no banco de dados com o nome completo fornecido.
