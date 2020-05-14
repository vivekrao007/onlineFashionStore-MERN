export default function addItemtoCart(items, next) {
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    cart.push({ ...items, count: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  next();
}

export function loadCart() {
  if (localStorage.getItem("cart")) {
    return JSON.parse(localStorage.getItem("cart"));
  }
}

export function removeItemFromCart(productId) {
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));

    cart.splice(
      cart.findIndex((product) => product._id === productId),
      1
    );
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
}

export function emptyCart(next) {
  localStorage.removeItem("cart");
  let cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  next();
}
