function printError(elemId, hintMsg) {
  document.getElementById(elemId).innerHTML = hintMsg;
}

function validateForm() {
  event.preventDefault();

  var form = document.getElementById("productForm");
  var name = form.name.value.trim();
  var price = form.price.value.trim();
  var quantity = form.quantity.value.trim();
  var selectelement = document.getElementById("SelectSize");
  var size = selectelement.value.trim();
  var image = form.image.value.trim();

  var nameErr = false,
    priceErr = false,
    quantityErr = false,
    sizeErr = false,
    imageErr = false;

  var nameRegex = /^[a-zA-Z\s\W]+$/;
  if (name === "") {
    printError("nameErr", "Please enter the name of the product");
    nameErr = true;
  } else if (!nameRegex.test(name)) {
    printError("nameErr", "Please enter a valid name");
    nameErr = true;
  } else {
    printError("nameErr", "");
  }

  var priceRegex = /^[0-9.,\s\W]+$/;
  if (price === "") {
    printError("priceErr", "Please enter the price of the product");
    priceErr = true;
  } else if (!priceRegex.test(price)) {
    printError("priceErr", "Please enter a valid price");
    priceErr = true;
  } else {
    printError("priceErr", "");
  }

  if (quantity === "") {
    printError("quantityErr", "Please enter the number of available pieces");
    quantityErr = true;
  } else {
    printError("quantityErr", "");
  }

  if (size === "selectSize") {
    printError("sizeErr", "Please select a size");
    sizeErr = true;
  } else {
    printError("sizeErr", "");
  }

  if (productImg === "") {
    printError("imageErr", "Please upload an image");
    imageErr = true;
  } else {
    printError("imageErr", "");
  }

  if (!nameErr && !priceErr && !quantityErr && !sizeErr && !imageErr) {
    var submitBtn = form.querySelector('input[type="submit"]');
    submitBtn.style.boxShadow = "0 3px 0 green";
    submitBtn.style.backgroundColor = "green";
    submitBtn.value = "Successful!!";
    form.querySelector(".succ").style.display = "block";

    return true;
  }
  return false;
}
