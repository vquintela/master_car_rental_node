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

helpers.profile = (rol) => {
    if(rol === 'administrador') {
        return(`
            <h6 class="border-top p-2"><i class="fas fa-print mr-3"></i>Reservas</h6>
            <h6 class="border-top p-2"><i class="fas fa-user mr-3"></i>Usuarios</h6>
            <h6 class="border-top p-2"><i class="fas fa-home mr-3"></i>Sedes</h6>
            <h6 class="border-top p-2"><i class="fas fa-car mr-3"></i>Automoviles</h6>
        `)
    }

    if(rol === 'operador') {
        return (`
            <h6 class="border-top p-2"><i class="fas fa-print mr-3"></i>Reservas</h6>
            <h6 class="border-top p-2"><i class="fas fa-user mr-3"></i>Clientes</h6>
        `)
    }
}

module.exports = helpers;