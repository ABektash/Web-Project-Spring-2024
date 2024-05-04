function validateAndProceed() {
    var quantities = document.querySelectorAll('#cart tbody input[type="number"]');
    var thirdInput = quantities[2]; 
    var validInput = true;

    if (thirdInput.value > 5) {
        validInput = false;
        thirdInput.style.border = '2px solid red';
    } else {
        thirdInput.style.border = '1px solid #ccc';
    }

    if (!validInput) {
        document.getElementById('errorText').style.display = 'block';
        document.getElementById('errorText').style.color = 'red';
        document.getElementById('sucText').style.display="none";
    } else {
        document.getElementById('errorText').style.display = 'none';
        document.getElementById('sucText').style.display="block";
        document.getElementById('sucText').style.color="green";
    }
}

document.getElementById('checkout-btn').addEventListener('click', validateAndProceed);


function validateAddress() {
    var addressInput = document.getElementById('addText').value.trim();
    var addressError = document.getElementById('addressError');
    var addressSucc = document.getElementById('addressSucc');

    if (addressInput === '') {
        addressError.textContent = 'Please enter your address';
        addressError.style.color = 'red';
        addressError.style.display="block";
        addressSucc.style.display="none";
         
    } else {
        addressSucc.textContent = 'successfull';
        addressSucc.style.color = 'green';
        addressSucc.style.display="block";
        addressError.style.display="none";
    }
    document.getElementById('submit').addEventListener('click', validateAddress);
}