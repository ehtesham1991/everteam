
// Get the modal
var modal = document.getElementById("zoom-image");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg2");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that image-closes the modal
var span = document.getElementsByClassName("image-close")[0];

// When the user clicks on <span> (x), image-close the modal
span.onclick = function() { 
  modal.style.display = "none";
}
