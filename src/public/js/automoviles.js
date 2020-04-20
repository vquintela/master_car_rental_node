import { message } from './message.js';

window.Automovil = class Automovil {
    static ingresar() {
        document.getElementById('insertar').innerHTML =`
            <div class="card-header" id="formulario-titulo">
                <h4>Ingresar Automovil</h4>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-md-4">
                    <form class="card-body" id="formulario">
                        <div class="form-group">
                            <input type="text" id="patente" placeholder="Patente" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" id="pasajeros" placeholder="Pasajeros" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" id="puertas" placeholder="Puertas" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" id="precio" placeholder="Precio" class="form-control">
                        </div>
                        <div class="form-group">
                            <select id="marca" class="form-control">
                                <option>Marca</option>
                                <option>ford</option>
                                <option>fiat</option>
                                <option>volkswagen</option>
                                <option>chevrolet</option>
                            </select>
                        </div>
                        <input value="Editar" class="btn btn-primary" onclick="Automovil.insertar();">
                    </form>
                </div>
                <div class="col-md-4">
                    <form class="card-body" id="formulario">
                        <div class="form-group">
                            <select id="transmicion" class="form-control">
                                <option>Transmicion</option>
                                <option>manual</option>
                                <option>automatica</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="text" id="descripcion" placeholder="Descripcion" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" id="modelo" placeholder="Modelo" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" id="imagen" placeholder="Imagen" class="form-control">
                        </div>
                        <input value="Subir Imagen" class="btn btn-secondary" onclick="#">
                    </form>
                </div>
            </div>
        `;
    }

    static async insertar() {
        const automovil = {};
        automovil.patente = document.getElementById('patente').value;
        automovil.pasajeros = document.getElementById('pasajeros').value;
        automovil.puertas = document.getElementById('puertas').value;
        automovil.precio = document.getElementById('precio').value;
        automovil.marca = document.getElementById('marca').value;
        automovil.transmicion = document.getElementById('transmicion').value;
        automovil.descripcion = document.getElementById('descripcion').value;
        automovil.modelo = document.getElementById('modelo').value;
        automovil.imagen = document.getElementById('imagen').value;

        const automovilJSON = JSON.stringify(automovil);
        const text = await fetch('/automoviles/insertar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: automovilJSON
        })
        const mensaje = JSON.parse(await text.text());
        message.showMessage(mensaje.message, mensaje.css, mensaje.redirect);
    }
}