const censoredInput = document.getElementById("censoredInput");
const originalInput = document.getElementById("originalInput");

const imageContainer = document.getElementById("imageContainer");

const originalCanvas = document.getElementById("originalCanvas");
const censoredCanvas = document.getElementById("censoredCanvas");

const originalCtx = originalCanvas.getContext("2d");
const censoredCtx = censoredCanvas.getContext("2d");

let censoredImage = null;
let originalImage = null;

let brushSize = 80;

const brushSizeSlider = document.getElementById("brushSize");
const brushSizeValue = document.getElementById("brushSizeValue");

brushSizeSlider.addEventListener("input", function () {
    brushSize = Number(brushSizeSlider.value);

    brushSizeValue.textContent = brushSize;
});


// -------------------------
// Загрузка цензурной картинки
// -------------------------

censoredInput.addEventListener("change", function () {
    const file = censoredInput.files[0];

    if (!file) {
        return;
    }

    const imageUrl = URL.createObjectURL(file);

    const image = new Image();

    image.onload = function () {
        censoredImage = image;
        checkImages();
    };

    image.src = imageUrl;
});


// -------------------------
// Загрузка оригинальной картинки
// -------------------------

originalInput.addEventListener("change", function () {
    const file = originalInput.files[0];

    if (!file) {
        return;
    }

    const imageUrl = URL.createObjectURL(file);

    const image = new Image();

    image.onload = function () {
        originalImage = image;
        checkImages();
    };

    image.src = imageUrl;
});


// -------------------------
// Проверяем обе картинки
// -------------------------

function checkImages() {
    if (censoredImage && originalImage) {
        setupEditor();
    }
}


// -------------------------
// Создаём редактор
// -------------------------

function setupEditor() {

    const width = originalImage.naturalWidth;
    const height = originalImage.naturalHeight;

    // Размер обоих Canvas
    originalCanvas.width = width;
    originalCanvas.height = height;

    censoredCanvas.width = width;
    censoredCanvas.height = height;


    // Рисуем оригинал на нижнем Canvas
    originalCtx.clearRect(0, 0, width, height);

    originalCtx.drawImage(
        originalImage,
        0,
        0,
        width,
        height
    );


    // Рисуем цензуру на верхнем Canvas
    censoredCtx.clearRect(0, 0, width, height);

    censoredCtx.drawImage(
        censoredImage,
        0,
        0,
        width,
        height
    );


    // Показываем редактор
    imageContainer.style.display = "block";
}


// -------------------------
// ЛАСТИК
// -------------------------

let isErasing = false;


// Начало стирания
censoredCanvas.addEventListener("pointerdown", function (event) {

    isErasing = true;

    erase(event);
});


// Движение ластика
censoredCanvas.addEventListener("pointermove", function (event) {

    if (!isErasing) {
        return;
    }

    erase(event);
});


// Закончили стирать
censoredCanvas.addEventListener("pointerup", function () {

    isErasing = false;
});


censoredCanvas.addEventListener("pointerleave", function () {

    isErasing = false;
});


// -------------------------
// Функция стирания
// -------------------------

function erase(event) {

    const rect = censoredCanvas.getBoundingClientRect();

    const scaleX = censoredCanvas.width / rect.width;
    const scaleY = censoredCanvas.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;


    censoredCtx.save();

    // Делаем рисуемое место прозрачным
    censoredCtx.globalCompositeOperation = "destination-out";


    censoredCtx.beginPath();

    censoredCtx.arc(
        x,
        y,
        brushSize / 2,
        0,
        Math.PI * 2
    );

    censoredCtx.fill();


    censoredCtx.restore();
}