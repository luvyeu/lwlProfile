const images = ["page1.jpg", "page2.jpg", "page3.jpg"]; // Replace these with your image filenames
let currentIndex = 0;

const imageView = document.getElementById("image-viewer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function showImage(index) {
    imageView.src = images[index];
}

prevBtn.addEventListener("click", function() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

nextBtn.addEventListener("click", function() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});
