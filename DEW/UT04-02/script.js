const DOM = {
    input: {
        username: document.getElementById("userdata_username"),
        password: document.getElementById("userdata_password"),
        name: document.getElementById("personaldata_name"),
        surname: document.getElementById("personaldata_surname"),
        phone: document.getElementById("personaldata_telephone"),
        postalCode: document.getElementById("personaldata_cp"),
        documentValue: document.getElementById("personaldata-input_dninie"),
        hobbies: document.getElementById("personaldata_hobbies"),
        title: document.getElementById("postdata_title"),
        description: document.getElementById("postdata_description"),
    },
    select: {
        documentType: document.getElementById("personaldata-select_dninie"),
        birthyear: document.getElementById("personaldata_birthyear"),
        accountType: document.getElementById("accounttype_particular"),
    },
    
    showPassword: document.getElementById("userdata_showpassword"),
    accountType: document.querySelectorAll("input[name=CuentaComo]"),
    hobbiesList: document.querySelectorAll(".aficiones input[type=checkbox]"),
    titleCount: document.getElementById("postdata-count_title"),
    descriptionCount: document.getElementById("postdata-count_description"),
    form: document.getElementById("form"),
    inputList: document.querySelectorAll("input[type=text]"),
    erroresSection: document.getElementById("errores"),
}

const errorDisplay = {
    username: document.getElementById("userdata-error_username"),
    password: document.getElementById("userdata-error_password"),
    name: document.getElementById("personaldata-error_name"),
    surname: document.getElementById("personaldata-error_surname"),
    phone: document.getElementById("personaldata-error_telephone"),
    postalCode: document.getElementById("personaldata-error_cp"),
    documentType: document.getElementById("personaldata-select-error_doctype"),
    documentValue: document.getElementById("personaldata-input-error_doctype"),
    accountType: document.getElementById("personaldata-error_accounttype"),
    birthyear: document.getElementById("personaldata-error_birthyear"),
    hobbies: document.getElementById("personaldata-error_hobbies"),
    title: document.getElementById("postdata-error_title"),
    description: document.getElementById("postdata-error_description"),
}

const errorMessageRequired = {
    username: "El nombre de usuario es obligatorio",
    password: "La contraseña es obligatoria",
    name: "El nombre es obligatorio",
    surname: "El apellido es obligatorio",
    phone: "El número de teléfono es obligatorio",
    postalCode: "El código postal es obligatorio",
    documentType: "Debes seleccionar un tipo de documento",
    documentValue: "El documento es obligatorio",
    accountType: "Debes seleccionar un tipo de cuenta",
    birthyear: "Debes seleccionar un año de nacimiento",
    hobbies: "Debes seleccionar al menos 2 aficiones",
    title: "El título de la publicación es obligatorio",
    description: "La descripción de la publicación es obligatoria",
}

const errorMessageFormat = {
    username: "El nombre de usuario debe tener entre 4 y 20 caracteres",
    password: "La contraseña debe estar compuesta por 8 dígitos",
    name: "El nombre debe tener entre 4 y 20 caracteres",
    surname: "El apellido debe tener entre 4 y 20 caracteres",
    phone: "El número telefónico debe incluir el código de la zona entre paréntesis y 9 dígitos",
    postalCode: "El código postal debe comenzar por 38 y contener 5 dígitos",
    documentType: "",
    documentValue: "El documento debe cumplir con el formato requerido",
    accountType: "Debes seleccionar un tipo de cuenta",
    birthyear: "",
    hobbies: "",
    title: "El título de la publicación debe tener entre 4 y 15 caracteres",
    description: "La descripción de la publicación debe tener entre 4 y 120 caracteres",
}

// Generar las opciones para el año de nacimiento
const startYear = 1920;
const endYear = 2010;
for (let year = startYear; year <= endYear; year++) {
    let option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    DOM.select.birthyear.appendChild(option);
}

// Mostrar/ocultar contraseña
DOM.showPassword.addEventListener("change", () => {
    DOM.input.password.type = DOM.showPassword.checked ? "text" : "password";
});

