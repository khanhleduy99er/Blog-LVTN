// Cart List
let cartIcon = document.querySelector('#cart-shopping-icon');
let cart = document.querySelector('.cart-item');
let closeCart = document.querySelector('#close-cart-list');

// Onpen CartList
cartIcon.onclick = () => {
    cart.classList.add("active");
};
// Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

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
}
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
}