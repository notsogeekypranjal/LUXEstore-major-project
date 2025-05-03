const products = [
    {
        id: 1,
        title: "Premium Leather Jacket",
        price: 199.99,
        oldPrice: 249.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        rating: 5,
        badge: "Sale",
        category: "men"
    },
    {
        id: 2,
        title: "Wireless Headphones Pro",
        price: 159.99,
        oldPrice: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        rating: 4,
        badge: "Popular",
        category: "electronics"
    },
    {
        id: 3,
        title: "Designer Handbag",
        price: 299.99,
        oldPrice: 349.99,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1386&q=80",
        rating: 5,
        badge: "New",
        category: "women"
    },
    {
        id: 4,
        title: "Smart Watch Series 5",
        price: 249.99,
        oldPrice: 299.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80",
        rating: 4,
        badge: "Bestseller",
        category: "electronics"
    },
    {
        id: 5,
        title: "Luxury Wool Coat",
        price: 279.99,
        oldPrice: 329.99,
        image: "https://images.unsplash.com/photo-1620247405612-18f042ea68cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29vbCUyMGNvYXR8ZW58MHx8MHx8fDA%3D",
        rating: 5,
        badge: "Sale",
        category: "women"
    },
    {
        id: 6,
        title: "Noise Cancelling Earbuds",
        price: 179.99,
        oldPrice: 219.99,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
        rating: 4,
        badge: "Popular",
        category: "electronics"
    },
    {
        id: 7,
        title: "Premium Sunglasses",
        price: 149.99,
        oldPrice: 189.99,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
        rating: 5,
        badge: "New",
        category: "accessories"
    },
    {
        id: 8,
        title: "Wireless Charger",
        price: 49.99,
        oldPrice: 59.99,
        image: "https://images.unsplash.com/photo-1615526674998-2ea0930bfe24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdpcmVsZXNzJTIwY2hhcmdlcnxlbnwwfHwwfHx8MA%3D%3D",
        rating: 4,
        badge: "Bestseller",
        category: "electronics"
    },
    {
        id: 9,
        title: "Modern Sofa",
        price: 899.99,
        oldPrice: 999.99,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        rating: 5,
        badge: "Sale",
        category: "home"
    },
    {
        id: 10,
        title: "Designer Table Lamp",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        rating: 4,
        badge: "New",
        category: "home"
    }
];

const productCategories = {
    men: products.filter(p => p.category === 'men'),
    women: products.filter(p => p.category === 'women'),
    electronics: products.filter(p => p.category === 'electronics'),
    home: products.filter(p => p.category === 'home')
};

function getProductsByCategory(category) {
    return productCategories[category] || [];
}