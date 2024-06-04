
// busqueda
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    const executeSearch = () => {
        const query = searchInput.value.toLowerCase();
        filterBySearch(query);
        window.location.hash = '#products';
    };

    searchButton.addEventListener('click', executeSearch);
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            executeSearch();
        }
    });
    

const logo = document.getElementById('logo');
    logo.addEventListener('click', function () {
        location.reload();
    });
//  Carro de Compras y Categorías
        const cart = [];
        const products = [
            { id: 1, name: 'Saphirus textil 250Ml ', price: 2600,  category:"textil", img:"./img/textil 250.PNG"},
            { id: 2, name: 'Saphirus difusores', price: 3600,  category: "difusores", img:'./img/difusor safirus.PNG'},
            { id: 3, name: 'Aerosoles ámbar ', price: 2700,  category:"aerosoles",img:"./img/aerosol ambar.JPG"},
            { id: 4, name: 'Iluminarte 7 aromas x35 sahumerios', price: 2000,  category:"sahumerios",img:"./img/sahumerios x35.JPG"},
            { id: 5, name: 'Palo Santo Sagrada Madre ', price: 1700,  category:"sahumerios",img:"./img/palo santo sagrada madre.JPG"},
            { id: 6, name: 'Tibetanos Sahumerios (grandes)', price: 2200,  category:"sahumerios",img:"./img/grandes sa.JPG"},
            { id: 7, name: 'Saphirus textil 500ml', price: 5100,  category:"textil",img:"./img/textil.JPG"},
            { id: 8, name: 'Aerosoles Saphirus', price: 3800,  category:"aerosoles",img:"./img/saphiru aero.JPG"},
            { id: 9, name: 'Cascada', price: 2500,  category:"decoracion",img:"./img/cascada.JPG"},
            { id: 10, name: 'Conos', price: 2000,  category:"decoracion",img:"./img/conos.WEBP"},
            { id: 11, name: 'Iluminarte india x15 sahumerios', price: 1100,  category:"sahumerios",img:"./img/iluminarte india.PNG"},
            { id: 12, name: 'Porta Sahumerios', price: 1500,  category:"decoracion",img:"./img/porta.PNG"},
            { id: 13, name: 'Sahumerios 7 chakras', price: 2000,  category:"sahumerios",img:"./img/siete chakras.JPG"},
            { id: 14, name: 'Tibetanos Slim Sahumerios', price: 1300,  category:"sahumerios",img:"./img/tibetano slim.JPG"},
            { id: 15, name: 'Hornillo + Esencia', price: 4000,  category:"decoracion",img:"./img/hornillo.png"},
            { id: 16, name: 'Sahumerio Palo Santo aromanza', price: 1300,  category:"sahumerios",img:"./img/palo santo aromanza.JPG"},
            { id: 17, name: 'Sahumerios Sagrados', price: 2500,  category:"sahumerios",img:"./img/sagrados.JPG"}
        ];

        function toggleCart() {
            const cartOverlay = document.getElementById('cart');
            cartOverlay.classList.toggle('open');
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const cartItem = cart.find(item => item.id === productId);
            
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
        
            updateCart();
        }   
        function updateCart() {
            const cartItems = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');
            cartItems.innerHTML = '';
            let total = 0;

            
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="cart-item-img">
            ${item.name} - $${item.price} x ${item.quantity}
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

            cartTotal.textContent = total.toFixed(2);
            document.querySelector('.cart-count').textContent = cart.length;
        }

        function removeFromCart(index) {
            const cartItem = cart[index];
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateCart();
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Tu carrito está vacío.');
                return;
            }
        
            let message = 'Hola! Me gustaría realizar una compra con los siguientes productos:\n\n';
            let total = 0;
        
            cart.forEach(item => {
                message += `${item.name} - $${item.price} x ${item.quantity}\n`;
                total += item.price * item.quantity;
            });
        
            message += `\nTotal: ${total.toFixed(2)}`;
        
            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
        
            // WhatsApp URL
            const whatsappUrl = `https://wa.me/543425415219?text=${encodedMessage}`;
        
            // Redirect to WhatsApp
            window.location.href = whatsappUrl;
        }


        function filterByCategory(category) {
            const productsGallery = document.getElementById('products-gallery');
            productsGallery.innerHTML = '';

            const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);

            filteredProducts.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.setAttribute('data-id', product.id);
                productDiv.setAttribute('data-name', product.name);
                productDiv.setAttribute('data-price', product.price);
                productDiv.setAttribute('data-category', product.category);

                productDiv.innerHTML = `
                                <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Comprar</button>
                `;
                productsGallery.appendChild(productDiv);
            });
        }
        function filterBySearch(query) {    
            const productsGallery = document.getElementById('products-galleria');
            productsGallery.innerHTML = '';
        
            const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query));
        
            filteredProducts.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.setAttribute('data-id', product.id);
                productDiv.setAttribute('data-name', product.name);
                productDiv.setAttribute('data-price', product.price);
                productDiv.setAttribute('data-category', product.category);
        
                productDiv.innerHTML = `
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Comprar</button>
                `;
                productsGallery.appendChild(productDiv);
            });
        }