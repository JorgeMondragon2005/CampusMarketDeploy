require('dotenv').config();
const { sendVerificationEmail } = require('./services/emailService');

const runTest = async () => {
    console.log("Prueba de envío con Resend...");

    // Resend free tier solo permite enviar a los correos verificados en su plataforma.
    // Como creaste la cuenta con batpache@gmail.com, enviaremos la prueba a ese correo.
    const success = await sendVerificationEmail('batpache@gmail.com', '123456');

    if (success) {
        console.log("✅ Prueba exitosa. Revisa la bandeja de entrada de batpache@gmail.com.");
    } else {
        console.log("❌ Falló la prueba de envío.");
    }
};

runTest();
