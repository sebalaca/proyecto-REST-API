let cliente = {
    mesa: '',
    hora: '',
    pedido: []
}

const btnGuardarCliente = document.querySelector('#guardar-cliente')
btnGuardarCliente.addEventListener('click', guardarCliente)

function guardarCliente() {
    const mesa = document.querySelector('#mesa').value
    const hora = document.querySelector('#hora').value

    //revisar si hay campos vacios
    const camposVacios = [mesa, hora].some(campo => campo === '')

    if (camposVacios) {
        //Verificar si existe alerta
        const existeAlerta = document.querySelector('.existeAlerta')
        if(!existeAlerta){
            const alerta = document.createElement('div');
            alerta.classList.add('invalid-feedback', 'd-block', 'text-center', 'existeAlerta')
            alerta.textContent = 'Todos los campos son obligatorios'
            document.querySelector('.modal-body form').appendChild(alerta)

            setTimeout(() => {
                alerta.remove()
            }, 3000);
        }
        return
    }

    //Asignar datos de formulario a cliente
    cliente = {...cliente, mesa, hora}
    // console.log(cliente);

    //Ocultar modal
    const modalFormulario = document.querySelector('#formulario')
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario)
    modalBootstrap.hide()

    //Mostrar las secciones
    mostrarSecciones()

    //Obtener platillo de la api
    obtenerPlatillos()
}

function mostrarSecciones() {
    const seccionesOcultas = document.querySelectorAll('.d-none')
    seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'))
}

function obtenerPlatillos() {
    const url = 'http://localhost:4000/platillos'

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarPlatillos(resultado))
        .catch(error => console.log(error))
}

function mostrarPlatillos(platillos) {
    const contenido = document.querySelector('#platillos .contenido')

    platillos.forEach(platillo => {
        const row = document.createElement('div')
        row.classList.add('row')

        const nombre = document.createElement('div')
        nombre.classList.add('col-md-4')
        nombre.textContent = platillo.nombre

        row.appendChild(nombre)
        contenido.appendChild(row)
    })
}