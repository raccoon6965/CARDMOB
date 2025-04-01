import React from "react";

const Contato = ({ contato }) => {
    return (
        <div className="contato-item">
            <h3>{contato.nome}</h3>
            <p>Telefone: {contato.telefone}</p>
        </div>
    );
};

export default Contato;