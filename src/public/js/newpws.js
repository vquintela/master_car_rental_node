class Renovar {
    static async cambiar(id) {
        const user = {};
        user.passwordActual = document.getElementById('passwordActual').value;
        user.nuevaPass = document.getElementById('nuevaPass').value;
        user.repNuevaPass = document.getElementById('repNuevaPass').value;
        //user.email = document.getElementById('email').value;

        const userJSON = JSON.stringify(user);
        const add = await fetch("newpass/" + id, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: userJSON
        });
        const datotexto = JSON.parse(await add.text());
        Renovar.showMessage(datotexto.message, 'success');
    }

    static showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-3`;
        div.appendChild(document.createTextNode(message));
        //mostrando en el DOM
        const container = document.getElementById('contenedor');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout( () => {
            location.href = '/profile'
        }, 1000)
    }
}