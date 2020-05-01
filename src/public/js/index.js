import { Modal } from './message.js';

window.Index = class Index {
    static async contacto() {
        const mail = {}
        mail.nombre = document.getElementById('nombre').value;
        mail.contacto = document.getElementById('contacto').value;
        mail.email = document.getElementById('email').value;
        mail.comentario = document.getElementById('comentario').value;

        const expresion = /\w+@\w+\.+[a-z]/;

        if (mail.nombre === "" || mail.email === "" || mail.contacto === "" || mail.comentario === "") {
            if (mail.nombre === "") {
                document.getElementById('errorNombre').innerHTML = "<span>¡Campo obligatorio!</span>";
            } else {
                document.getElementById('errorNombre').innerHTML = "";
            }
            if (mail.email === "") {
                document.getElementById('errorEmail').innerHTML = "<span>¡Campo obligatorio!</span>";
            } else {
                document.getElementById('errorEmail').innerHTML = "";
                if (!expresion.test(mail.email)) {
                    document.getElementById('errorEmail').innerHTML = "<span>¡El mail no es del formato correcto!</span>";
                }
            }
            if (mail.contacto === "") {
                document.getElementById('errorContacto').innerHTML = "<span>¡Campo obligatorio!</span>";
            } else {
                document.getElementById('errorContacto').innerHTML = "";
            }
            if (mail.comentario === "") {
                document.getElementById('errorComentario').innerHTML = "<span>¡Campo obligatorio!</span>";
            } else {
                document.getElementById('errorComentario').innerHTML = "";
            }
        } else {
            const mailJSON = JSON.stringify(mail);
            const text = await fetch('/contacto', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, 
                body: mailJSON
            })
            const dato = JSON.parse(await text.text())
            const modal = new Modal(dato.titulo, dato.mensaje)
            const acept = await modal.confirm();
            if (acept) {
                location.reload();
            }
        }
    }
}