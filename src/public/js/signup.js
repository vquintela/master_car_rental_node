import { message } from './message.js';

class User {
    constructor(nombre, apellido, email, password, verificarPassword) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.verificarPassword = verificarPassword;
    }
}

window.AltaUsuario = class AltaUsuario {
    static async crearUsuario() {
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const verificarPassword = document.getElementById('verificar-password').value;

        const user = new User(nombre, apellido, email, password, verificarPassword);

        const usuarioJSON = JSON.stringify(user);
        const add = await fetch("/signup", {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: usuarioJSON
        });
        const res = JSON.parse(await add.text());
        if(res.redirect === 'error') {
            message.errorMessage(res.message)
        } else {
            message.showMessage(res.message, res.css, res.redirect);
        }
    }
}