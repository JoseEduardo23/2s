// Función para alternar entre los formularios de login y registro
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
}

// Simulamos el registro guardando en localStorage
document.getElementById("registerFormElement").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const email = document.getElementById("registerEmail").value;
    const password = await getPassword(); // Llamamos a la función para generar la contraseña

    if (password) {
        // Guardamos el correo y la contraseña en localStorage como simulación de base de datos
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        
        document.getElementById("registerMessage").innerText = "¡Registro exitoso! Ahora puedes iniciar sesión.";
    } else {
        document.getElementById("registerMessage").innerText = "Error generando la contraseña.";
    }
});

// Función para generar la contraseña
const getPassword = async (length = 16) => {
    const apiUrl = `https://api.api-ninjas.com/v1/passwordgenerator?length=${length}`;
    
    try {
        const response = await fetch(apiUrl, {
            headers: { 'X-Api-Key': '1kUZ2uw1k+VedwpqSsXmiw==Vm71H20Zr265XPt5' }
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.random_password; 
        } else {
            throw new Error("Error en la API de generación de contraseña");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
};

// Lógica para iniciar sesión
document.getElementById("loginFormElement").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenir el envío del formulario

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (email === storedEmail && password === storedPassword) {
        document.getElementById("loginMessage").innerText = "Sesión iniciada correctamente";
        window.location.href = "hola.html"; // Redirige al usuario a hola.html
    } else {
        document.getElementById("loginMessage").innerText = "Correo o contraseña incorrectos.";
    }
});