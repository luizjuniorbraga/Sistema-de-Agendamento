const { useState, useEffect } = React;

const API = "http://localhost:3000/agendamentos";

const SERVICOS = {
  corte: { nome: "Corte de Cabelo", preco: 40 },
  barba: { nome: "Fazer a Barba", preco: 30 },
  combo: { nome: "Cabelo + Barba", preco: 60 },
};

const VAZIO = { nome: "", data: "", hora: "", servico: "corte" };

function App() {
  const [agenda, setAgenda] = useState([]);
  const [form, setForm] = useState(VAZIO);

  // Busca do backend
  const carregar = async () => {
    const r = await fetch(API);
    setAgenda(await r.json());
  };

  useEffect(() => {
    carregar();
  }, []);

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const agendar = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.data || !form.hora)
      return alert("Preencha nome, data e hora!");

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm(VAZIO);
    carregar();
  };

  const remover = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    carregar();
  };

  return (
    <div className="app">
      <header>
        <h1>💈 Barbearia Estilo</h1>
        <p>Agende seu horário</p>
      </header>

      <form onSubmit={agendar}>
        <input name="nome" placeholder="Seu nome" value={form.nome} onChange={set} />
        <input name="data" type="date" value={form.data} onChange={set} />
        <input name="hora" type="time" value={form.hora} onChange={set} />
        <select name="servico" value={form.servico} onChange={set}>
          {Object.entries(SERVICOS).map(([k, s]) => (
            <option key={k} value={k}>{s.nome} — R$ {s.preco}</option>
          ))}
        </select>
        <button type="submit">Agendar</button>
      </form>

      <h2>Agendamentos ({agenda.length})</h2>

      {agenda.length === 0 ? (
        <p className="vazio">Nenhum agendamento ainda.</p>
      ) : (
        <ul>
          {agenda.map((a) => (
            <li key={a.id}>
              <div>
                <strong>{SERVICOS[a.servico].nome}</strong>
                <span>
                  {a.nome} • {a.data.split("-").reverse().join("/")} às {a.hora}
                </span>
              </div>
              <div>
                <b>R$ {SERVICOS[a.servico].preco}</b>
                <button onClick={() => remover(a.id)} title="Remover">✕</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);