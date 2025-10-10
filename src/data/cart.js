export function addToCart(productWithQuantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productWithQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  export function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(p => p.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }
  
  export function clearCart() {
    localStorage.removeItem('cart');
  }
  