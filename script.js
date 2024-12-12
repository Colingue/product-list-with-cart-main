let cart = [];

const buttons = document.querySelectorAll(".btn-add-cart");

function removeFromCart(name) {
  cart = cart.filter((product) => product.name !== name);
  updateCart();
}

function updateCart() {
  const cartContainer = document.getElementsByClassName("cart-list")[0];
  const title = document.querySelector(".cart h2");
  const quantityTotal = cart.reduce((acc, cV) => acc + cV.quantity, 0);

  console.log("cart", cart);
  const sum = cart
    .reduce((acc, cV) => acc + cV.price * cV.quantity, 0)
    .toFixed(2);

  if (cart.length > 0) {
    document.getElementsByClassName("empty-cart")[0].style.display = "none";
    cartContainer.innerHTML =
      cart
        .map(
          (p) => ` 
        <div class="cart-product">
          <div>
            <p class="title">${p.name}</p>
            <div class="properties">
              <p class="quantity">${p.quantity}x</p>
              <p class="solo-price">@ $${p.price} </p>
              <p class="total-price">$${(p.quantity * p.price).toFixed(2)}</p>
            </div>
          </div>
          <button class="delete-item" data-name="${
            p.name
          }"><img src="./assets/images/icon-remove-item.svg"/></button>
        </div>`
        )
        .join("<div class='divider'></div>") +
      "<div class='divider'></div>" +
      `<div class='cart-total'><p class='title'>Order total</p><p class='price'>$${sum}</p></div>` +
      `<div class="carbon">
          <img src="./assets/images/icon-carbon-neutral.svg" />
          <p>This is <b>carbon-neutral</b> delivery</p>
        </div>` +
      `<button class="confirm-order">Confirm Order</button>`;

    const deleteButtons = document.querySelectorAll(".delete-item");
    const confirmOrderButton = document.querySelector(".confirm-order");
    confirmOrderButton.addEventListener("click", () => {});
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        removeFromCart(name);
      });
    });
  } else {
    cartContainer.innerHTML = "";

    document.getElementsByClassName("empty-cart")[0].style.display = "block";
  }
  title.innerHTML = `Your Cart (${quantityTotal})`;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = button.getAttribute("data-price");

    const existingProduct = cart.find((product) => product.name == name);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
    console.log(cart);
  });
});

updateCart();
