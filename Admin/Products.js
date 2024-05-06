function printError(elemId, hintMsg) {
  document.getElementById(elemId).innerHTML = hintMsg;
}

function validateForm() {
  event.preventDefault(); // Prevent default form submission

  var form = document.getElementById("productForm"); // Get the form element
  var name = form.name.value;
  var price = form.price.value;
  var quantity = form.quantity.value;
  var selectelement = document.getElementById("SelectSize");
  var size = selectelement.value.trim();
  var image = form.image.value;

  var nameErr =
    (priceErr =
    quantityErr =
    sizeErr =
    imageErr =
    selectErr =
      false);

  if (name == "") {
    printError("nameErr", "Please enter the name of the product");
    nameErr = true;
  } else {
    printError("nameErr", "");
  }

  if (price == "") {
    printError("priceErr", "Please enter the price of the product");
    priceErr = true;
  } else {
    printError("priceErr", "");
  }

  if (quantity == "") {
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

  if (image == "") {
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
