const DOM = {
    showPassword: document.getElementById("userdata_showpassword"),
    password: document.getElementById("userdata_password"),
    selectDNINIE: document.getElementById("personaldata-select_dninie"),
    inputDNINIE: document.getElementById("personaldata-input_dninie"),
    title: document.getElementById("postdata_title"),
    description: document.getElementById("postdata_description"),
    titleCount: document.getElementById("postdata-count_title"),
    descriptionCount: document.getElementById("postdata-count_description")
}

// Mostrar contraseña
DOM.showPassword.addEventListener("change", () => {
    DOM.password.type = DOM.showPassword.checked ? "text" : "password";
});

// Habilitar/Deshabilitar input DNI/NIE
DOM.selectDNINIE.addEventListener("change", () => {
    DOM.inputDNINIE.disabled = DOM.selectDNINIE.value ? false : true;
});

// Contar caracteres de título
DOM.title.addEventListener("input", (e) => {
    DOM.titleCount.textContent = `${e.target.value.length}/15`; 
})

// Contar caracteres de descripción
DOM.description.addEventListener("input", (e) => {
    DOM.descriptionCount.textContent = `${e.target.value.length}/120`; 
})




