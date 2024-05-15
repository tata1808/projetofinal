document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    const updateCart = () => {
        cartCountElement.textContent = cart.length;
        cartItemsElement.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name} - R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                <button class="remove-from-cart" data-index="${index}">Remover</button>
            `;
            cartItemsElement.appendChild(itemElement);
            totalPrice += item.price;
        });

        totalPriceElement.textContent = `Total: R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            cart.push({ name, price });
            updateCart();
        });
    });

    cartItemsElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        }
    });

    // Aplicar descontos nos produtos
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const priceElement = product.querySelector('.price');
        const originalPrice = parseFloat(priceElement.textContent.replace('R$ ', '').replace(',', '.'));

        // Exemplo: Aplicar um desconto de 10%
        const discountPrice = originalPrice * 0.9;
        priceElement.textContent = `R$ ${discountPrice.toFixed(2).replace('.', ',')}`;
    });
});

// Adicione este trecho de código JavaScript para controlar a reprodução das músicas
document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');

    // Função para reproduzir uma música
    const playMusic = (trackUrl) => {
        audioPlayer.src = trackUrl;
        audioPlayer.play();
    };

    // Função para pausar a reprodução da música
    const pauseMusic = () => {
        audioPlayer.pause();
    };

    // Evento para adicionar música ao clicar em um botão
    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', () => {
            const trackUrl = button.getAttribute('data-track-url');
            playMusic(trackUrl);
        });
    });
});

