document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    const updateCart = async () => {
        const response = await fetch('/cart');
        const data = await response.json();
        const { cart, totalPrice } = data;
        
        cartCountElement.textContent = cart.length;
        cartItemsElement.innerHTML = '';

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name} - R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                <button class="remove-from-cart" data-index="${index}">Remover</button>
            `;
            cartItemsElement.appendChild(itemElement);
        });

        totalPriceElement.textContent = `Total: R$ ${parseFloat(totalPrice).toFixed(2).replace('.', ',')}`;
    };

    const addToCart = async (name, price) => {
        await fetch('/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price })
        });
        updateCart();
    };

    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productName = button.dataset.name;
            const productPrice = parseFloat(button.dataset.price);
            addToCart(productName, productPrice);
        });
    });

    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = parseInt(event.target.dataset.index);
            await fetch(`/cart/${index}`, { method: 'DELETE' });
            updateCart();
        }
    });

    updateCart();
});

