const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // STARTTLS
    requireTLS: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    },
    connectionTimeout: 10000, // 10 segundos
    greetingTimeout: 10000,
    socketTimeout: 15000,
    tls: {
        rejectUnauthorized: false
    }
});

const sendVerificationEmail = async (email, code) => {
    try {
        await transporter.sendMail({
            from: `CampusMarket <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Código de Verificación - CampusMarket',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #027839; text-align: center;">CampusMarket</h2>
                    <p>Hola,</p>
                    <p>Tu código de verificación para completar el registro es:</p>
                    <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333; border-radius: 5px;">
                        ${code}
                    </div>
                    <p style="margin-top: 20px;">Este código expirará en 10 minutos.</p>
                    <p>Si no solicitaste este código, por favor ignora este correo.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #888; text-align: center;">© 2025 CampusMarket. Todos los derechos reservados.</p>
                </div>
            `
        });

        console.log('📧 Correo enviado por Gmail a:', email);
        return true;
    } catch (error) {
        console.error('❌ Error enviando correo por Gmail:', error);
        console.log('⚠️ [DEV MODE] Código de verificación para', email, 'es:', code);
        return false;
    }
};

module.exports = { sendVerificationEmail };
