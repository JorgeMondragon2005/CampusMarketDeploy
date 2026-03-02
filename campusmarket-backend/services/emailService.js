const https = require('https');

const sendVerificationEmail = async (email, code) => {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({
            sender: { name: 'CampusMarket', email: 'jorgemondra242@gmail.com' },
            to: [{ email: email }],
            subject: 'Código de Verificación - CampusMarket',
            htmlContent: `
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

        const options = {
            hostname: 'api.brevo.com',
            path: '/v3/smtp/email',
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json',
                'content-length': Buffer.byteLength(body)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log('📧 Correo enviado por Brevo a:', email);
                    resolve(true);
                } else {
                    console.error('❌ Error Brevo:', res.statusCode, data);
                    resolve(false);
                }
            });
        });

        req.on('error', (err) => {
            console.error('❌ Error de conexión Brevo:', err);
            resolve(false);
        });

        req.setTimeout(15000, () => {
            console.error('❌ Timeout Brevo');
            req.destroy();
            resolve(false);
        });

        req.write(body);
        req.end();
    });
};

module.exports = { sendVerificationEmail };
