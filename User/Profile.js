function editShirtNumber() {
    var currentNumber = document.getElementById("number").textContent;
    var textBox = document.createElement("input");
    textBox.type = "text";
    textBox.id = "newShirtNumber";
    textBox.maxLength = 2;
    textBox.style.width = "2ch";
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

function showPopup() {
    var popup = document.getElementById("myPopUp");
    var btn = document.getElementById("showPopUp");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        popup.style.display = "block";
    }

    span.onclick = function() {
        popup.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }
}





