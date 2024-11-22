document.body.classList.add(window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");
setMode();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", () => {
    document.body.className = checkHighContrast(getPreference());
    setMode();
})

document.getElementById("contrast-input").addEventListener("change", () => {
    document.body.className = checkHighContrast(getColorScheme());
});

function changeMode() {
    if (document.getElementById("contrast-input").checked)
        document.body.className = includesClass("dark") ? "high-contrast_light" : "high-contrast_dark";
    else   
        document.body.className = includesClass("dark") ? "light" : "dark";

    toggleMode();
}

function getPreference() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return "dark";
    }
    return "light";
}

function getColorScheme() {
    if (includesClass("dark")) {
        return "dark";
    }
    return "light";
}

function setFavorite() {
    let fav = document.getElementById("set-favorite_icon");
    fav.classList.toggle("fa-solid");
    fav.classList.toggle("fa-regular");
}

function includesClass(c) {
    return (document.body.className).includes(c);
}

function checkHighContrast(scheme) {
    return document.getElementById("contrast-input").checked ? `high-contrast_${scheme}` : scheme;
}

function toggleMode() {
    document.getElementById("mode").children[0].classList.toggle("fa-sun");
    document.getElementById("mode").children[0].classList.toggle("fa-moon");
}

function setMode() {
    document.getElementById("mode").children[0].className = window.matchMedia('(prefers-color-scheme: dark)').matches ? "fa-solid fa-sun" : "fa-solid fa-moon";
}