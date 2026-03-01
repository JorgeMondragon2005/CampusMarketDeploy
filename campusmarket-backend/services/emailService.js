const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email, code) => {
    try {
        const data = await resend.emails.send({
            from: 'CampusMarket <onboarding@resend.dev>', // Usamos el dominio de prueba de Resend por ahora
            to: email, // En la capa de prueba gratuita de Resend solo puedes enviar a tu correo verificado (batpache@gmail.com) pero como la app deja registrar a cualquiera, en producción real tendrían que validar su dominio en Resend.
            subject: 'Código de Verificación - CampusMarket',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #4ea94b; text-align: center;">CampusMarket</h2>
                    <p>Hola,</p>
                    <p>Tu código de verificación para completar el registro es:</p>
                    <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333; border-radius: 5px;">
                        ${code}
                    </div>
                    <p style="margin-top: 20px;">Este código expirará en 10 minutos.</p>
                    <p>Si no solicitaste este código, por favor ignora este correo.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #888; text-align: center;">© 2024 CampusMarket. Todos los derechos reservados.</p>
                </div>
            `
        });

        console.log('📧 Correo enviado por Resend:', data);
        return true;
    } catch (error) {
        console.error('❌ Error enviando correo por Resend:', error);
        // Si hay error en la capa de Resend, al menos registramos el código en consola para pruebas
        console.log('⚠️ [DEV MODE] Código de verificación para', email, 'es:', code);
        return false;
    }
};

module.exports = { sendVerificationEmail };
