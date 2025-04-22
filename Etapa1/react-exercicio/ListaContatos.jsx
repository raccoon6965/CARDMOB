import React, { useState } from "react";
import Contato from "./Contato";

const ListaContatos = () => {
    const [contatos, setContatos] = useState([]);
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [editandoNome, setEditandoNome] = useState("");
    const [editandoTelefone, setEditandoTelefone] = useState("");

    // Adicionar novo contato
    const addContato = () => {
        if (nome.trim() === "" || telefone.trim() === "") return;
        setContatos([...contatos, { id: Date.now(), nome, telefone }]);
        setNome("");
        setTelefone("");
    };

    // Iniciar edição
    const startEdit = (id, nome, telefone) => {
        setEditandoId(id);
        setEditandoNome(nome);
        setEditandoTelefone(telefone);
    };

    // Salvar edição
    const saveEdit = () => {
        setContatos(
            contatos.map((contato) =>
                contato.id === editandoId
                    ? { ...contato, nome: editandoNome, telefone: editandoTelefone }
                    : contato
            )
        );
        setEditandoId(null);
        setEditandoNome("");
        setEditandoTelefone("");
    };

    // Excluir contato
    const deleteContato = (id) => {
        setContatos(contatos.filter((contato) => contato.id !== id));
    };

    return (
        <div>
          <h2>Lista de Contatos</h2>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
          />
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Telefone"
          />
          <button onClick={addContato}>Adicionar Contato</button>

        <ul>
        {contatos.map((contato) => (
          <li key={contato.id}>
            {editandoId === contato.id ? (
              <>
                <input
                  type="text"
                  value={editandoNome}
                  onChange={(e) => setEditandoNome(e.target.value)}
                />
                <input
                  type="text"
                  value={editandoTelefone}
                  onChange={(e) => setEditandoTelefone(e.target.value)}
                />
                <button onClick={saveEdit}>Salvar</button>
              </>
            ) : (
              <>
                <Contato contato={contato} />
                <button onClick={() => startEdit(contato.id, contato.nome, contato.telefone)}>Editar</button>
                <button onClick={() => deleteContato(contato.id)}>Excluir</button>
              </>
            )}
          </li>
          ))}
        </ul>
        </div>
    );
};

export default ListaContatos;