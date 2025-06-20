document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step'); 
    const container = document.querySelector('.container');
    const loginModal = document.getElementById('login-modal');
    const enterButton = document.getElementById('enter-button');
    const userNameInput = document.getElementById('user-name');
    const userEmailInput = document.getElementById('user-email');
    const userCountryInput = document.getElementById('user-country');
    const userPhoneInput = document.getElementById('user-phone');
    const userSexSelect = document.getElementById('user-sex');
    const userAddressSelect = document.getElementById('user-address');
    const closeButton = document.getElementById('close-button');

    let currentStepIndex = 0;
    let userData = {};

    function showStep(index) {
        if (index < 0 || index >= steps.length) return;
        steps.forEach((step, i) => {
            step.classList.toggle('hidden', i !== index);
        });
        currentStepIndex = index;
    }

    enterButton.addEventListener('click', () => {
        const name = userNameInput.value.trim();
        const email = userEmailInput.value.trim();
        const country = userCountryInput.value.trim();
        const phone = userPhoneInput.value.trim();
        const sex = userSexSelect.value;
        const address = userAddressSelect.value;

        if (!name) {
            alert('Por favor, introduce tu nombre para continuar.');
            userNameInput.focus();
            return;
        }

        if (!address) {
            alert('Por favor, selecciona tu dirección para continuar.');
            userAddressSelect.focus();
            return;
        }

        userData = {
            nombre: name,
            correo: email,
            pais: country,
            telefono: phone,
            sexo: sex,
            direccion: address
        };

        console.log("Datos que se enviarán:", userData);

        fetch('https://script.google.com/macros/s/AKfycbyOUbWYEYbtZJ-alSVn-jo0ynIsKbDxnmjdHgR1rbO9JdPT1CamY1yJH2c_DirS4UI6/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);
            alert("¡Gracias! Tus datos han sido guardados.");
        })
        .catch(err => {
            console.error("Error al enviar datos:", err);
            alert("Error al guardar los datos.");
        });

        loginModal.classList.add('hidden');
        container.classList.remove('hidden');
        showStep(0);
    });

    container.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName !== 'BUTTON') return;

        const parentSection = target.closest('.step');
        if (!parentSection) return;

        const buttonStepIndex = Array.from(steps).indexOf(parentSection);

        if (target.classList.contains('next-button')) {
            if (buttonStepIndex < steps.length - 1) {
                showStep(buttonStepIndex + 1);
            }
        } else if (target.classList.contains('prev-button')) {
            if (buttonStepIndex > 0) {
                showStep(buttonStepIndex - 1);
            }
        } else if (target.classList.contains('restart-button')) {
            showStep(0);
        }
    });

    closeButton.addEventListener('click', () => {
        // Solo cerrar ventana, sin enviar datos
        alert("Gracias por visitar. Puedes cerrar esta pestaña.");
        window.close();
    });

    showStep(currentStepIndex);
});
            
