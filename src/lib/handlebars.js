const helpers = {};

helpers.permiso = (valor) => {
    if (valor === 'administrador') {
       return (`
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/users">Usuarios</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Sedes</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/automoviles">Automoviles</a>
            `) 
    }

    if (valor === 'operador') {
        return (`
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Clientes</a>
            `) 
    }
}

module.exports = helpers;