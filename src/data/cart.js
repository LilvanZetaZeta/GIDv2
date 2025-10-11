export function addToCart(productWithQuantity) {
  if (!productWithQuantity || productWithQuantity.quantity <= 0) return false;

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(p => p.id === productWithQuantity.id);

  const totalRequested = existing
    ? existing.quantity + productWithQuantity.quantity
    : productWithQuantity.quantity;

  if (totalRequested > productWithQuantity.stock) {
    alert(`No puedes agregar más de ${productWithQuantity.stock} unidades de ${productWithQuantity.name}`);
    return false;
  }

  if (existing) {
    existing.quantity += productWithQuantity.quantity;
  } else {
    cart.push(productWithQuantity);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  return true;
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

