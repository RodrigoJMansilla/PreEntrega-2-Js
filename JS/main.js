

//función que recupera una fruta de gondola segun su id. Generalmente se usa enviando un código de los objetos instanciados de comprarFruta, para entender que fruta de la gondola es la que esta comprando el usuario en su pedido.
function recuperaFruta(codigo){
    encontrado = gondola.find((fruta)=>{return fruta.id === codigo})
    return encontrado
}



// caso agregar producto
function agregoCarrito(){
    let codigo = parseInt(prompt(msjFrutas))

    while(isNaN(codigo) || recuperaFruta(codigo)== undefined){
            console.warn("Ha ingresado un valor erroneo. Por favor ingréselo nuevamente\n")
            codigo = parseInt(prompt(msjFrutas))       
    }

    let cantidad = parseFloat(prompt(`Ingrese la cantidad de kg de ${recuperaFruta(codigo).nombre} deseada`))

    while(cantidad < 0 || isNaN(cantidad)){
        console.warn("Ha ingresado un valor de cantidad erroneo, por favor ingréselo nuevamente")
        cantidad = parseFloat(prompt(`Ingrese la cantidad de kg de ${recuperaFruta(codigo).nombre} deseada`))
    }

    instancia = new comprarFrutas (codigo, cantidad)

    let band1 = 0

    for(fruta of pedidoFrutas){
        if(fruta.codigo === instancia.codigo){
            band1 = 1
            if(confirm(`Su pedido ya incluye ${fruta.cantidadKg} Kg de ${recuperaFruta(fruta.codigo).nombre} ¿Desea agregar otros ${instancia.cantidadKg} Kg ?`)){
                fruta.cantidadKg = fruta.cantidadKg + instancia.cantidadKg
            }else{
                console.warn("Su pedido no fue modificado.")
            }
        }
    }

    if(band1 == 0){
        instancia.confirmarAgregado()
    }
    
}


/* ACTIVIDAD VER DE IMPLEMENTAR CON FOREACH */
// funcion que calcula el total del costo del pedido
function calcularTotal(){
    let acum = 0
    for(fruta of pedidoFrutas){
        acum += parseFloat(fruta.consultarPrecio())
    }
    return acum
}




//caso ver pedido
//función que muestra todo el pedido 
function verPedido(){
    console.log('Su pedido esta formado por:\n')
    for(fruta of pedidoFrutas){
        let estaFruta = gondola.find((i)=>{ return i.id === fruta.codigo })

        console.log(`${fruta.cantidadKg}Kg de ${estaFruta.nombre} por $${fruta.consultarPrecio()}`)

    }
    acum = calcularTotal()
    console.log(`El costo total de su pedido es de: $${acum}`)
}


//funcion que calcula cuotas
function calculaCuotas(precio, i){
    
    if(i==3){
        precio *= 1.2
        return precio/i
    }
    else if(i==6){
        precio *= 1.45
        return precio/i
    }
}

//caso efectuar la compra
//función que corrobora la acción de finalizar y ofrece cuotas
function finalizarCompra(){
    alert(`El precio final de su carrito es de: $${calcularTotal()}`)

    if(confirm("¿Desea pagar en cuotas?")){
        iCuotas = parseInt(prompt(msjCuotas))
        
        while((iCuotas !== 3 && iCuotas !== 6) || isNaN(iCuotas)){
            console.warn("El número de cuotas debe ser 3 o 6, ingréselo nuevamente.\n")
            iCuotas = parseInt(prompt("ingrese '3' o '6' de acuerdo a la cantidad de cuotas requeridas."))
        }

        alert("El pago se realizará en " + iCuotas + " cuotas de $" + calculaCuotas(calcularTotal(), iCuotas))
    }
    direccionCliente = prompt("Ingrese la dirección de envío:")
    alert("Muchas Gracias por su compra! ya estamos preparando su pedido.")
}

// función resetear: inicializa las variables de nuevo a 0.
function resetear(){
    pedidoFrutas=[]
}

// función iniciar: genera el loop del menu
function iniciar(){
    resetear()
    while(continuar){
        menu()
    }
}

//función menu
function menu(){
    choice = parseInt(prompt(msjMenu))
    switch(choice){
        case 1:
            // caso agregar producto
            agregoCarrito()
            break
        case 2:
            // caso ver las frutas del carrito
            verPedido()
            break
        case 3:
            // caso ver costo total del carrito
            if(confirm("¿Desea Finalizar su compra?")){
                finalizarCompra()
                actualizarStock(pedidoFrutas)
                continuar = false
            }
            break
        default:
            break
    }
}

// función que resta todo el stock vendido de "pedidoFrutas" del stock de gondola. Esta función como no interactúa con el usuario, se puede corroborar viendo el array gondola, luego de finalizada la compra.
function actualizarStock(arrayVenta){
    let frutaGondola
    arrayVenta.forEach((fruta)=>{
        frutaGondola = recuperaFruta(fruta.codigo)
        frutaGondola.stockKg = frutaGondola.stockKg - fruta.cantidadKg
        gondola[frutaGondola.id-1].stockKg = frutaGondola.stockKg
    })
}