// Deshabilitar uso de letras en el input de Código Postal
DOM.input.postalCode.addEventListener("keydown", (e) => {
    if (/^[a-zA-Z\s]$/.test(e.key)) {
        e.preventDefault();
    }
});

// Habilitar/deshabilitar input del tipo de documento y establecer placeholder
DOM.select.documentType.addEventListener("change", (e) => {
    DOM.input.documentValue.disabled = e.target.value ? false : true;
    DOM.input.documentValue.setAttribute("placeholder", `${e.target.value == "DNI" ? "Ej: 12345678A" : "Ej: X1234567A"}`)
});

// Comprobar y dar valor al input de aficiones
DOM.hobbiesList.forEach(hobby => {
    hobby.addEventListener("change", () => {
        let hobbiesList = [...DOM.hobbiesList];
        let checkedHobbies = hobbiesList.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        DOM.input.hobbies.value = checkedHobbies.length >= 2 ? checkedHobbies.join(",") : "";
        if (checkedHobbies.length >= 2) errorDisplay.hobbies.textContent = "";
    })
});

// Contar caracteres de título
DOM.input.title.addEventListener("input", (e) => {
    DOM.titleCount.textContent = `${e.target.value.length}/15`; 
})

// Contar caracteres de descripción
DOM.input.description.addEventListener("input", (e) => {
    DOM.descriptionCount.textContent = `${e.target.value.length}/120`; 
})

// Validación de elementos al hacer submit
DOM.form.addEventListener("submit", (e) => {
    DOM.form.setAttribute("class", "submitted");

    // Limpiar el registro de errores de la sección derecha si tiene elementos
    let spans = DOM.erroresSection.querySelectorAll("span");
    if (spans.length != 0) spans.forEach(span => DOM.erroresSection.removeChild(span));

    let hasErrors = validateFields(DOM.input, "campo") | validateFields(DOM.select, "lista") | !isDocumentValid();
    
    if(hasErrors) {
        e.preventDefault();
        checkDocument();
        validateCorrections(DOM.input, "input");
        validateCorrections(DOM.select, "change");
        validateCorrectionsInputRadio(DOM.accountType);
    }
});

// Funciones auxiliares
function validateFields(list, term) {
    let hasErrors = false;
    for (const key in list) {
        if (list[key].validationMessage) {
            hasErrors = true;
            errorDisplay[key].textContent = 
                list[key].validationMessage.includes(term) ? errorMessageRequired[key] : errorMessageFormat[key];
            let span = document.createElement("span");
            span.textContent = `${list[key].getAttribute("name")}: ${list[key].validationMessage}`
            DOM.erroresSection.appendChild(span);
        }
        else errorDisplay[key].textContent = "";
    }
    return hasErrors;
}
function validateCorrections(list, event) {
    Object.entries(list).forEach(([key, element]) => {
        element.addEventListener(event, (e) => {
            if (e.target.validationMessage == ""){
                errorDisplay[key].textContent = "";
            }
        })
    });
}
function validateCorrectionsInputRadio(optionList) {
    optionList.forEach(option =>
        option.addEventListener("change", (e) => {
            if (e.target.validationMessage == ""){
                errorDisplay.accountType.textContent = "";
            }
        })
    );
}
// Para validar el documento
function isDocumentValid() {
    let docValue = DOM.input.documentValue.value.trim();

    // Reemplaza las letras X, Y, Z por 0, 1, 2 si es un NIE
    if (DOM.select.documentType.value == "NIE") {
        docValue = docValue.replace(/X/g, '0').replace(/Y/g, '1').replace(/Z/g, '2');;
    }

    const numero = parseInt(docValue.substring(0, docValue.length - 1));
    const letra = docValue.charAt(docValue.length - 1).toUpperCase();
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';

    return letra == letras[numero % 23];
}
function checkDocument() {
    if (!DOM.input.documentValue.disabled && DOM.input.documentValue.value != "") {
        errorDisplay.documentValue.textContent = !isDocumentValid() ? "El documento no es válido" : "";
    }
}