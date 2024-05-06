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
  

  var nameErr = priceErr = quantityErr = sizeErr = imageErr = true;

  if (name == "") {
      printError("nameErr", "Please enter the name of the product");
  } else {
      printError("nameErr", "");
      nameErr = false;
  }

  if (price == "") {
      printError("priceErr", "Please enter the price of the product");
  } else {
      printError("priceErr", "");
      priceErr = false;
  }

  if (quantity == "") {
      printError("quantityErr", "Please enter the number of available pieces");
  } else {
      printError("quantityErr", "");
      quantityErr = false;
  }

  if (size === "Select Size") {
      printError("sizeErr", "Please select a size");
  } else {
      printError("sizeErr", "");
      sizeErr = false;
  }

  if (image == "") {
      printError("imageErr", "Please upload an image");
  } else {
      printError("imageErr", "");
      imageErr = false;
  }

  if (nameErr || priceErr || quantityErr || sizeErr || imageErr) {
      return false;
  }
  return true;
}
