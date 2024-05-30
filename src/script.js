// Importing products data
const products = [
  {
    id: 1,
    name: "Vegetable Salad",
    type: "Vegetables",
    price: 220000,
    stock: 54,
    total: 1,
    image: "../assets/assets/img_product1.png",
    bookmarked: false,
    selected: false,
  },
  {
    id: 2,
    name: "Fresh Brocoli",
    type: "Vegetables",
    price: 220000,
    stock: 23,
    total: 1,
    image: "../assets/assets/img_product2.png",
    bookmarked: false,
    selected: false,
  },
  {
    id: 3,
    name: "Breakfast Set",
    type: "Vegetables",
    price: 220000,
    stock: 51,
    total: 1,
    image: "../assets/assets/img_product3.png",
    bookmarked: false,
    selected: false,
  },
  {
    id: 4,
    name: "Smoked Salmon",
    type: "Heavy Meal",
    price: 220000,
    stock: 44,
    total: 1,
    image: "../assets/assets/img_product4.png",
    bookmarked: false,
    selected: false,
  },
];

let cartProducts = [...products];
let totalPrice = 0;

//
const updateTotalPrice = () => {
  totalPrice = cartProducts.reduce((sum, product) => {
    if (product.selected) {
      return sum + product.price * product.total;
    }
    return sum;
  }, 0);
  document.getElementById(
    "priceTotal"
  ).innerText = `Rp ${totalPrice.toLocaleString()}`;
  document.getElementById(
    "total"
  ).innerText = `Rp ${totalPrice.toLocaleString()}`;
};

//
const renderProductList = () => {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  cartProducts.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className =
      "flex items-center p-4 border border-gray-300 rounded-lg";

    productElement.innerHTML = `
        <div class="w-25 mb-10">
          <img src="${product.image}" alt="${
      product.name
    }" class="w-full h-auto rounded-md">
        </div>
        <div class="w-1 border-r border-gray-300 mx-4"></div>
        <div class="flex flex-col w-3/5 space-y-2">
          <span class="text-gray-600 text-base text-left">${product.type}</span>
          <h2 class="text-black text-xl font-bold text-left">${
            product.name
          }</h2>
          <div class="flex items-center space-x-2">
            <button class="border border-gray-300 p-1 rounded" onclick="updateQuantity(${
              product.id
            }, -1)">-</button>
            <span>${product.total}</span>
            <button class="border border-gray-300 p-1 rounded" onclick="updateQuantity(${
              product.id
            }, 1)">+</button>
          </div>
          <span class="text-gray-500 text-left">Stock Total: <span class="text-greenprimary font-semibold text-xl">${
            product.stock
          } pcs</span></span>
        </div>
        <div class="w-1 border-r border-gray-300 mx-4"></div>
        <div class="flex flex-col items-end w-1/5">
  <input type="checkbox" class="w-[15px] h-[15px] border border-gray-300 p-1 rounded" id="myCheck${
    product.id
  }" onclick="toggleSelect(${product.id}, this.checked)" ${
      product.selected ? "checked" : ""
    }>
          <span class="text-sm text-gray-500">Total: <span class="text-black font-semibold">x${
            product.total
          }</span></span>
          <p class="font-bold">Rp ${product.price.toLocaleString()}</p>
          <div class="flex space-x-2 mt-2">
          <button onclick="toggleBookmark(${product.id})">
            <img src="../assets/assets/bookmark.svg" class="${
              product.bookmarked ? "text-red-500" : ""
            }">
          </button>
            <button onclick="deleteProduct(${product.id})">
              <img src="../assets/assets/delete.svg">
            </button>
           
          </div>
        </div>
      `;

    productList.appendChild(productElement);
  });
};
//
const updateQuantity = (productId, amount) => {
  cartProducts = cartProducts.map((product) => {
    if (product.id === productId) {
      if (amount > 0 && product.stock > 0) {
        return {
          ...product,
          total: product.total + amount,
          stock: product.stock - amount,
        };
      } else if (amount < 0 && product.total > 0) {
        return {
          ...product,
          total: product.total + amount,
          stock: product.stock - amount,
        };
      }
    }
    return product;
  });
  renderProductList();
  updateTotalPrice();
};

// Function to delete product
const deleteProduct = (productId) => {
  cartProducts = cartProducts.filter((product) => product.id !== productId);
  renderProductList();
  updateTotalPrice();
};

// Function to delete all products
const deleteAllProducts = () => {
  cartProducts = [];
  renderProductList();
  updateTotalPrice();
};

// Function to toggle bookmark
const toggleBookmark = (productId) => {
  cartProducts = cartProducts.map((product) => {
    if (product.id === productId) {
      return { ...product, bookmarked: !product.bookmarked };
    }
    return product;
  });
  renderProductList();
};

// Function to toggle select
const toggleSelect = (productId) => {
  cartProducts = cartProducts.map((product) => {
    if (product.id === productId) {
      return { ...product, selected: !product.selected };
    }
    return product;
  });
  renderProductList();
  updateTotalPrice();
};

// Function to choose all products
const chooseAllProducts = () => {
  cartProducts = cartProducts.map((product) => ({
    ...product,
    selected: true,
  }));
  renderProductList();
  updateTotalPrice();
};

// Event listener to refresh the page
document.getElementById("refresh").addEventListener("click", () => {
  window.location.reload();
});

// Event listener to search products
document.getElementById("search").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const query = event.target.value.toLowerCase();
    cartProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    renderProductList();
    updateTotalPrice();
  }
});

// document
//   .getElementById("changeImageButton")
//   .addEventListener("click", function () {
//     var image = document.getElementById("mainImage");
//     if (image.src.includes("assets/check.svg")) {
//       image.src = "assets/logo.svg";
//     } else {
//       image.src = "assets/check.svg";
//     }
//   });

// Event listener to delete all products
document
  .getElementById("deleteAll")
  .addEventListener("click", deleteAllProducts);

// Event listener to choose all products
document
  .getElementById("chooseAll")
  .addEventListener("click", chooseAllProducts);

// Initial render
renderProductList();
updateTotalPrice();
