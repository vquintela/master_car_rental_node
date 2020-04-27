import { message } from './message.js';

window.Profile = class Profile {
    static async avatar(id) {
        const formData = new FormData();
        formData.append('image', document.getElementById('img-user').files[0]);
        const text = await fetch('/users/avatar/' + id, {
            method: 'POST',
            body: formData
        })
        const mensaje = JSON.parse(await text.text());
        message.showMessage(mensaje.message, mensaje.css, mensaje.redirect);
    }
}