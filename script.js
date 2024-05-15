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

    const addToCart = (name, price) => {
        cart.push({ name, price });
        updateCart();
    };

    document.querySelectorAll('.add-to-cart').forEach((button, index) => {
        button.addEventListener('click', () => {
            const productName = button.dataset.name;
            const productPrice = parseFloat(button.dataset.price);
            addToCart(productName, productPrice);
        });
    });

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = parseInt(event.target.dataset.index);
            cart.splice(index, 1);
            updateCart();
        }
    });
});
