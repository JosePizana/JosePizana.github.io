function carasDado(caras) {
    let resultado = Math.floor(Math.random() * caras) + 1;
    return resultado;
}

console.log("Te ha tocado el número " + carasDado(6));