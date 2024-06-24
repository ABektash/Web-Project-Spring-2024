function editShirtNumber() {
  var currentNumber = document.getElementById("number").textContent;
  var textBox = document.createElement("input");
  textBox.type = "text";
  textBox.id = "newShirtNumber";
  textBox.maxLength = 2;
  textBox.style.width= "2ch";
  textBox.style.fontSize= "30px";
  textBox.value = currentNumber;
  textBox.setSelectionRange(0, 2);
  var numberElement = document.getElementById("number");
  var existingTextBox = document.getElementById("newShirtNumber");

  if (existingTextBox !== null) {
    numberElement.parentNode.removeChild(existingTextBox);
  }
  numberElement.parentNode.insertBefore(textBox, numberElement);
  numberElement.style.visibility = "hidden";

  function updateShirtNumber() {
    var newNumber = document.getElementById("newShirtNumber").value;

    if (/^\d{1,2}$/.test(newNumber)) {
      document.getElementById("number").textContent = newNumber;
      document.getElementById("shirtNumber").textContent = newNumber;
      document.querySelector(".buyShirtNumber").textContent = "Shirt number: " + newNumber;
    } else {
      return;
    }

    textBox.parentNode.removeChild(textBox);
    numberElement.style.visibility = "visible";
  }

  textBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      updateShirtNumber();
    }
  });

  textBox.addEventListener("blur", updateShirtNumber);
}

function editShirtName() {
  var currentName = document.getElementById("shirtName").textContent;
  var textBox = document.createElement("input");
  textBox.type = "text";
  textBox.maxLength = 9;
  textBox.id = "newShirtName";
  textBox.style.fontSize= "20px";
  textBox.style.width = "9ch";
  textBox.setSelectionRange(0, currentName.length);
  var nameElement = document.getElementById("shirtName");
  var existingTextBox = document.getElementById("newShirtName");

  if (existingTextBox !== null) {
    nameElement.parentNode.removeChild(existingTextBox);
  }
  nameElement.parentNode.insertBefore(textBox, nameElement);
  nameElement.style.visibility = "hidden";

  function updateShirtName() {
    var newName = document.getElementById("newShirtName").value;

    if (newName.trim() !== "") {
      document.getElementById("shirtName").textContent = newName;
      document.querySelector(".buyShirtName").textContent = newName + " custom kit";
      document.getElementById("name").textContent = newName;
    } else {
      return;
    }

    textBox.parentNode.removeChild(textBox);
    nameElement.style.visibility = "visible";
  }

  textBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      updateShirtName();
    }
  });

  textBox.addEventListener("blur", updateShirtName);
}


