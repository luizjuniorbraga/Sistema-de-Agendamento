💈 Barbearia Estilo - Sistema de Agendamento

Um sistema web completo e responsivo para agendamento de horários em barbearias. O projeto conta com uma interface moderna em React para os clientes e uma API REST em Node.js para gerenciar os agendamentos, com persistência de dados em nuvem.

🌐 Acesse o projeto no ar: [Clique aqui para acessar o sistema](https://sistema-de-agendamento-frontend.onrender.com/)

🔗 API Backend: [https://sistema-de-agendamento-3jiw.onrender.com](https://sistema-de-agendamento-3jiw.onrender.com/agendamentos)

🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

Frontend:
*   React 18 (via CDN, utilizando Babel Standalone para compilação do JSX no navegador)
*   React Hooks (`useState`, `useEffect`)
*   HTML5 & CSS3 (Tema escuro moderno com detalhes em dourado)
*   Fetch API (para consumo da API REST)

Backend:
*   Node.js
*   Express (Framework para criação da API REST)
*   CORS (Liberação de acesso para o frontend)

Banco de Dados & Infraestrutura:
*   Banco de Dados na Nuvem: SQLite hospedado na nuvem através do Turso (Banco de dados distribuído baseado em SQLite, utilizando a biblioteca `@libsql/client`).
*   Hospedagem: O backend está hospedado e rodando em produção na plataforma Render.

✨ Funcionalidades

- [x] Agendamento de horários (Nome, Data, Hora e Serviço).
- [x] Seleção de serviços com preços pré-definidos (Corte de Cabelo, Fazer a Barba, Cabelo + Barba).
- [x] Listagem dinâmica de agendamentos em tempo real.
- [x] Remoção de agendamentos diretamente pela interface.
- [x] Formatação automática de data (DD/MM/AAAA) e hora.
- [x] Interface responsiva e agradável (Dark Mode).

📁 Estrutura do Projeto

Sistema de Agendamento Feito/
├── backend/
│   ├── node_modules/
│   ├── agenda.db
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── app.js
│   ├── index.html
│   └── styles.css
└── .gitignore
