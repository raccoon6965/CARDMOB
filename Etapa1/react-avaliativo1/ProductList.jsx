import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const addProduct = () => {
        if (name.trim() === "" || price.trim() === "") return;
        setProducts([...products, { id: Date.now(), name, price: parseFloat(price) }]);
        setName("");
        setPrice("");
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Lista de Produtos</h1>
            <input
                type="text"
                placeholder="Nome do Produto"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                type="number"
                placeholder="Preço"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button onClick={addProduct}>Adicionar Produto</button>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {products.map((product) => (
                    <div key={product.id}>
                        <ProductCard product={product} addToCart={() => alert(`${product.name} adicionado ao carrinho!`)} />
                        <button onClick={() => deleteProduct(product.id)}>Excluir Produto</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;