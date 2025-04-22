import React from 'react';

const ProductCard = ({ product, addToCart }) => {
    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", textAlign: "center" }}>
            <h2>{product.name}</h2>
            <p>Preço: R${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
        </div>
    );
};

export default ProductCard;