document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".formulario");

    const nombre = document.getElementById("nombre");
    const rut = document.getElementById("rut");
    const fechaNacimiento = document.getElementById("fecha_nacimiento");
    const curriculum = document.getElementById("curriculum");
    const email = document.getElementById("email");
    const genero = document.getElementById("genero");
    const contraseña = document.getElementById("contraseña");
    const repetirContraseña = document.getElementById("repetir_contraseña");
    const btnCancelar = document.querySelectorAll(".boton")[0];
    const btnGuardar = document.querySelectorAll(".boton")[1];

    const mostrarError = (input, mensaje) => {
        input.classList.add("error");
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains("error-msg")) {
            error = document.createElement("span");
            error.classList.add("error-msg");
            input.parentNode.appendChild(error);
        }
        error.textContent = mensaje;
        input.style.border = "2px solid red";
    };

    const limpiarError = (input) => {
        input.classList.remove("error");
        const error = input.parentNode.querySelector(".error-msg");
        if (error) error.remove();
        input.style.border = "1px solid #1f54c5";
    };

    const validarRut = (rut) => {
        return /^\d{7,8}-[\dkK]$/.test(rut);
    };

    const validarFecha = (fecha) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(fecha);
    };

    const validarEmail = (correo) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    };

    const validarContraseña = (valor) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/.test(valor);
    };

    const validarArchivo = (archivo) => {
        const ext = archivo.split('.').pop().toLowerCase();
        return ["pdf", "docx"].includes(ext);
    };

    const validarFormulario = () => {
        let valido = true;

        if (nombre.value.trim() === "") {
            mostrarError(nombre, "El nombre es obligatorio.");
            valido = false;
        } else {
            limpiarError(nombre);
        }

        if (!validarRut(rut.value.trim())) {
            mostrarError(rut, "El RUT es inválido. Ej: 12345678-9");
            valido = false;
        } else {
            limpiarError(rut);
        }

        if (fechaNacimiento.value && !validarFecha(fechaNacimiento.value)) {
            mostrarError(fechaNacimiento, "Fecha inválida. Usa el selector.");
            valido = false;
        } else {
            limpiarError(fechaNacimiento);
        }

        if (!validarEmail(email.value.trim())) {
            mostrarError(email, "El email no es válido.");
            valido = false;
        } else {
            limpiarError(email);
        }

        if (!validarContraseña(contraseña.value)) {
            mostrarError(contraseña, "Debe tener 6-12 caracteres, 1 mayúscula, 1 minúscula y 1 número.");
            valido = false;
        } else {
            limpiarError(contraseña);
        }

        if (repetirContraseña.value !== contraseña.value) {
            mostrarError(repetirContraseña, "Las contraseñas no coinciden.");
            valido = false;
        } else {
            limpiarError(repetirContraseña);
        }

        if (curriculum.value) {
            if (!validarArchivo(curriculum.value)) {
                mostrarError(curriculum, "Solo se permiten archivos .pdf o .docx");
                valido = false;
            } else {
                limpiarError(curriculum);
            }
        } else {
            limpiarError(curriculum);
        }

        return valido;
    };

    btnCancelar.addEventListener("click", (e) => {
        e.preventDefault();
        form.reset();
        document.querySelectorAll("input, select").forEach(limpiarError);
    });

    btnGuardar.addEventListener("click", (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            alert("¡Formulario enviado correctamente!");
            form.reset();
        }
    });
});
