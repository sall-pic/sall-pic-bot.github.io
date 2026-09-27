const translations = {
    ru: {

        title: "Image Cleaner",
        subtitle: "Удали цензуру вручную,<br>используя оригинальную версию изображения.",

        preparation: "Подготовка",
        preparationText: "Загрузи две версии одного изображения",

        censored: "Цензурная картинка",
        censoredText: "Версия с цензурой",

        original: "Оригинальная картинка",
        originalText: "Версия без цензуры",

        select: "Выбрать",
        change: "Заменить",

        editor: "Редактор",
        editorText: "Стирай пальцем/мышкой по изображению",

        eraser: "Ластик",
        brushSize: "Размер ластика",

        footer: "Image Cleaner",
        telegramApp: "Telegram Mini App",

        save: "Сохранить",
        saveCensored: "Цензурную картинку",
        saveOriginal: "Оригинальную картинку",
        saveBoth: "Обе картинки",

        undo: "Отменить",
        reset: "Сбросить"
    },

    en: {

        title: "Image Cleaner",
        subtitle: "Remove censorship manually,<br>using the original image.",

        preparation: "Preparation",
        preparationText: "Upload two versions of the same image",

        censored: "Censored image",
        censoredText: "Version with censorship",

        original: "Original image",
        originalText: "Uncensored version",

        select: "Select",
        change: "Change",

        editor: "Editor",
        editorText: "Erase with your finger/mouse",

        eraser: "Eraser",
        brushSize: "Brush size",

        footer: "Image Cleaner",
        telegramApp: "Telegram Mini App",
        
        save: "Save",
        saveCensored: "Censored image",
        saveOriginal: "Original image",
        saveBoth: "Both images",
        undo: "Undo",
        reset: "Reset"
    }
};
let currentLanguage = "ru";

const languageToggle = document.getElementById("languageToggle");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const preparation = document.getElementById("preparation");
const preparationText = document.getElementById("preparationText");
const censored = document.getElementById("censored");
const censoredText = document.getElementById("censoredText");
const original = document.getElementById("original");
const originalText = document.getElementById("originalText");
const editor = document.getElementById("editor");
const editorText = document.getElementById("editorText");
const eraser = document.getElementById("eraser");
const brushSizeText = document.getElementById("brushSizeText");
const censoredSelect = document.getElementById("censoredSelect");
const originalSelect = document.getElementById("originalSelect");
const censoredChange = document.getElementById("censoredChange");
const originalChange = document.getElementById("originalChange");
const languageFlag = document.getElementById("languageFlag");
const languageCode = document.getElementById("languageCode");
const saveButton = document.getElementById("saveButton");
const saveButtonText = document.getElementById("saveButtonText");
const undoButton = document.getElementById("undoButton");
const undoButtonText = document.getElementById("undoButtonText");

const resetButton = document.getElementById("resetButton");
const resetButtonText = document.getElementById("resetButtonText");
const saveArrow = document.getElementById("saveArrow");
const saveMenu = document.getElementById("saveMenu");
const saveCensored = document.getElementById("saveCensored");
const saveOriginal = document.getElementById("saveOriginal");
const saveBoth = document.getElementById("saveBoth");

      languageToggle.addEventListener("click", function () {

    if (currentLanguage === "ru") {

        currentLanguage = "en";

        languageFlag.className = "flag flag-en";
        languageCode.textContent = "EN";

        censoredChange.textContent = translations.en.change;
        originalChange.textContent = translations.en.change;
        
        title.textContent = translations.en.title;
        subtitle.innerHTML = translations.en.subtitle;
        saveButtonText.textContent = translations.en.save;
        saveCensored.textContent = translations.en.saveCensored;
        saveOriginal.textContent = translations.en.saveOriginal;
        saveBoth.textContent = translations.en.saveBoth;
        preparation.textContent = translations.en.preparation;
        preparationText.textContent = translations.en.preparationText;
        censored.textContent = translations.en.censored;
        censoredText.textContent = translations.en.censoredText;
        original.textContent = translations.en.original;
        originalText.textContent = translations.en.originalText;
        editor.textContent = translations.en.editor;
        editorText.textContent = translations.en.editorText;
        eraser.textContent = "✦ " + translations.en.eraser;
        brushSizeText.textContent = translations.en.brushSize;
        undoButtonText.textContent = translations.en.undo;
        resetButtonText.textContent = translations.en.reset;

        censoredSelect.textContent = translations.en.select;
        originalSelect.textContent = translations.en.select;

     } else {

        currentLanguage = "ru";

        languageFlag.className = "flag flag-ru";
        languageCode.textContent = "RU";

        censoredChange.textContent = translations.ru.change;
        originalChange.textContent = translations.ru.change;

        title.textContent = translations.ru.title;
        subtitle.innerHTML = translations.ru.subtitle;

        saveButtonText.textContent = translations.ru.save;
        saveCensored.textContent = translations.ru.saveCensored;
        saveOriginal.textContent = translations.ru.saveOriginal;
        saveBoth.textContent = translations.ru.saveBoth;

        preparation.textContent = translations.ru.preparation;
        preparationText.textContent = translations.ru.preparationText;
        censored.textContent = translations.ru.censored;
        censoredText.textContent = translations.ru.censoredText;
        original.textContent = translations.ru.original;
        originalText.textContent = translations.ru.originalText;
        editor.textContent = translations.ru.editor;
        editorText.textContent = translations.ru.editorText;
        eraser.textContent = "✦ " + translations.ru.eraser;
        brushSizeText.textContent = translations.ru.brushSize;
        undoButtonText.textContent = translations.ru.undo;
        resetButtonText.textContent = translations.ru.reset;

        censoredSelect.textContent = translations.ru.select;
        originalSelect.textContent = translations.ru.select;

    }
});
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
         censoredSelect.style.display = "none";
         censoredChange.style.display = "block";
    };

    image.src = imageUrl;
});

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
        originalSelect.style.display = "none";
        originalChange.style.display = "block";
    };

    image.src = imageUrl;
});

