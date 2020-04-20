class message {
    static showMessage(message, cssClass, redirect) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-3`;
        div.appendChild(document.createTextNode(message));
        //mostrando en el DOM
        const container = document.getElementById('contenedor');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout( () => {
            if(redirect === 'remove') {
                document.querySelector('.alert').remove();
            } else {
                location.href = redirect;
            }
        }, 1000)
    }

    static resetForm() {
        document.getElementById('formulario-titulo').remove();
        document.getElementById('formulario').remove();
    }
}

export { message };