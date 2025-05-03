function displayProducts(productsToDisplay = products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        productGrid.innerHTML = '<p class="no-results">No products found. Please try a different search.</p>';
        return;
    }
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        const isInWishlist = wishlist.some(item => item.id === product.id);
        
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < product.rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        productCard.innerHTML = `
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <button class="wishlist-toggle" data-id="${product.id}">
                <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-rating">
                    ${stars}
                </div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    addProductEventListeners();
}

function addProductEventListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    document.querySelectorAll('.wishlist-toggle').forEach(button => {
        button.addEventListener('click', toggleWishlist);
    });
}

function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.title} added to cart!`, 'success');
}

function toggleWishlist(e) {
    if (!currentUser) {
        showNotification('Please login to add items to your wishlist', 'error');
        return;
    }
    
    const productId = parseInt(e.currentTarget.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    const heartIcon = e.currentTarget.querySelector('i');
    
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex >= 0) {
        wishlist.splice(existingIndex, 1);
        heartIcon.classList.replace('fas', 'far');
        showNotification(`${product.title} removed from wishlist`, 'info');
    } else {
        wishlist.push(product);
        heartIcon.classList.replace('far', 'fas');
        showNotification(`${product.title} added to wishlist`, 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        let total = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });
        
        document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    }
    
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCart();
}

function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    item.quantity += 1;
    updateCart();
}

function removeItem(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Item removed from cart', 'info');
}

function handleSearch() {
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase();
    
    if (searchTerm === '') {
        displayProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.search-box input')?.addEventListener('input', handleSearch);
    document.querySelector('.search-box button')?.addEventListener('click', handleSearch);
    
    document.querySelector('.view-all')?.addEventListener('click', (e) => {
        e.preventDefault();
        displayProducts();
    });
    
    document.querySelector('.banner .btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        const saleProducts = products.filter(p => p.oldPrice);
        displayProducts(saleProducts);
    });
    
    document.querySelector('.newsletter form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        if (validateEmail(email)) {
            showNotification('Thank you for subscribing!', 'success');
            e.target.reset();
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    });
    
    document.querySelector('.user-btn')?.addEventListener('click', () => {
        if (currentUser) {
            showNotification(`Welcome back, ${currentUser.name}!`, 'info');
        } else {
            currentUser = { name: 'John Doe', email: 'john@example.com' };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showNotification('Successfully logged in!', 'success');
        }
    });
    
    document.querySelector('.wishlist-btn')?.addEventListener('click', () => {
        if (!currentUser) {
            showNotification('Please login to view your wishlist', 'error');
            return;
        }
        
        if (wishlist.length === 0) {
            showNotification('Your wishlist is empty', 'info');
            return;
        }
        
        displayProducts(wishlist);
        showNotification('Showing your wishlist items', 'info');
    });
    
    document.querySelector('.checkout-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (cart.length === 0) {
            showNotification('Your cart is empty', 'error');
            return;
        }
        
        showNotification('Proceeding to checkout', 'success');
        
        setTimeout(() => {
            cart = [];
            updateCart();
            showNotification('Order placed successfully!', 'success');
        }, 1500);
    });
});