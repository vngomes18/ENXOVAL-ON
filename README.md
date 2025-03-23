# Aplicativo de Gerenciamento de Enxoval

Este é um aplicativo web para gerenciar itens de enxoval, permitindo adicionar, remover e gerenciar itens com diferentes categorias e prioridades.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB (instalado e rodando localmente)

## Instalação

1. Clone este repositório
2. Instale as dependências:
```bash
npm install
```

## Como usar

1. Certifique-se que o MongoDB está rodando localmente
2. Inicie o servidor:
```bash
npm start
```
3. Acesse o aplicativo em seu navegador: http://localhost:3000

## Funcionalidades

- Adicionar itens ao enxoval com nome, categoria, quantidade, preço e prioridade
- Visualizar todos os itens em uma interface amigável
- Excluir itens
- Importar itens de uma planilha Excel
- Exportar itens para uma planilha Excel

## Tecnologias utilizadas

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Banco de dados: MongoDB
- Bibliotecas: XLSX.js para manipulação de arquivos Excel 