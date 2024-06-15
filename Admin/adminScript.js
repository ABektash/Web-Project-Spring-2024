document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('content')) {
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');

    menuBar.addEventListener('click', function () {
      sidebar.classList.toggle('hide');
    })
  }
});




// Modal

var modal = document.getElementById('modal-Id');

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}