let cartIcon = document.querySelector("#cart-shopping-icon");
let cart = document.querySelector(".cart-item");
let closeCart = document.querySelector("#close-cart-list");
const groupPost = document.getElementById("list-group-post");
const post = document.getElementById("list-post");
const product = document.getElementById("list-product");
const review = document.getElementById("list-review");
const cartListProduct = document.getElementById("list-cart");
let listProduct = [];
let listCardProduct = [];
let totalCart = document.getElementById("total-price");

let dataGroupPost = [];
const urlApi = "http://localhost:8081";
let activeGroupPost = 0;

//#region Init
//Code mới
async function init() {
  await getGroupPost();
  await getPost(0);
}
async function initGetProduct() {
  await getProduct();
}
init();
initGetProduct();
//#endregion

// end region init

// update content into Dom element when clicking
//#region event
async function onClickGroupPost(ma) {
  activeGroupPost = ma;
  groupPost.innerHTML = renderGroupPost(dataGroupPost, activeGroupPost);
  await getPost(ma);
}

// update cart propduct by list cart
function updateCartProduct(id) {
  listCardProduct.map((t) => {
    if (t._id === id) {
      return { ...t, amount: t.amount++ };
    }
    return { ...t };
  });
}

// update price of item in list cart
// function getTotal() {
//   const _total = listCardProduct
//     .map((t) => t.gia * t.amount)
//     .reduce((pre, current) => pre + current, 0);
//   totalCart.innerHTML = `$${_total}`;
// }

// update total price and quantify of item in list cart
function onClickCart(id) {
  const product = listProduct.find((t) => t._id == id);
  if (!product) {
    return;
  }
  const checkExist = listCardProduct.some((t) => t._id === id);
  if (checkExist) {
    updateCartProduct(id);
  } else {
    listCardProduct.push({ ...product, amount: 1 });
  }
  getTotal();
  cartListProduct.innerHTML = renderCartProduct(listCardProduct);
}
//#endregion

//#region render

// render cart in list item and update item in list cart with HTML (handle UI list cart Item)
function renderCartProduct(data) {
  return `${data
    .map((t) => {
      return `<div>
      <div class="cart-item-product">
      ${t.ten}: <span style="float: right;display: flex;
      align-items: center;"><span>${t.numFavorite}</span>&nbsp x  &nbsp
      <input
        type="number"
        id="quantity"
        value="${t.amount}"
        onchange="onage()"
        name="quantity"
        min="1"
        max="5"
     /></span>
    </div>
      </div>`;
    })
    .join("")}`;
}

// render GrPost in HTML
function renderGroupPost(data, ma) {
  return `${data
    .map((t) => {
      return `<button class="filter-item ${
        ma == t.ma ? "active-filter" : ""
      }"  onclick="onClickGroupPost('${t.ma}')">
                ${t.ten}
              </button>`;
    })
    .join("")}`;
}

// render Post in HTML
function renderPost(data) {
  return `${data
    .map((t) => {
      const _groupName = dataGroupPost.find((x) => x.ma == t.idGroupPost);
      return `<div class="post-box ${_groupName.ten}">
              <img
                src="${t.hinhAnh}"
                alt="Box1"
                class="post-img"
              />
              <h2 class="category">#Coding</h2>
              <a href=${t.urlDetail} class="post-title">
                ${t.tieuDe}
              </a>
              <span class="post-date">${moment(t.ngayTao).format(
                "DD-MMM-YYYY"
              )}</span>
              <span>
                ${t.noiDung}
              </span>
              <!-- Profile -->
              <div class="profile">
                <img
                  src="/Blog-YTB/img/khanh.jfif"
                  alt="profile"
                  class="profile-img"
                />
                <span class="profile-name">khanhleduy99er</span>
              </div>
            </div>`;
      console.log(t.hinhAnh);
    })
    .join("")}`;
}

// render item product hot favorite in HTML
function renderProduct(data) {
  return `${data
    .map((t) => {
      return `<div class="product-box">
              <img src="${t.hinhAnh}" alt="#" class="product-img" />
              <h2 class="product-title">${t.ten}</h2>
              <span class="favorite-product"><i class="fa-regular fa-thumbs-up"></i> ${t.numFavorite}</span>
              <!-- Login BTN -->
              <a href="${t.path}" class="post-detail-product">View-post</a>
            </div>`;
    })
    .join("")}`;
}

// render review Item of User in HTML
function renderReview(data) {
  return `${data
    .map((t) => {
      return `<div class="container-column">
              <img
                src="./img/review/quote-img.png"
                alt="quotes"
                class="quote-img"
              />
              <div class="container-info">
                <img src="./img/review/reviewer.jpg" alt="" class="reviewer" />
                <p class="reviewer-name"> ${t.ten}</p>
              </div>
              <div class="container-rating-star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half"></i>
              </div>
              <h5 class="category">@Technologies</h5>
              <p class="container-content-review">
              ${t.noiDung}
              </p>
            </div>`;
    })
    .join("")}`;
}
//#endregion

//#region api
async function getGroupPost() {
  const response = await axios.get(`${urlApi}/api/group-post`);
  dataGroupPost = response.data;
  groupPost.innerHTML = renderGroupPost(response.data, 0);
}
async function getPost(id) {
  const response = await axios.get(`${urlApi}/api/post`, {
    params: {
      idGroup: id,
    },
  });
  post.innerHTML = renderPost(response.data);
}
async function getProduct() {
  const response = await axios.get(`${urlApi}/api/product`);
  product.innerHTML = renderProduct(response.data);
  listProduct = response.data;
}
async function getReview() {
  const response = await axios.get(`${urlApi}/api/review-us`);
  review.innerHTML = renderReview(response.data);
}
//#endregion

// Open Cart List
cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

// Close Cart List
closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Cart Working Js
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
// Making Function
function ready() {
  // Remove function
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);

  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  // Quantity change
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // Add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
}

// Buy button
function buyButtonClicked() {
  alert("Your oder is placed");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

//  Remove items from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}
// Quantity changed
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// Add to Cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price-product")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already added this item to Shopping Cart");
      return;
    }
  }
  var cartBoxContent = `
        <img src="${productImg}" alt="items" class="cart-img">
        <div class="cart-detail">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" class="cart-quantity" value="1">
        </div>
        <!-- Remove items -->
        <i class="fa-regular fa-square-minus cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);

  updateTotal(); // Call the updateTotal function after adding the new product to the cart
}

// UpDate Total
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  // Sumary Price
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

// Filter Box
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("post-box");
  if (c == "all") {
    c = "";
  }
  for (i = 0; i < x.length; i++) {
    removeClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) {
      addClass(x[i], "show");
    }
  }
}

function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}
async function createReview(data) {
  var config = {
    method: "post",
    url: "http://localhost:8081/api/review-us",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios(config)
    .then(async function (response) {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("content").value = "";
      alert("Gửi feedback thành công");
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function onSubmitFeedback() {
  console.log(1);
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const content = document.getElementById("content").value;
  const data = {
    ten: name,
    email: email,
    soDienThoai: phone,
    noiDung: content,
  };
  await createReview(data);
}
