const DOM = {
    username: document.getElementById("userdata_username"),
    password: document.getElementById("userdata_password"),
    showPassword: document.getElementById("userdata_showpassword"),

    name: document.getElementById("personaldata_name"),
    surname: document.getElementById("personaldata_surname"),
    phone: document.getElementById("personaldata_telephone"),
    postalCode: document.getElementById("personaldata_cp"),

    selectDNINIE: document.getElementById("personaldata-select_dninie"),
    inputDNINIE: document.getElementById("personaldata-input_dninie"),
    accounttype: document.getElementsByName("CuentaComo"),
    birthyearSelect: document.getElementById("personaldata_birthyear"),

    hobbiesInput: document.getElementById("hobbies"),
    hobbiesList: document.querySelectorAll(".aficiones input[type=checkbox]"),

    title: document.getElementById("postdata_title"),
    description: document.getElementById("postdata_description"),
    titleCount: document.getElementById("postdata-count_title"),
    descriptionCount: document.getElementById("postdata-count_description"),

    form: document.getElementById("form"),
    inputList: document.querySelectorAll("input[type=text]"),

    erroresSection: document.getElementById("errores"),
}

// Generar las opciones para el año de nacimiento
const startYear = 1920;
const endYear = 2010;
for (let year = startYear; year <= endYear; year++) {
    let option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    DOM.birthyearSelect.appendChild(option);
}

// Mostrar/ocultar contraseña
DOM.showPassword.addEventListener("change", () => {
    DOM.password.type = DOM.showPassword.checked ? "text" : "password";
});

// Deshabilitar uso de letras en el input de Código Postal
DOM.postalCode.addEventListener("keydown", (e) => {
    if (/^[a-zA-Z\s]$/.test(e.key)) {
        e.preventDefault();
    }
});

// Habilitar/deshabilitar input del tipo de documento y establecer placeholder
DOM.selectDNINIE.addEventListener("change", (e) => {
    DOM.inputDNINIE.disabled = e.target.value ? false : true;
    DOM.inputDNINIE.setAttribute("placeholder", `${e.target.value == "DNI" ? "Ej: 12345678A" : "Ej: X1234567A"}`)
});

// TODO: Validación del tipo de documento
DOM.selectDNINIE.addEventListener("change", (e) => {
        // .setCustomValidity("Mensaje");
        esDniNieValido(e.target.value)

    function esDniNieValido(value) {
        value = value.toUpperCase().trim();
        
        // Patrones para DNI y NIE
        const dniPattern = /^\d{8}[A-HJ-NP-TV-Z]$/;
        const niePattern = /^[XYZ]\d{7}[A-HJ-NP-TV-Z]$/;
    
        if (!dniPattern.test(value) && !niePattern.test(value)) {
            return false; // No coincide con el formato esperado
        }
    
        // Si es un NIE, sustituimos la letra inicial por su correspondiente número
        if (niePattern.test(value)) {
            const niePrefix = { X: "0", Y: "1", Z: "2" };
            value = value.replace(/^[XYZ]/, letra => niePrefix[letra]);
        }
    
        const numero = parseInt(value.slice(0, 8), 10);
        const letra = value.slice(-1);
    
        const letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
        const letraEsperada = letrasValidas[numero % 23];
        return letra === letraEsperada;
    }
});

// Comprobar y dar valor al input de aficiones
DOM.hobbiesList.forEach(hobby => {
    hobby.addEventListener("change", () => {
        let hobbiesList = [...DOM.hobbiesList];
        let checkedHobbies = hobbiesList.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        DOM.hobbiesInput.value = checkedHobbies.length >= 2 ? checkedHobbies.join(",") : "";
    })
});

// Contar caracteres de título
DOM.title.addEventListener("input", (e) => {
    DOM.titleCount.textContent = `${e.target.value.length}/15`; 
})

// Contar caracteres de descripción
DOM.description.addEventListener("input", (e) => {
    DOM.descriptionCount.textContent = `${e.target.value.length}/120`; 
})



// Validación de errores
let checkValidationInput = [DOM.username, DOM.password, DOM.name, DOM.surname, DOM.phone, DOM.postalCode, DOM.inputDNINIE, DOM.birthyearSelect, DOM.hobbiesInput, DOM.title, DOM.description];
// TODO: quitar el mensaje de los checkbox e input radio
checkValidationInput.forEach(element => {
    element.addEventListener("input", (e) => {
        if (e.target.validationMessage == ""){
            e.target.nextElementSibling.textContent = "";
        }
    })
});
DOM.form.addEventListener("submit", (e) => {
    DOM.form.setAttribute("class", "submitted");

    // TODO: validar input radio
    checkValidationInput.forEach(element => {
        if (!element.validationMessage == ""){
            e.preventDefault();
            let span = element.nextElementSibling;
            span.textContent = element.validationMessage;
            span.setAttribute("class", "errormessage");
        }
    })
    if (!DOM.selectDNINIE.validationMessage == ""){
        e.preventDefault();
        let span = document.getElementById("personaldata-error_doctype");
        span.textContent = DOM.selectDNINIE.validationMessage;
        span.setAttribute("class", "errormessage");
    }
})

// TODO: Agregar los validationMessage en el section de la derecha