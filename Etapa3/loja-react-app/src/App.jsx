import React, { useState } from "react";
import Perfil from "./pages/Perfil";

function App() {
  const [tab, setTab] = useState("home");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Menu de guias */}
      <nav className="flex gap-3 mb-6">
        <button
          onClick={() => setTab("home")}
          className={`px-4 py-2 rounded ${
            tab === "home" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
          }`}
        >
          Home
        </button>

        <button
          onClick={() => setTab("perfil")}
          className={`px-4 py-2 rounded ${
            tab === "perfil" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
          }`}
        >
          Perfil
        </button>
      </nav>

      {/* Conteúdo da guia */}
      {tab === "home" && (
        <div className="text-center text-gray-700">
          <h1 className="text-2xl font-semibold">Bem-vindo à área logada!</h1>
          <p className="mt-2">Clique em “Perfil” para ver seus dados.</p>
        </div>
      )}

      {tab === "perfil" && <Perfil />}
    </div>
  );
}

export default App;
