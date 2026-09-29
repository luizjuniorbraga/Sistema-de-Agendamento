const express = require("express");
const cors = require("cors");
const { createClient } = require("@libsql/client"); // 1. Mudança de biblioteca

const app = express();

// 2. Conexão com o banco na nuvem (Turso)
const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// 3. Criação da tabela (agora é assíncrono)
db.execute(`
  CREATE TABLE IF NOT EXISTS agendamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    data TEXT NOT NULL,
    hora TEXT NOT NULL,
    servico TEXT NOT NULL
  )
`).catch(console.error);

app.use(cors());
app.use(express.json());

// 📥 Listar todos
app.get("/agendamentos", async (req, res) => { // 4. Agora é uma função async
  try {
    const result = await db.execute("SELECT * FROM agendamentos ORDER BY data, hora");
    res.json(result.rows); // O Turso retorna os dados dentro de .rows
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar agendamentos" });
  }
});

// ➕ Criar novo
app.post("/agendamentos", async (req, res) => {
  try {
    const { nome, data, hora, servico } = req.body;
    
    // No Turso, passamos o SQL e os argumentos separadamente
    const result = await db.execute({
      sql: "INSERT INTO agendamentos (nome, data, hora, servico) VALUES (?, ?, ?, ?)",
      args: [nome, data, hora, servico]
    });
    
    // lastInsertRowid retorna como BigInt, convertemos para Number
    res.json({ id: Number(result.lastInsertRowid), nome, data, hora, servico });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar agendamento" });
  }
});

// 🗑 Remover
app.delete("/agendamentos/:id", async (req, res) => {
  try {
    await db.execute({
      sql: "DELETE FROM agendamentos WHERE id = ?",
      args: [req.params.id]
    });
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar agendamento" });
  }
});

// 5. Porta dinâmica para funcionar no Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});