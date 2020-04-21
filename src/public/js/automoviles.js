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
                        <input value="Ingresar" class="btn btn-primary" onclick="Automovil.insertar();" readonly>
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
                            <input type="file" id="imagen" class="form-control-file">
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    static async insertar() {
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

        const text = await fetch('/automoviles/insertar', {
            method: 'POST',
            body: formData
        })
        const mensaje = JSON.parse(await text.text());
        message.showMessage(mensaje.message, mensaje.css, mensaje.redirect);
    }
}