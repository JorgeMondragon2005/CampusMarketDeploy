require('dotenv').config();
const nodemailer = require('nodemailer');

const testEmail = async () => {
    console.log("Configurando transporter...");
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'batpache@gmail.com',
            pass: 'zdre hsts scgw pjtr' // o zdrehstsscgwpjtr
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
    });

    const mailOptions = {
        from: '"CampusMarket" <batpache@gmail.com>',
        to: 'batpache@gmail.com', // Enviarse a sí mismo
        subject: 'Prueba de Correo - CampusMarket',
        text: 'Esto es una prueba de conexión',
    };

    console.log("Enviando correo...");
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Correo enviado exitosamente:', info.messageId);
    } catch (error) {
        console.error('❌ Error enviando correo:', error);
    }
};

testEmail();
