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

  // Registro
  document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = await getPassword(); // Genera la contraseña

    if (password) {
      // Almacena la contraseña generada en sessionStorage para su verificación posterior
      sessionStorage.setItem("generatedPassword", password);

      // Envía la contraseña generada al backend para enviarla al correo electrónico
      const response = await fetch("/send-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      
      const result = await response.json();
      document.getElementById("message").innerText = result.message;
    } else {
      document.getElementById("message").innerText = "Error generando la contraseña.";
    }
  });

  // Inicio de sesión
  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const enteredPassword = document.getElementById("loginPassword").value;
    const generatedPassword = sessionStorage.getItem("generatedPassword"); // Obtiene la contraseña generada

    // Verifica que la contraseña ingresada coincida con la generada
    if (enteredPassword === generatedPassword) {
      document.getElementById("message").innerText = "Sesión iniciada correctamente";
      window.location.href = "hola.html"; // Redirige al usuario al sitio deseado
    } else {
      document.getElementById("message").innerText = "Credenciales incorrectas.";
    }
  });
