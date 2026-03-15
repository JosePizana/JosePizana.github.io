let caracteres = "abcdefghijklmnopqrstuvwxyz";
let caracteresMayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let caracteresNumeros = "0123456789";
let caracteresEspeciales = "!@#$%^&*()_+|~`-={}[]:;'<>?,./";

let resultados = [];

// Entero aleatorio entre min y max
const numeroAleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function generarPasswordConRestricciones() {
    const minTotal = 8;
    const maxTotal = 50;
    const minNumeros = 1;
    const maxNumeros = 2;
    const minEspeciales = 1;
    const maxEspeciales = 2;
    const minMayusculas = 1;

    // Elegir cantidad de números y especiales
    const cantidadNumeros = numeroAleatorio(minNumeros, maxNumeros);
    const cantidadEspeciales = numeroAleatorio(minEspeciales, maxEspeciales);

    // Elegir longitud total
    let longitud = numeroAleatorio(minTotal, maxTotal);

    // Asegurarnos de que la longitud tiene al menos la misma cantidad que los mínimos necesarios
    const minNecesarios = cantidadNumeros + cantidadEspeciales + minMayusculas;
    if (longitud < minNecesarios) longitud = minNecesarios;

    const cantidadMayusculas = minMayusculas;

    // Relleno con minúsculas
    const cantidadMinusculas = longitud - (cantidadNumeros + cantidadEspeciales + cantidadMayusculas);

    // Declaro para almacenarlo después
    let password = '';

    // Añadir números
    for (let i = 0; i < cantidadNumeros; i++) {
        password += caracteresNumeros.charAt(numeroAleatorio(0, caracteresNumeros.length - 1));
    }

    // Añadir caracteres especiales
    for (let i = 0; i < cantidadEspeciales; i++) {
        password += caracteresEspeciales.charAt(numeroAleatorio(0, caracteresEspeciales.length - 1));
    }

    // Añadir mayúsculas
    for (let i = 0; i < cantidadMayusculas; i++) {
        password += caracteresMayusculas.charAt(numeroAleatorio(0, caracteresMayusculas.length - 1));
    }

    // Añadir minúsculas
    for (let i = 0; i < cantidadMinusculas; i++) {
        password += caracteres.charAt(numeroAleatorio(0, caracteres.length - 1));
    }

    // Desordenar la contrasña
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    // Guardar resultados en el array
    resultados[0] = password;
    resultados[1] = longitud;
    resultados[2] = cantidadNumeros;
    resultados[3] = cantidadEspeciales;
    resultados[4] = cantidadMayusculas;
    resultados[5] = cantidadMinusculas;

    return password;
}

const passwordGenerada = generarPasswordConRestricciones();
console.log('Generador de contraseña');
console.log('Password:', passwordGenerada);
console.log('Longitud:', resultados[1]);
console.log('Números:', resultados[2]);
console.log('Especiales:', resultados[3]);
console.log('Mayúsculas:', resultados[4]);
console.log('Minúsculas:', resultados[5]);