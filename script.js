var timeout;

function hideIntro() {
    var introDiv = document.getElementById("intro");
    introDiv.style.opacity = "0"; 
    setTimeout(function() {
        introDiv.style.position = "hidden";
    }, 500); 
}



document.addEventListener("mousemove", function() {
    var introDiv = document.getElementById("intro");
    introDiv.style.position = "visible";
    introDiv.style.opacity = "1"; 

    clearTimeout(timeout);

    timeout = setTimeout(hideIntro, 5000); 
});
