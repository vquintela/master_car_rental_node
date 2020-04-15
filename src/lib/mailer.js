const nodemailer = require('nodemailer');

const direccion = 'mastercarrentalMCR@gmail.com';
const pass = 'M4st3rc4r';



const mailer = async (email, nombre, apellido, numberId) => {
    //const numberId = Math.floor(Math.random() * 100000) + 1;
    const link = `http://localhost:3000/verifica?email=${email}&id=${numberId}`;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: direccion,
            pass: pass
        }
    })

    const ret = await transporter.sendMail({
        from: direccion,
        to: email,
        subject: 'MCR Validacion de Email',
        html: `
                <h3><b>Bienvenido a Master Car Rental</b></h3><br><br>
                <h3><b>¡Gracias por elegirnos:</b>${nombre} ${apellido}</h3><br><br>
                <p>Para terminar con el proceso de registro ingrese al siguiente vinculo</p><br><br><br>
                <br><a href="${link}">Haga click AQUI para verificar</a>"
            `
    });
}

module.exports = mailer;