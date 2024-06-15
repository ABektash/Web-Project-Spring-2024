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
        document.getElementById('eText').style.display="block";
        document.getElementById('eText').style.color="red";

        document.getElementById('Subtotal').style.borderColor="red";
    } else {
        document.getElementById('errorText').style.display = 'none';
        document.getElementById('eText').style.display="none";
        document.getElementById('Subtotal').style.borderColor="";
        window.location.href = 'BuyPage.html';
    }
}



addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('remIcon').addEventListener('click', function() {
    
        var tr = this.parentNode.parentNode.parentNode;
        tr.style.display = 'none';
    }); });