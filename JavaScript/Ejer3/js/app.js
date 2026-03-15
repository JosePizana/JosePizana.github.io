let clave = Math.floor(Math.random() * 5) + 1;

function cifrar(mensaje, desplazamiento = clave) {
    mensaje = mensaje.toLowerCase();
    let resultado = '';

    for (const element of mensaje) {
        let char = element;

        if (char >= 'a' && char <= 'z') {
            let codigo = char.charCodeAt(0);
            let posicion = codigo - 'a'.charCodeAt(0);
            posicion = (posicion + desplazamiento) % 26;
            let letraCifrada = String.fromCharCode(posicion + 'a'.charCodeAt(0));
            resultado += letraCifrada;
        } else {
            resultado += char;
        }
    }

    return resultado;
}

const mensajeInput = document.getElementById('mensaje');
const btnCifrar = document.getElementById('btnCifrar');
const resultadoEl = document.getElementById('resultado');
const claveDisplay = document.getElementById('claveDisplay');

claveDisplay.textContent = clave;

btnCifrar.addEventListener('click', () => {
    const mensaje = mensajeInput.value.trim();

    if (!mensaje) {
        resultadoEl.textContent = 'Introduce un mensaje para cifrar';
        return;
    }

    const mensajeCifrado = cifrar(mensaje);
    resultadoEl.textContent = mensajeCifrado;
});

// Valor predeterminado visible
resultadoEl.textContent = cifrar('hola mundo');