function checkImages() {
    if (censoredImage && originalImage) {
        setupEditor();
        saveButton.disabled = !(censoredImage && originalImage);
    }
}

function setupEditor() {

    const width = originalImage.naturalWidth;
    const height = originalImage.naturalHeight;
    
    originalCanvas.width = width;
    originalCanvas.height = height;

    censoredCanvas.width = width;
    censoredCanvas.height = height;

    originalCtx.clearRect(0, 0, width, height);

    originalCtx.drawImage(
        originalImage,
        0,
        0,
        width,
        height
    );

    censoredCtx.clearRect(0, 0, width, height);

    censoredCtx.drawImage(
        censoredImage,
        0,
        0,
        width,
        height
    );

    imageContainer.style.display = "block";
}

let isErasing = false;
let undoHistory = [];

censoredCanvas.addEventListener("pointerdown", function (event) {

    if (event.button !== 0) {
        return;
    }

     event.preventDefault();

    undoHistory.push(
        censoredCtx.getImageData(
            0,
            0,
            censoredCanvas.width,
            censoredCanvas.height
        )
    );

    undoButton.disabled = false;

    isErasing = true;

    censoredCanvas.setPointerCapture(event.pointerId);

    erase(event);
});

censoredCanvas.addEventListener("pointerdown", function (event) {

    if (event.button !== 0) {
        return;
    }

    event.preventDefault();

    isErasing = true;

    censoredCanvas.setPointerCapture(event.pointerId);

    erase(event);
});

censoredCanvas.addEventListener("pointermove", function (event) {

    if (!isErasing) {
        return;
    }
    
    if (event.buttons !== 1) {

        isErasing = false;

        return;
    }

    erase(event);
});

censoredCanvas.addEventListener("pointerup", function (event) {

    isErasing = false;

    if (censoredCanvas.hasPointerCapture(event.pointerId)) {
        censoredCanvas.releasePointerCapture(event.pointerId);
    }
});

undoButton.addEventListener("click", function () {

    if (undoHistory.length === 0) {
        return;
    }

    const previousState = undoHistory.pop();

    censoredCtx.putImageData(previousState, 0, 0);

    if (undoHistory.length === 0) {
        undoButton.disabled = true;
        resetButton.disabled = true;
    }

});

censoredCanvas.addEventListener("pointercancel", function () {

    isErasing = false;
});

censoredCanvas.addEventListener("lostpointercapture", function () {

    isErasing = false;
});

function erase(event) {

    const rect = censoredCanvas.getBoundingClientRect();

    const scaleX = censoredCanvas.width / rect.width;
    const scaleY = censoredCanvas.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;


    censoredCtx.save();

    censoredCtx.globalCompositeOperation = "destination-out";

    resetButton.disabled = false;


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

saveButton.addEventListener("click", function () {
    if (saveMenu.style.display === "block") {
        saveMenu.style.display = "none";
        saveArrow.textContent = "▾";
    } else {
        saveMenu.style.display = "block";
        saveArrow.textContent = "▴";
    }
});

document.addEventListener("click", function (event) {
    if (!saveButton.contains(event.target) && !saveMenu.contains(event.target)) {
        saveMenu.style.display = "none";
        saveArrow.textContent = "▾";
    }
});

saveCensored.addEventListener("click", function () {
    const link = document.createElement("a");

    link.download = "image-cleaner-censored.png";
    link.href = censoredCanvas.toDataURL("image/png");

    link.click();

    saveMenu.style.display = "none";
});

saveOriginal.addEventListener("click", function () {
    const link = document.createElement("a");

    link.download = "image-cleaner-original.png";
    link.href = originalCanvas.toDataURL("image/png");

    link.click();

    saveMenu.style.display = "none";
});

saveBoth.addEventListener("click", function () {
    const censoredLink = document.createElement("a");

    censoredLink.download = "image-cleaner-censored.png";
    censoredLink.href = censoredCanvas.toDataURL("image/png");
    censoredLink.click();

    const originalLink = document.createElement("a");

    originalLink.download = "image-cleaner-original.png";
    originalLink.href = originalCanvas.toDataURL("image/png");
    originalLink.click();

    saveMenu.style.display = "none";
});

resetButton.addEventListener("click", function () {

    if (!censoredImage) {
        return;
    }

    censoredCanvas.width = censoredImage.width;
    censoredCanvas.height = censoredImage.height;

    censoredCtx.clearRect(
        0,
        0,
        censoredCanvas.width,
        censoredCanvas.height
    );

    censoredCtx.drawImage(
        censoredImage,
        0,
        0,
        censoredCanvas.width,
        censoredCanvas.height
    );

   undoHistory = [];

   undoButton.disabled = true;
   resetButton.disabled = true;

});

censoredCtx.restore();
}
