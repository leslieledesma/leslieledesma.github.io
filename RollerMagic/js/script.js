// Al cargar cada página
window.addEventListener("DOMContentLoaded", () => {
    const savedMode = getCookie("mode");
    const savedFontSize = getCookie("fontsize");
    if (savedMode) {
        document.body.className = savedMode;
    } else {
        document.body.className = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
        saveCookie("mode", document.body.className);
        saveCookie("fontSize", document.body.style.fontSize);
    }
    if (savedFontSize) {
        currentFontSizeLevel = parseInt(savedFontSize);
    } else {
        currentFontSizeLevel = 2;
    }
    updateFontSize();
    document.getElementById("mode").children[0].classList.add(document.body.className == "dark" ? "fa-sun" : "fa-moon");
});

// Al hacer clic en el botón de cambio de modo
document.getElementById("mode").addEventListener("click", () => {
    document.body.className = document.body.className === "dark" ? "light" : "dark";
    saveCookie("mode", document.body.className, 7);
    toggleMode();
});

// Configuración de niveles de tamaño
const baseFontSize = 1;
const step = 0.08;
let currentFontSizeLevel;

// Reducir el tamaño de la fuente
document.getElementById("fontSizeDown").addEventListener("click", () => {
    if (currentFontSizeLevel > 0) {
        currentFontSizeLevel--;
        updateFontSize();
    }
});

// Restablecer el tamaño de la fuente
document.getElementById("fontSizeDefault").addEventListener("click", () => {
    currentFontSizeLevel = 2;
    updateFontSize();
});

// Aumentar el tamaño de la fuente
document.getElementById("fontSizeUp").addEventListener("click", () => {
    if (currentFontSizeLevel < 4) {
        currentFontSizeLevel++;
        updateFontSize();
    }
});


// Actualizar la variable CSS y guardar en cookie
function updateFontSize() {
    const newFontSize = baseFontSize + (currentFontSizeLevel - 2) * step;
    document.documentElement.style.setProperty("--font-size", `${newFontSize}em`);
    saveCookie("fontsize", currentFontSizeLevel, 7);
}

// Cambiar icono según el modo
function toggleMode() {
    document.getElementById("mode").children[0].classList.toggle("fa-sun");
    document.getElementById("mode").children[0].classList.toggle("fa-moon");
}

// Marcar/desmarcar icono favoritos
function setFavorite() {
    let fav = document.getElementById("set-favorite_icon");
    fav.classList.toggle("fa-solid");
    fav.classList.toggle("fa-regular");
}

// COOKIES
function saveCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}
function getCookie(name) {
    let cookies = document.cookie.split('; ');
    let cookie = cookies.find(row => row.includes(`${name}=`));
    return cookie ? (cookie.split("="))[1] : null;
}