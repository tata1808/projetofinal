// Adicione esta função ao seu script.js após a função updateCart()

const finalizePurchase = () => {
    // Simulando a finalização da compra
    alert('Compra finalizada com sucesso! Obrigado por comprar no Mundo do Rock!');
    cart.length = 0; // Limpar o carrinho após a compra
    updateCart(); // Atualizar o carrinho na interface
};

// Adicione este código ao final do evento DOMContentLoaded

document.getElementById('checkout').addEventListener('click', finalizePurchase);
