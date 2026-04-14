import { useEffect, useState } from "react";
import ClientForm from "../components/ClientForm";
import ClientList from "../components/ClientList";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Home() {
  const [clients, setClients] = useState([]);
  const [clientEditing, setClientEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function loadClients() {
    try {
      const response = await api.get("/clients");
      setClients(response.data);
    } catch {
      setError("Erro ao carregar clientes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClients();
  }, []);

  async function handleSaveClient(client) {
    try {
      setSaving(true);

      if (client._id) {
        const response = await api.put(`/clients/${client._id}`, client);
        setClients(
          clients.map((c) =>
            c._id === client._id ? response.data : c
          )
        );
        setMessage("Cliente atualizado com sucesso!");
      } else {
        const response = await api.post("/clients", client);
        setClients([...clients, response.data]);
        setMessage("Cliente cadastrado com sucesso!");
      }

      setClientEditing(null);
      setError(null);
    } catch {
      setError("Erro ao salvar cliente");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  }

  async function deleteClient(id) {
    try {
      await api.delete(`/clients/${id}`);
      setClients(clients.filter((client) => client._id !== id));
      setMessage("Cliente excluído com sucesso!");
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setError("Erro ao excluir cliente");
    }
  }

  return (
    <div className="container mt-4">

      {loading && (
        <div className="alert alert-info">Carregando clientes...</div>
      )}

      {message && (
        <div className="alert alert-success">{message}</div>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      <ClientForm
        onSave={handleSaveClient}
        clientEditing={clientEditing}
        loading={saving}
      />

      <ClientList
        clients={clients}
        onDelete={deleteClient}
        onEdit={setClientEditing}
      />
    </div>
  );
}

export default Home;

