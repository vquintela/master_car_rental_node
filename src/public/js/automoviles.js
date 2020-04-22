import { message } from './message.js';

window.Automovil = class Automovil {
    static ingresar(auto) {
        document.getElementById('insertar').innerHTML =`
            <div class="card-header" id="formulario-titulo">
                <h4>Ingresar Automovil</h4>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-md-4">
                    <form class="card-body" id="formulario">
                        <div class="form-group">
                            <input type="text" id="patente" ${ auto ? 'value=' + auto.patente.toString() : 'placeholder="Patente"'} class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" id="pasajeros" ${ auto ? 'value=' + auto.pasajeros.toString() : 'placeholder="Pasajeros"'} class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" id="puertas" ${ auto ? 'value=' + auto.puertas.toString() : 'placeholder="Puertas"'} class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" id="precio" ${ auto ? 'value=' + auto.precio.toString() : 'placeholder="Precio"'} class="form-control">
                        </div>
                        <div class="form-group">
                            <select id="marca" class="form-control">
                                <option>${ auto ? auto.marca : "marca"}</option>
                                <option>ford</option>
                                <option>fiat</option>
                                <option>volkswagen</option>
                                <option>chevrolet</option>
                            </select>
                        </div>
                        <input value="Ingresar" class="btn btn-primary" ${ auto ? `onclick="Automovil.insertar('${auto._id}', '${auto.imagen}');"` : 'onclick="Automovil.insertar();"'} readonly>
                    </form>
                </div>
                <div class="col-md-4">
                    <form class="card-body" id="formulario">
                        <div class="form-group">
                            <select id="transmicion" class="form-control">
                                <option>${ auto ? auto.transmicion : "Transmicion"}</option>
                                <option>manual</option>
                                <option>automatica</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="text" id="descripcion" ${ auto ? 'value=' + auto.descripcion.toString() : 'placeholder="Descripcion"'} class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" id="modelo" ${ auto ? 'value=' + auto.modelo.toString() : 'placeholder="Modelo"'} class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="file" id="imagen" class="form-control-file">
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    static async insertar(id, imagen) {
        const formData = new FormData();
        formData.append('image', document.getElementById('imagen').files[0]);
        formData.append('modelo', document.getElementById('modelo').value)
        formData.append('descripcion', document.getElementById('descripcion').value)
        formData.append('transmicion', document.getElementById('transmicion').value)
        formData.append('marca', document.getElementById('marca').value)
        formData.append('precio', document.getElementById('precio').value)
        formData.append('puertas', document.getElementById('puertas').value)
        formData.append('pasajeros', document.getElementById('pasajeros').value)
        formData.append('patente', document.getElementById('patente').value)
        let mensaje;
        if(id) {
            formData.append('imagen', imagen)
            const text = await fetch('/automoviles/editar/' + id, {
                method: 'POST',
                body: formData
            })
            mensaje = JSON.parse(await text.text());
        } else {
            const text = await fetch('/automoviles/insertar', {
                method: 'POST',
                body: formData
            })
            mensaje = JSON.parse(await text.text());
        }
        message.showMessage(mensaje.message, mensaje.css, mensaje.redirect);
        Automovil.obtener()
    }

    static async obtener() {
        const filtro = document.getElementById('rol-buscar').value;
        document.getElementById('insertar').innerHTML = `
                <table class="table" id="insertar-filas">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Patente</th>
                        <th scope="col">Pasajeros</th>
                        <th scope="col">Puertas</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Transmicion</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Accion</th>
                      </tr>
                    </thead>
        `;
        const userJSON = await fetch('automoviles/obtener', { method: 'GET' });
        let automoviles = JSON.parse(await userJSON.text());
        let i = 0
        if(filtro !== 'todos') {
            automoviles = automoviles.filter(automovil => automovil.marca === filtro)
        } 
        automoviles.map(automovil => {
            i += 1
            document.getElementById('insertar-filas').innerHTML += `
                    <tbody >
                        <tr>
                            <th scope="row">${i}</th>
                            <td>${automovil.patente}</td>
                            <td>${automovil.pasajeros}</td>
                            <td>${automovil.puertas}</td>
                            <td>${automovil.precio}</td>
                            <td>${automovil.marca}</td>
                            <td>${automovil.transmicion}</td>
                            <td>${automovil.modelo}</td>
                            <td><buton class="btn btn-danger" onclick="Automovil.delete('${automovil._id}', '${automovil.imagen}')">Delete</buton>
                            <buton class="btn btn-primary" onclick="Automovil.editar('${automovil._id}')">Editar</buton>
                            <buton class="btn btn-${automovil.tecnico ? "alert" : "success"}" onclick="Automovil.estado('${automovil._id}', ${automovil.tecnico})">
                            ${automovil.tecnico ? "Activo" : "Reparacion"}
                            </buton></td>
                        </tr>
                    </tbody>
                </table>
            `;
        })
    }

    static async editar(id) {
        const automovil = await fetch('/automoviles/editar/' + id, {method: 'GET'});
        const auto = JSON.parse(await automovil.text());
        Automovil.ingresar(auto)
    }

    static async delete(id, image) {
        const data = {}
        data.imagen = image
        const dataJSON = JSON.stringify(data);
        const resp = await fetch("/automoviles/delete/" + id, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: dataJSON
        });
        const datotexto = JSON.parse(await resp.text());
        message.showMessage(datotexto.message, datotexto.css, datotexto.redirect);
        Automovil.obtener();
    }

    static async estado(id, tecnico) {
        const body = {}
        body.tecnico = !tecnico
        const autoJSON = JSON.stringify(body);
        const add = await fetch("/automoviles/estado/" + id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}, 
            body: autoJSON
        });
        const datotexto = JSON.parse(await add.text());
        message.showMessage(datotexto.message, datotexto.css, datotexto.redirect);
        Automovil.obtener();
    }
}