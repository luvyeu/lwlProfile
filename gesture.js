const images = ["lwl-1.png", "lwl-2.png"]; // Replace these with your image filenames
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



document.addEventListener("DOMContentLoaded", function () {
    var displayedImage = document.getElementById("displayedImage");
    var zoomLevel = 1;
    var maxZoom = 3;
    var minZoom = 0.5;

    var lastX = 0;
    var lastY = 0;
    var isDragging = false;

    // Variables for pinch gesture
    var initialDistance = 0;
    var initialZoom = 1;

    function zoomIn() {
        if (zoomLevel < maxZoom) {
            zoomLevel += 0.1;
            updateZoomAndTranslate();
        }
    }

    function zoomOut() {
        if (zoomLevel > minZoom) {
            zoomLevel -= 0.1;
            updateZoomAndTranslate();
        }
    }

    function updateZoomAndTranslate() {
        displayedImage.style.transform = `scale(${zoomLevel}) translate(${lastX}px, ${lastY}px)`;
    }

    function handlePinch(event) {
        if (event.touches.length >= 2) {
            var x1 = event.touches[0].clientX;
            var y1 = event.touches[0].clientY;
            var x2 = event.touches[1].clientX;
            var y2 = event.touches[1].clientY;
            var distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

            if (initialDistance === 0) {
                initialDistance = distance;
                initialZoom = zoomLevel;
            } else {
                var scaleFactor = distance / initialDistance;
                zoomLevel = initialZoom * scaleFactor;
                if (zoomLevel > maxZoom) {
                    zoomLevel = maxZoom;
                } else if (zoomLevel < minZoom) {
                    zoomLevel = minZoom;
                }
                updateZoomAndTranslate();
            }
        }
    }

    function startDragging(e) {
        isDragging = true;
        lastX = e.clientX - displayedImage.getBoundingClientRect().left - displayedImage.clientLeft;
        lastY = e.clientY - displayedImage.getBoundingClientRect().top - displayedImage.clientTop;
    }

    function stopDragging() {
        isDragging = false;
    }

    function dragImage(e) {
        if (isDragging) {
            var offsetX = e.clientX - displayedImage.getBoundingClientRect().left - displayedImage.clientLeft;
            var offsetY = e.clientY - displayedImage.getBoundingClientRect().top - displayedImage.clientTop;
            lastX += offsetX - lastX;
            lastY += offsetY - lastY;
            displayedImage.style.transform = `scale(${zoomLevel}) translate(${lastX}px, ${lastY}px)`;
        }
    }

    displayedImage.addEventListener("touchstart", startDragging);
    document.addEventListener("touchmove", dragImage);
    document.addEventListener("touchend", stopDragging);
    document.addEventListener("gesturechange", handlePinch);
});
