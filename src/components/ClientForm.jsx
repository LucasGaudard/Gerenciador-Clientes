import { useEffect, useState } from "react";

function ClientForm({ onSave, clientEditing, loading }) {
  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Ensaio",
    status: "Orçamento",
  });

  useEffect(() => {
    if (clientEditing) {
      setClient(clientEditing);
    }
  }, [clientEditing]);

  function handleChange(e) {
    setClient({ ...client, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(client);
    setClient({
      name: "",
      email: "",
      phone: "",
      service: "Ensaio",
      status: "Orçamento",
    });
  }

  return (
    <div className="card p-4 mb-4">
      <h5>
        {clientEditing ? "Editar Cliente" : "Cadastrar Cliente"}
      </h5>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Nome"
          name="name"
          value={client.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Email"
          name="email"
          value={client.email}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          placeholder="Telefone"
          name="phone"
          value={client.phone}
          onChange={handleChange}
        />

        <select
          className="form-select mb-2"
          name="service"
          value={client.service}
          onChange={handleChange}
        >
          <option>Ensaio</option>
          <option>Casamento</option>
        </select>

        <select
          className="form-select mb-3"
          name="status"
          value={client.status}
          onChange={handleChange}
        >
          <option>Orçamento</option>
          <option>Fechado</option>
          <option>Entregue</option>
        </select>

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Cliente"}
        </button>
      </form>
    </div>
  );
}

export default ClientForm;
