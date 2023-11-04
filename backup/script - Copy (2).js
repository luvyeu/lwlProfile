let currentPage = 1;
let pdf = null;

// Load the PDF file and render pages
const pdfUrl = 'LEE WEI LOU-Talent.pdf'; // Replace with the path to your PDF file

pdfjsLib.getDocument(pdfUrl).promise.then(pdfDocument => {
    pdf = pdfDocument;
    renderPage(currentPage);
});

function renderPage(pageNumber) {
    if (pageNumber <= 0 || pageNumber > pdf.numPages) {
        return;
    }

    pdf.getPage(pageNumber).then(page => {
        const canvas = document.getElementById('pdf-canvas');
        const context = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        page.render({
            canvasContext: context,
            viewport: viewport
        });
    });
}

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentPage < pdf.numPages) {
        currentPage++;
        renderPage(currentPage);
    }
});
