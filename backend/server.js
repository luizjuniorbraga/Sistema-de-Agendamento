const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
const db = new Database("agenda.db");

// Cria a tabela se ainda não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS agendamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    data TEXT NOT NULL,
    hora TEXT NOT NULL,
    servico TEXT NOT NULL
  )
`);

app.use(cors());
app.use(express.json());

// 📥 Listar todos (já ordenados por data/hora)
app.get("/agendamentos", (req, res) => {
  const rows = db.prepare(
    "SELECT * FROM agendamentos ORDER BY data, hora"
  ).all();
  res.json(rows);
});

// ➕ Criar novo
app.post("/agendamentos", (req, res) => {
  const { nome, data, hora, servico } = req.body;
  const info = db.prepare(
    "INSERT INTO agendamentos (nome, data, hora, servico) VALUES (?, ?, ?, ?)"
  ).run(nome, data, hora, servico);
  res.json({ id: info.lastInsertRowid, nome, data, hora, servico });
});

// 🗑 Remover
app.delete("/agendamentos/:id", (req, res) => {
  db.prepare("DELETE FROM agendamentos WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("✅ Servidor rodando em http://localhost:3000");
});