const DOM = {
    showPassword: document.getElementById("userdata_showpassword"),
    password: document.getElementById("userdata_password"),
    selectDNINIE: document.getElementById("personaldata-select_dninie"),
    inputDNINIE: document.getElementById("personaldata-input_dninie"),
    title: document.getElementById("postdata_title"),
    description: document.getElementById("postdata_description"),
    titleCount: document.getElementById("postdata-count_title"),
    descriptionCount: document.getElementById("postdata-count_description"),
    form: document.getElementById("form"),
    username: document.getElementById("userdata_username"),
    hobbiesInput: document.getElementById("hobbies"),
    hobbiesList: document.querySelectorAll(".aficiones input[type=checkbox]"),
    birthyearSelect: document.getElementById("personaldata_birthyear"),
    postalCode: document.getElementById("personaldata_cp"),

}
// (function(){
// });

// Generar las opciones para el año de nacimiento
const startYear = 1920;
const endYear = 2010;
for (let year = startYear; year <= endYear; year++) {
    let option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    DOM.birthyearSelect.appendChild(option);
}

// Mostrar contraseña
DOM.showPassword.addEventListener("change", () => {
    DOM.password.type = DOM.showPassword.checked ? "text" : "password";
});

// Habilitar/Deshabilitar input DNI/NIE
DOM.selectDNINIE.addEventListener("change", () => {
    DOM.inputDNINIE.disabled = DOM.selectDNINIE.value ? false : true;
});

// Deshabilitar uso de lo que no sea número en el input de Código Postal
DOM.postalCode.addEventListener("keydown", (e) => {
    if (/^[a-zA-Z\s]$/.test(e.key)) {
        e.preventDefault();
    }
});




// Contar caracteres de título
DOM.title.addEventListener("input", (e) => {
    DOM.titleCount.textContent = `${e.target.value.length}/15`; 
})

// Contar caracteres de descripción
DOM.description.addEventListener("input", (e) => {
    DOM.descriptionCount.textContent = `${e.target.value.length}/120`; 
})

// DOM.form.addEventListener("submit", (e) => {
//     DOM.inputList.foreach(input => {
//         console.log(input.validationMessage);
//         if (!input.validationMessage == ""){
//             e.preventDefault();
//             let span = document.createElement("span");
//             span.textContent = input.validationMessage;
//             span.classList.toggle("errormessage");
            
//             input.after(span);
//         }
//     });
// })

DOM.form.addEventListener("submit", (e) => {
    if (!DOM.username.validationMessage == ""){
        e.preventDefault();
        let span = document.createElement("span");
        span.textContent = DOM.username.validationMessage;
        span.classList.toggle("errormessage");
        
        DOM.username.after(span);
    }
})

DOM.form.addEventListener("submit", (e) => {
    let hobbies = [];
    DOM.hobbiesList.forEach(hobby => {
        if (hobby.checked) {
            hobbies.push(hobby.value)
        }
        console.log(hobbies);
    });

    console.log(DOM.hobbiesList.filter(hobby => hobby.checked))
    console.log(DOM.hobbiesInput.value);
    DOM.hobbiesInput.value = hobbies.length >= 2 ? hobbies.toString() : null;
    console.log(DOM.hobbiesInput.value);
})

