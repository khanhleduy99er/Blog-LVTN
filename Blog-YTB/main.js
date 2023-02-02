let cartIcon = document.querySelector('#cart-shopping-icon');
let cart = document.querySelector('.cart-item');
let closeCart = document.querySelector('#close-cart-list');

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
}else {
    ready();
}
// Making Function
function ready(){
    // Remove function
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);

    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // Quantity change
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    // Add to cart
    var addCart = document.getElementsByClassName('cart-icon');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
}
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}
// Quantity changed
function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}
// Add to Cart
function addCartClicked(event){
    var button= event.target;
    var shopProducts = button.parentElement;
    var titleElem = shopProducts.getElementsByClassName('reviewer-name')[0];
    console.log(shopProducts.getElementsByClassName('reviewer-name'));
    if (titleElem) {
        var title = titleElem.innerText;
        console.log(title);
      } else {
        console.error('The element with class name "reviewer-name" was not found');
      }
    console.log(title);
}


// UpDate Total
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$',''));
        var quantity = quantityElement.value;
        total = total + price * quantity;
        // Sumary Price
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    }
}