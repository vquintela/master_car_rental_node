class IngUsuario {
    static async ingresar() {
        const user = {};
        user.email = document.getElementById('email').value;
        user.password = document.getElementById('password').value;

        const usuarioJSON = JSON.stringify(user);
        const add = await fetch("/signin", {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: usuarioJSON
        });
        const res = JSON.parse(await add.text());
        if(res.estado){
            IngUsuario.showMessage(res.message, 'success', '/profile');
        } else {
            IngUsuario.showMessage(res.message, 'danger', '/signin');
        }
    }

    static async renew(){
        const user = {};
        user.email = document.getElementById('email').value;
        if(user.email === "") {
            return IngUsuario.showMessage('Ingrese el email', 'danger', '/signin');
        }
        const userJSON = JSON.stringify(user);
        const add = await fetch('/renew', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: userJSON
        })
        const res = JSON.parse(await add.text());
        if(res.estado){
            IngUsuario.showMessage(res.message, 'success', '/signin');
        } else {
            IngUsuario.showMessage(res.message, 'danger', '/signin');
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
        }, 1000)
    }

    static inicialar() {
        const btn = document.getElementById('btn-ingresa');
        btn.setAttribute('onclick', 'IngUsuario.ingresar()');
    }
}

IngUsuario.inicialar();