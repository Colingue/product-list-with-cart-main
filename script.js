let cart = [];

const buttons = document.querySelectorAll(".btn-add-cart");

const decrementButtons = document.querySelectorAll(".decrement");
const incrementButtons = document.querySelectorAll(".increment");

const resetOrderButton = document.querySelector(".reset-order");

function removeFromCart(name) {
  cart = cart.filter((product) => product.name !== name);
  updateCart();
}

function updateQuantityOnButton(name) {
  const pQuantity = document.querySelector(
    `.btn-change-quantity[data-name="${name}"] .quantity`
  );

  console.log(pQuantity);

  pQuantity.innerHTML = cart.find((p) => p.name == name).quantity;
}

function toggleModal() {
  const modalOverlay = document.getElementsByClassName("overlay-background")[0];
  const modal = document.getElementsByClassName("modal")[0];

  modalOverlay.classList.toggle("hidden");
  modal.classList.toggle("hidden");
}

function toggleVisibilityButtons(name) {
  const buttonAdd = document.querySelector(
    `.btn-add-cart[data-name="${name}"]`
  );

  const divChangeQuantity = document.querySelector(
    `.btn-change-quantity[data-name="${name}"]`
  );

  const imgProduct = buttonAdd.previousElementSibling;

  divChangeQuantity.classList.toggle("hidden");
  buttonAdd.classList.toggle("hidden");
  imgProduct.classList.toggle("border-orange");

  updateQuantityOnButton(name);
}

function resetAll() {
  cart = [];
  updateCart();
  const btnAddToCart = document.querySelectorAll(".btn-add-cart");
  btnAddToCart.forEach((btn) => {
    btn.classList.remove("hidden");
    const imgProduct = btn.previousElementSibling;
    imgProduct.classList.remove("border-orange");
  });

  const btnChangeQuantity = document.querySelectorAll(".btn-change-quantity");
  btnChangeQuantity.forEach((btn) => {
    btn.classList.add("hidden");
  });
}

function clickOnDecrement(name) {
  const product = cart.find((p) => p.name == name);

  if (product) {
    if (product.quantity == 1) {
      removeFromCart(name);

      toggleVisibilityButtons(name);
    } else {
      product.quantity--;
      updateQuantityOnButton(name);
    }
    updateCart();
  }
}

function clickOnIncrement(name) {
  const product = cart.find((p) => p.name == name);

  if (product) {
    product.quantity++;
  }
  updateQuantityOnButton(name);
  updateCart();
}

function clickOnAddToCart(btn) {
  const name = btn.getAttribute("data-name");
  const price = btn.getAttribute("data-price");

  const existingProduct = cart.find((product) => product.name == name);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCart();
  toggleVisibilityButtons(name);
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
      `<button class="confirm-order main-btn">Confirm Order</button>`;

    const confirmOrderButton = document.querySelector(".confirm-order");

    confirmOrderButton.addEventListener("click", () => {
      toggleModal();
      const listContainer = document.querySelector(".modal .list");

      listContainer.innerHTML =
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
      </div>`
          )
          .join("<div class='divider'></div>") +
        "<div class='divider'></div>" +
        `<div class='cart-total'><p class='title'>Order total</p><p class='price'>$${sum}</p></div>
        `;
    });

    const deleteButtons = document.querySelectorAll(".delete-item");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        removeFromCart(name);
        toggleVisibilityButtons(name);
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
    clickOnAddToCart(button);
  });
});

decrementButtons.forEach((dButton) => {
  dButton.addEventListener("click", () => {
    const name = dButton.getAttribute("data-name");
    clickOnDecrement(name);
  });
});

incrementButtons.forEach((iButton) => {
  iButton.addEventListener("click", () => {
    const name = iButton.getAttribute("data-name");
    clickOnIncrement(name);
  });
});

resetOrderButton.addEventListener("click", () => {
  resetAll();
  toggleModal();
});

updateCart();
