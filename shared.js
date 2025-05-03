let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = cartCount;
    });
}

document.querySelector('.menu-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.add('active');
    document.body.style.overflow = 'hidden';
});

document.getElementById('close-menu')?.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.remove('active');
    document.body.style.overflow = 'auto';
});

document.getElementById('cart-btn')?.addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.add('active');
    document.getElementById('cart-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
});

document.getElementById('close-cart')?.addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('active');
    document.getElementById('cart-overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
});

document.getElementById('cart-overlay')?.addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('active');
    document.getElementById('cart-overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});