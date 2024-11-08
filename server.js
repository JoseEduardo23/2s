const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Enviar correo solo cuando el usuario se registre
app.post("/send-password", async (req, res) => {
    const { email, password } = req.body;

    // Validación de los datos recibidos
    if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "je20042316@gmail.com",
            pass: "btgzhfuutrpsehok"
        }
    });

    const mailOptions = {
        from: "je20042316@gmail.com",
        to: email,
        subject: "Tu contraseña ha sido generada",
        text: `Tu contraseña generada es: ${password}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Correo enviado exitosamente" });
    } catch (error) {
        console.error("Error enviando correo:", error);
        res.status(500).json({ message: "Error enviando el correo" });
    }
});

app.listen(3000, () => {
    console.log("Servidor en ejecución en http://localhost:3000");
});