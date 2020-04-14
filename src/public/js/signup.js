class User {
    constructor(nombre, apellido, email, password, rol) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }
}

class AltaUsuario {
    static async crearUsuario() {
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = new User(nombre, apellido, email, password);

        const usuarioJSON = JSON.stringify(user);
        const add = await fetch("/signup", {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: usuarioJSON
        });
        const res = JSON.parse(await add.text());
        if(res.estado){
            AltaUsuario.showMessage(res.message, 'success', '/profile');
        } else {
            AltaUsuario.showMessage(res.message, 'danger', '/signup');
        }
    }

    static showMessage(message, cssClass, redirect) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-3`;
        div.appendChild(document.createTextNode(message));
        //mostrando en el DOM
        const container = document.getElementById('contenedor');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout( () => {
            location.href = redirect;
        }, 3000)
    }
}