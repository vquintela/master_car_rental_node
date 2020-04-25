import { message, Modal } from './message.js';

window.Usuarios = class Usuarios {
    static async obtenerUsuarios() {
        const rol = document.getElementById('rol-buscar').value;
        const estado = JSON.parse(document.getElementById('estado-buscar').value);
        document.getElementById('insertar').innerHTML = `
                <table class="table" id="insertar-filas">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Email</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Accion</th>
                      </tr>
                    </thead>
        `;
        const userJSON = await fetch('users/obtener', { method: 'GET' });
        let users = JSON.parse(await userJSON.text());
        let i = 0
        if(rol !== 'todos') {
            users = users.filter(user => user.rol === rol && user.state === estado)
        } else {
            users = users.filter(user => user.state === estado)
        }
        users.map(user => {
            i += 1
            document.getElementById('insertar-filas').innerHTML += `
                    <tbody >
                        <tr>
                            <th scope="row">${i}</th>
                            <td>${user.nombre}</td>
                            <td>${user.apellido}</td>
                            <td>${user.email}</td>
                            <td>${user.rol}</td>
                            <td><buton class="btn btn-danger" onclick="Usuarios.delete('${user._id}')">Delete</buton>
                            <buton class="btn btn-primary" onclick="Usuarios.update('${user._id}')">Editar</buton>
                            <buton class="btn btn-${user.state ? "alert" : "success"}" onclick="Usuarios.estado('${user._id}', ${user.state})">
                            ${user.state ? "Activo" : "Inactivo"}
                            </buton></td>
                        </tr>
                    </tbody>
                </table>
            `;
        })
    }

    static async delete(id) {
        const modal = new Modal('¿Seguro desea eliminar este usuario?')
        const acept = await modal.confirm();
        if (acept) {
            const user = await fetch("/users/delete/" + id, {method: 'DELETE'});
            const datotexto = JSON.parse(await user.text());
            message.showMessage(datotexto.message, datotexto.css, datotexto.redirect);
            Usuarios.obtenerUsuarios();
        }
    }

    static async update(id) {
        const user = await fetch("/users/editar/" + id, {method: 'GET'});
        let usuario = JSON.parse(await user.text());
        document.getElementById('insertar').innerHTML =`
            <div class="row justify-content-md-center"
                <div class="card col-md-4" id="product-form">
                    <form class="card-body col-md-4" id="formulario">
                        <div class="card-header" id="formulario-titulo">
                            <h4>Editar Usuario</h4>
                        </div>
                        <div class="form-group mt-4">
                            <input type="text" id="nombre" value="${usuario.nombre}" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" id="apellido" value="${usuario.apellido}" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" id="email" value="${usuario.email}" class="form-control">
                        </div>
                        <div class="form-group">
                            <select name="rol" id="rol" class="form-control">
                                <option>${usuario.rol}</option>
                                <option>administrador</option>
                                <option>operador</option>
                                <option>cliente</option>
                            </select>
                        </div>
                        <input value="Editar" class="btn btn-primary btn-block" onclick="Usuarios.editar('${usuario._id}');">
                    </form>
                </div>
            </div>
        `;
    }

    static async editar(id) {
        const user = {};
        user.nombre = document.getElementById('nombre').value;
        user.apellido = document.getElementById('apellido').value;
        user.email = document.getElementById('email').value;
        user.rol = document.getElementById('rol').value;

        const userJSON = JSON.stringify(user);
        const add = await fetch("users/editar/" + id, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: userJSON
        });
        const datotexto = JSON.parse(await add.text());
        message.showMessage(datotexto.message, datotexto.css, datotexto.redirect);
        Usuarios.obtenerUsuarios();
        message.resetForm();
    }

    static async estado(id, state) {
        const modal = new Modal('¿Seguro desea cambiar el estado?')
        const acept = await modal.confirm();
        if (acept) {
            const body = { state }
            body.state = !state
            const userJSON = JSON.stringify(body);
            const add = await fetch("/users/estado/" + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: userJSON
            });
            const datotexto = JSON.parse(await add.text());
            message.showMessage(datotexto.message, datotexto.css, datotexto.redirect);
            Usuarios.obtenerUsuarios();
        }
    }
}

Usuarios.obtenerUsuarios();