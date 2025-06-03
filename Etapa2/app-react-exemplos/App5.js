import React, { useState, useEffect } from 'react'; 
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API_URL = 'http://10.81.205.25:3000/compras'; // Altere se necessário

function App() {
  const [compras, setCompras] = useState([]);
  const [item, setItem] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    axios.get(API_URL).then((res) => setCompras(res.data));
  }, []);

  const adicionarOuAtualizar = () => {
    if (!item || !quantidade) return;

    const novaCompra = {
      item,
      quantidade: parseInt(quantidade),
    };

    if (editandoId) {
      axios.put(`${API_URL}/${editandoId}`, { ...novaCompra, id: editandoId }).then(() => {
        setCompras((prev) =>
          prev.map((c) => (c.id === editandoId ? { ...c, ...novaCompra } : c))
        );
        resetarFormulario();
      });
    } else {
      const nova = { ...novaCompra, id: uuidv4() };
      axios.post(API_URL, nova).then((res) => {
        setCompras([...compras, res.data]);
        resetarFormulario();
      });
    }
  };

  const excluir = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setCompras(compras.filter((c) => c.id !== id));
    });
  };

  const editar = (compra) => {
    setItem(compra.item);
    setQuantidade(compra.quantidade);
    setEditandoId(compra.id);
  };

  const resetarFormulario = () => {
    setItem("");
    setQuantidade("");
    setEditandoId(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Lista de Compras</h2>
      <input
        placeholder="Item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
      />
      <button onClick={adicionarOuAtualizar}>
        {editandoId ? "Atualizar" : "Adicionar"}
      </button>
      <ul>
        {compras.map((c) => (
          <li key={c.id}>
            {c.item} - {c.quantidade}
            <button onClick={() => editar(c)}>Editar</button>
            <button onClick={() => excluir(c.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  text: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  list: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  itemText: {
    flex: 1,
    marginRight: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
  editInput: {
    flex: 1,
    marginRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  }
});