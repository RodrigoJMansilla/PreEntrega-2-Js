// constantes strings
const msjMenu =     "Bienvenido a UvaScript! ¿En qué lo podemos ayudar?\n" +
                    "Ingrese un número:\n" +
                    "1) Agregar/Modificar frutas a su pedido\n" +
                    "2) Ver las frutas en su pedido y el costo total del mismo\n" +
                    "3) Efectuar la compra y terminar con su atención\n"

const msjFrutas =   "Selecciona que fruta desea agregar al pedido:\n" +
                    "Ingrese un número:\n" +
                    "1) Banana\n" +
                    "2) Manzana\n" +
                    "3) Uvas\n" +
                    "4) Sandía\n" +
                    "5) Limón\n" +
                    "6) Naranja\n"

const msjCuotas =   "Ingrese la cantidad de cuotas en las que desea hacer el pago:\n" +
                    "3) 20% Recargo\n" + 
                    "6) 45% Recargo"

// arrays
//gondola es un array que contiene objetos frutas a vender. Estos objetos tienen nombre, precio/kg, stock en kg e id
let gondola=[   {nombre: 'Banana', precio: 400, stockKg: 100, id: 1},
                {nombre: 'manzana', precio: 800, stockKg: 150, id: 2},
                {nombre: 'uva', precio: 2400, stockKg: 75, id: 3},
                {nombre: 'sandia', precio: 150, stockKg: 200, id: 4},
                {nombre: 'limon', precio: 300, stockKg: 120, id: 5},
                {nombre: 'naranja', precio: 250, stockKg: 140, id: 6}    ]

//pedidoFrutas este array vacio va a ir agregando objetos de la clase comprarFrutas
let pedidoFrutas=[]

//variables
let iCuotas = 0
let continuar = true
let choice = 0


/* 
Clase ComprarFrutas
Esta instancia objetos "Frutas" que van a ser compradas.
Tiene dos propiedades:
- código (se tiene que corresponder con la propiedad "id" de los objetos literales del array gondola)
- cantidad (number que define la cantidad comprada de dicha fruta)

tiene dos metodos:
- consultarPrecio: recupera el precio/kg de la fruta en la gondola y devuelve el precio de la fruta en el pedido (cantidad * precio) Este método se utiliza en el siguiente método.
- confirmarAgregado: Este muestra el costo de la cantidad de fruta a comprar y solicita una confirmación para que la fruta sea agregada al pedido. Una vez confirmado, el método envia la instancia de la clase en cuestión (entera) al array que conforma el pedido "pedidoFrutas"

*/
class comprarFrutas {
    constructor(codigo, cantidad){
        this.codigo = codigo
        this.cantidadKg = cantidad
    }

    consultarPrecio(){
        
        let coincidencia = gondola.find((fruta)=>{
            return fruta.id === parseInt(this.codigo)
        })

        return parseFloat(coincidencia.precio * this.cantidadKg).toFixed(2)
    }

    confirmarAgregado(){

        let coincidencia = gondola.find((fruta)=>{
            return fruta.id === parseInt(this.codigo)
        })

        let costo = this.consultarPrecio()

        let rta = confirm(`Usted desea ${this.cantidadKg}Kg de ${coincidencia.nombre} por un costo de ${costo}`)

        if(rta){
            pedidoFrutas.push(new comprarFrutas(this.codigo, this.cantidadKg)) // Esta es la forma que encontre para poder enviar una instancia de esta misma clase, con un método propio a un array que contenga el pedido.
        }
        else{
            console.warn("El nuevo pedido fue cancelado.")
        }
    }
}

