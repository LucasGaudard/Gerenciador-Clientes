function ClientList({ clients, onDelete, onEdit }) {
  return (
    <div className="container mt-4">
      <h2>Clientes</h2>

      {clients.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Serviço</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client) => (
              <tr
                key={client._id}
                className={client.status === "Fechado" ? "table-success" : ""}
              >
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.service}</td>

                <td>
                  <span
                    className={`badge ${
                      client.status === "Fechado"
                        ? "bg-success"
                        : client.status === "Entregue"
                        ? "bg-primary"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {client.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(client)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      if (confirm("Deseja excluir este cliente?")) {
                        onDelete(client._id);
                      }
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClientList;
