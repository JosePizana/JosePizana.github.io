const botonAnyadir = document.getElementById('botonAnyadir')
const panel = document.getElementById('panel')
const nombre = document.getElementById('nombre')
const solucion = document.getElementById('solucion')
const botonResuelve = document.getElementById('botonResuelve')
const formulario = document.getElementById('formulario') || document.querySelector('form')

let amigos = []
let solucionClientes = new Map()

function render() {
    panel.innerHTML = ''

    if (amigos.length === 0) {
        panel.innerHTML = '<div class= empty>Añade al menos 3 amigos para repartir.</div>'
        return
    }

    const ul = document.createElement('ul')
    amigos.forEach((amigo) => {
        const li = document.createElement('li')
        const nombreSpan = document.createElement('span')
        nombreSpan.textContent = amigo

        const botonBorrar = document.createElement('button')
        botonBorrar.textContent = 'Borrar'
        botonBorrar.className = 'borrar'
        botonBorrar.dataset.id = amigo

        li.append(nombreSpan, botonBorrar)
        ul.append(li)
    })

    panel.append(ul)
}

function renderSolucion() {
    solucion.innerHTML = ''

    if (solucionClientes.size === 0) {
        solucion.innerHTML = '<div class=empty>Pulsa Reparte cuando haya al menos 3 amigos.</div>'
        return
    }

    const ul = document.createElement('ul')
    solucionClientes.forEach((destino, regalador) => {
        const li = document.createElement('li')
        const fila = document.createElement('div')
        fila.className = 'solucion-item'

        const from = document.createElement('span')
        from.textContent = regalador
        const arrow = document.createElement('span')
        arrow.textContent = '→'
        arrow.style.textAlign = 'center'
        arrow.style.width = '1rem'

        const to = document.createElement('span')
        to.textContent = destino

        fila.append(from, arrow, to)
        li.append(fila)
        ul.append(li)
    })

    solucion.append(ul)
}

function borraAmigo(nombreAmigo) {
    amigos = amigos.filter((x) => x !== nombreAmigo)
    render()
    solucionClientes.clear()
    renderSolucion()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function reparto() {
    if (amigos.length < 3) {
        return false
    }

    const destinatarios = [...amigos]
    solucionClientes = new Map()

    for (const regalador of amigos) {
        const candidatos = destinatarios.filter((x) => x !== regalador)
        if (candidatos.length === 0) {
            return false
        }

        const eleccion = candidatos[aleatorio(0, candidatos.length - 1)]
        solucionClientes.set(regalador, eleccion)

        const idx = destinatarios.indexOf(eleccion)
        destinatarios.splice(idx, 1)
    }

    for (const [regalador, destino] of solucionClientes) {
        if (regalador === destino) {
            return false
        }
    }

    return true
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const valor = nombre.value.trim()

    if (!valor) {
        alert('Introduce un nombre válido')
        return
    }

    if (!amigos.includes(valor)) {
        amigos.push(valor)
        nombre.value = ''
        render()
        renderSolucion()
    } else {
        alert('Ese amigo ya existe en la lista')
    }
})

panel.addEventListener('click', (e) => {
    if (e.target.matches('.borrar')) {
        const nombreAmigo = e.target.dataset.id
        borraAmigo(nombreAmigo)
    }
})

botonResuelve.addEventListener('click', () => {
    let correcto = reparto()
    let intentos = 0

    while (!correcto && intentos < 50) {
        correcto = reparto()
        intentos++
    }

    if (!correcto) {
        alert('No ha sido posible generar un reparto válido. Cambia la lista y vuelve a intentar.')
    }

    renderSolucion()
})

render()
renderSolucion()
