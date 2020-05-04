import { message, Modal } from './message.js';

window.IngUsuario = class IngUsuario {
    static async ingresar() {
        const user = {};
        user.email = document.getElementById('email').value;
        user.password = document.getElementById('password').value;
        
        if(user.email === "" || user.password === "") {
            return message.showMessage('Ingrese todos los campos', 'danger', '/signin');
        }

        const usuarioJSON = JSON.stringify(user);
        const add = await fetch("/signin", {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: usuarioJSON
        });
        const res = JSON.parse(await add.text());
        message.showMessage(res.message, res.css, res.redirect);
    }

    static async renew(){
        const user = {};
        user.email = document.getElementById('email').value;
        if(user.email === "") {
            return message.showMessage('Ingrese el email', 'danger', '/signin');
        }
        const modal = new Modal('Renovar Password', '¿Seguro desea renovar su password?')
        const acept = await modal.confirm();
        if (acept) {
            const userJSON = JSON.stringify(user);
            const add = await fetch('/renew', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'}, 
                body: userJSON
            })
            const res = JSON.parse(await add.text());
            message.showMessage(res.message, res.css, res.redirect);
        }
    }

    static inicialar() {
        const btn = document.getElementById('btn-ingresa');
        btn.setAttribute('onclick', 'IngUsuario.ingresar()');
    }
}

IngUsuario.inicialar();