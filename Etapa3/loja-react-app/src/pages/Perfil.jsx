import React, { useEffect, useState } from "react";

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca o usuário ID=1 (Admin) no backend
    fetch("/api/users/1")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar usuário:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-4">Carregando...</p>;
  if (!user) return <p className="text-center mt-4">Erro ao carregar usuário.</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md text-center">
      <img
        src="https://placekitten.com/150/150"
        alt="Avatar do usuário"
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
}
