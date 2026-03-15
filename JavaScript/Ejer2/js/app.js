function aleatorio(max) {
    let num=Math.floor(Math.random() * max) + 1;
    return num
}

function insertarNumero(primitiva, numero){
    if (primitiva.indexOf(numero)>-1){
        //no añadir el número porque ya existe
}
    else primitiva.push(numero)
}

let numsPrimitiva=6
let primitiva=[]
while(primitiva.length<numsPrimitiva){
    let numero=aleatorio(49)
    insertarNumero(primitiva,numero)
}

console.log(primitiva)