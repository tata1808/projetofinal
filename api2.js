// Adicione esta função ao seu script.js após a função finalizePurchase()

const finalizeDelivery = () => {
    // Simulando a confirmação de entrega
    alert('Pedido entregue com sucesso! Obrigado por comprar no Mundo do Rock!');
};

// Adicione este código ao final do evento DOMContentLoaded

document.getElementById('checkout').addEventListener('click', finalizeDelivery);
