class Usuarios {
    static async obtenerUsuarios() {
        const rol = document.getElementById('rol-buscar').value;
        const estado = JSON.parse(document.getElementById('estado-buscar').value);
        document.getElementById('user-list').innerHTML = `
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
            document.getElementById('user-list').innerHTML += `
                <tbody >
                    <tr>
                        <th scope="row">${i}</th>
                        <td>${user.nombre}</td>
                        <td>${user.apellido}</td>
                        <td>${user.email}</td>
                        <td>${user.rol}</td>
                        <td><buton class="btn btn-danger" onclick="Usuarios.delete('${user._id}')";>Delete</buton>
                        <buton class="btn btn-primary" onclick="Usuarios.update('${user._id}')";>Editar</buton>
                        <buton class="btn btn-${user.state ? "alert" : "success"}" onclick="Usuarios.estado('${user._id}', ${user.state})";>
                        ${user.state ? "Activo" : "Inactivo"}
                        </buton></td>
                    </tr>
                </tbody>
            `;
        })
    }

    static async delete(id) {
        const user = await fetch("/users/delete/" + id, {method: 'DELETE'});
        const datotexto = JSON.parse(await user.text());
        Usuarios.showMessage(datotexto.message, 'success');
        Usuarios.obtenerUsuarios();
    }

    static async update(id) {
        const user = await fetch("/users/editar/" + id, {method: 'GET'});
        let usuario = JSON.parse(await user.text());
        document.getElementById('product-form').innerHTML =`
            <div class="card-header" id="formulario-titulo">
                <h4>Editar Usuario</h4>
            </div>
            <form class="card-body" id="formulario">
                <div class="form-group">
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
        Usuarios.showMessage(datotexto.message, 'success');
        Usuarios.obtenerUsuarios();
        Usuarios.resetForm();
    }

    static async estado(id, state){
        const body = { state }
        body.state = !state
        const userJSON = JSON.stringify(body);
        const add = await fetch("/users/estado/" + id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}, 
            body: userJSON
        });
        const datotexto = JSON.parse(await add.text());
        Usuarios.showMessage(datotexto.message, 'success');
        Usuarios.obtenerUsuarios();
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
            document.querySelector('.alert').remove();
        }, 1000)
    }

    static resetForm() {
        document.getElementById('formulario-titulo').remove();
        document.getElementById('formulario').remove();
    }
}

Usuarios.obtenerUsuarios();