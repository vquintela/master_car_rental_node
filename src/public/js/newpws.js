import { message } from './message.js';

window.Renovar = class Renovar {
    static async cambiar(id) {
        const user = {};
        user.passwordActual = document.getElementById('passwordActual').value;
        user.nuevaPass = document.getElementById('nuevaPass').value;
        user.repNuevaPass = document.getElementById('repNuevaPass').value;

        const userJSON = JSON.stringify(user);
        const add = await fetch("newpass/" + id, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: userJSON
        });
        const datotexto = JSON.parse(await add.text());
        message.showMessage(datotexto.message, datotexto.css, datotexto.redirect);
    }
}