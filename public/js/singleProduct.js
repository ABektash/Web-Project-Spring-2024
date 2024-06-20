// const Product = require('../models/Product');

// async function validateInput(name, size) {
//     const product = await Product.findOne({ name: name, size: size });

//     if (!product) {
//         errorMessage.textContent = "Out of stock!"
//         errorMessage.style.display = 'block';
//         successMessage.style.display = 'none';
//         numberInput.style.border = "1px solid red";
//         selectElement.style.border = "";
//         return;
//     }

//     const numberInput = document.getElementById('numberInput');
//     const errorMessage = document.querySelector('.errorMessage');
//     const successMessage = document.querySelector('.successMessage');
//     const selectElement = document.getElementById('borderred');
//     const inputValue = parseInt(numberInput.value);



//     if (inputValue === 0 && size == "Select Size") {
//         errorMessage.textContent = "Please select size and add items to the cart!"
//         errorMessage.style.display = 'block';
//         successMessage.style.display = 'none';
//         numberInput.style.border = "1px solid red";
//         selectElement.style.border = "1px solid red";
//     }
//     else if (inputValue === 0) {
//         errorMessage.textContent = "Please add items to the cart!"
//         errorMessage.style.display = 'block';
//         successMessage.style.display = 'none';
//         numberInput.style.border = "1px solid red";
//         selectElement.style.border = "";

//     }
//     else if (size == "Select Size") {

//         errorMessage.textContent = "Please select a size!!"
//         errorMessage.style.display = 'block';
//         successMessage.style.display = 'none';
//         selectElement.style.border = "1px solid red";
//         numberInput.style.border = '';
//     }
//     else if (inputValue > product.quantity) {
//         errorMessage.textContent = "Out of stock!"
//         errorMessage.style.display = 'block';
//         successMessage.style.display = 'none';
//         numberInput.style.border = "1px solid red";
//         selectElement.style.border = "";

//     }
//     else {
//         errorMessage.style.display = "none";
//         successMessage.style.display = "block";
//         numberInput.style.border = '';
//         selectElement.style.border = "";
//         req.session.cart.push(product);
//         console.log(product);
//         console.log(req.session.cart);
//     }


// }




// // small images navigation 
// addEventListener("DOMContentLoaded", (event) => {
//     var mainImage = document.getElementById("MainImg");
//     var smallImage = document.getElementsByClassName("small-img");
//     smallImage[0].onclick = function () {
//         mainImage.src = smallImage[0].src;
//     }
//     smallImage[1].onclick = function () {
//         mainImage.src = smallImage[1].src;
//     }
//     smallImage[2].onclick = function () {
//         mainImage.src = smallImage[2].src;
//     }
//     smallImage[3].onclick = function () {
//         mainImage.src = smallImage[3].src;
//     }
// });


// document.getElementById('addToCartBtn').addEventListener('click', validateInput);