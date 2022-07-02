//Clase de Productos de Tienda
class Producto{
    constructor(id, nombre, precio, descripcion){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
    }

}

window.onload = function () {

    //Declaracion de Variables
    let divRowTienda = document.getElementById("rowTienda");
    let divCarrito = document.getElementById("carrito");
    let arrayCarrito = [];
    let precioTotal = 0;
    let totalSpan = document.getElementById('total');
    let botonVaciar = document.getElementById('botonVaciar');
    let botonComprar = document.getElementById('botonComprar');
    let baseDeDatos = [];
    let funcionBaseDeDatos = async () => {
        await fetch('../baseDeDatos.json')
        .then( (res) => res.json())
        .then( (producto) => {producto.forEach(producto => {
            baseDeDatos.push(producto);
        })})
    }
    //Creacion de Cards para productos en la base de datos del catalogo
    async function creadorTienda (){
        await funcionBaseDeDatos();
        baseDeDatos.forEach((producto)=>{
            let {id, nombre, precio, imagen, descripcion} = producto
            const divColProducto = document.createElement("div");
            divColProducto.className= "container col-lg-6 col-xl-4";
            divColProducto.innerHTML = `<div id="tarjetaComida" class="card mb-4 box-shadow border border-dark shadow">
            <img class="imgCardsTienda card-img-top img-fluid" alt="${nombre}" style="object-fit: cover; max-height: 300px;" src="${imagen}" data-holder-rendered="true">
            <div id="tarjetaDescripcion" class="card-body">                       
            <ul class="list-group mb-3 shadow">
            <li class="list-group-item active bg-warning bg-opacity-50 text-dark text-center border border-dark"><h5 class="lead">${nombre}</h5></li>
            <li id="descripcionComida" class="list-group-item border-dark"><p>${descripcion}</p></li>
            <li id="precioComida" class="list-group-item active bg-warning bg-opacity-50 text-dark text-center p-1 border border-dark"><p class="pt-1">$${precio}</p></li>
            </ul>
            <div class="d-flex justify-content-between align-items-center">
            <button type="button" id="botonEliminar${id}" class="btn btn-sm btn-warning text-white mx-1 shadow" idProducto="${id}">Eliminar del Carrito</button>
            <button type="button" id="botonAnadirProducto${id}" class="btn btn-sm btn-warning text-white mx-1 shadow" idProducto="${id}">Agregar al Carrito</button>
            </div>
            </div>
            </div>
            </div>`
            divRowTienda.appendChild(divColProducto)
            let botonEliminarProducto = document.getElementById(`botonEliminar${id}` );
            let botonAnadirProducto = document.getElementById(`botonAnadirProducto${id}`);
            botonAnadirProducto.addEventListener('click', anadirCarrito);
            botonAnadirProducto.addEventListener('click', () =>{
                Toastify({
                    text: "!Has agregado un producto al carrito!",
                    duration: 3000
                }).showToast();
            
            });
            botonEliminarProducto.addEventListener(`click`, eliminarCarritoProducto2); 
            botonEliminarProducto.addEventListener('click', () =>{
                if (arrayCarrito.length!==0){
                    Toastify({
                        text: "!Has eliminado un producto del carrito!",
                        duration: 3000,
                        
                    }).showToast();
                }
                
            
            });
 
        });       
    }

    //Creacion Carrito
    async function crearCarrito() {
        await funcionBaseDeDatos();
        divCarrito.textContent = '';
        let carritoSinDuplicados = [...new Set(arrayCarrito)];
        carritoSinDuplicados.forEach(function (producto) {
            // Obtener producto de base de datos
            let miProducto = baseDeDatos.filter(function(productoBaseDatos) {
                return productoBaseDatos.id == producto;
            });
            let numeroUnidadesProducto = arrayCarrito.reduce(function (total, productoId) {
                return productoId === producto ? total += 1 : total;
            }, 0);
            // Crear nodo carrito
            let listProductoCarrito = document.createElement('li');
            listProductoCarrito.className= "list-group-item text-right mx-2";
            listProductoCarrito.innerText = `${numeroUnidadesProducto} x ${miProducto[0].nombre} - $${miProducto[0].precio}`;
            // Boton de borrar
            let botonEliminarProductoCarrito = document.createElement('button');
            botonEliminarProductoCarrito.className = "botonEliminarProductoCarrito btn btn-secondary mx-5 shadow";
            botonEliminarProductoCarrito.textContent = 'X';
            botonEliminarProductoCarrito.style.marginLeft = '1rem';
            botonEliminarProductoCarrito.setAttribute('item', producto);
            botonEliminarProductoCarrito.addEventListener('click', eliminarCarritoProducto);
            botonEliminarProductoCarrito.addEventListener('click', () =>{
                Toastify({
                    text: "!Has eliminado un producto del carrito!",
                    duration: 3000
                }).showToast();
            
            });
            // agregamos a padres
            listProductoCarrito.appendChild(botonEliminarProductoCarrito);
            divCarrito.appendChild(listProductoCarrito);
        })
        localStorage.clear();   
        let arrayCompra = [];
        let index = 0;
        for (let producto of arrayCarrito){
            arrayCompra.push(baseDeDatos[(producto-1)]);               
        }
        for (let producto of arrayCompra){          
            let productoJson = JSON.stringify(producto);
            localStorage.setItem(`Producto ${index}`, productoJson);
            index++;
            console.log(producto)
        }
        let arrayCompraJson = JSON.stringify(arrayCompra);
        localStorage.setItem(`Carrito`, arrayCompraJson);
        
    }

    //Funcion Anadir Carro
    async function anadirCarrito(){
        await funcionBaseDeDatos();
        arrayCarrito.push(this.getAttribute('idProducto'))       
        crearCarrito();
        calcularTotal();
    }
    
    //Funcion Vaciar Carro
    async function vaciarCarrito() {
        await funcionBaseDeDatos();
        arrayCarrito = [];
        crearCarrito();
        calcularTotal();
    }

    //Funcion eliminar producto de carrito desde carrito
    async function eliminarCarritoProducto() {
        await funcionBaseDeDatos();
        // Producto a eliminar de carrito
        let id = this.getAttribute('item');
        arrayCarrito = arrayCarrito.filter(function (productoId) {
            return productoId != id;
        });
        crearCarrito();
        calcularTotal();
    }

     //Funcion eliminar producto de carrito desde tienda
    async function eliminarCarritoProducto2() {
        await funcionBaseDeDatos();
        // Producto a eliminar de carrito
        let id = this.getAttribute('idProducto');
        arrayCarrito = arrayCarrito.filter(function (productoId) {
            return productoId !== id;
        });
        crearCarrito();
        calcularTotal();
    }

    //Funcion calcular Precio Total
    async function calcularTotal() {
        await funcionBaseDeDatos();
        // Limpiar precio anterior
        precioTotal = 0;
        // Recorrer array del carrito
        for (let producto of arrayCarrito) {
            // De cada elemento obtenemos su precio
            let miProducto= baseDeDatos.filter(function(productoBaseDatos) {
                return productoBaseDatos.id == producto;
            });
            precioTotal = precioTotal + miProducto[0].precio;
        }
        let total = precioTotal.toFixed(0);
        totalSpan.textContent = total;
        precioTotal = precioTotal.toFixed(0);
        return precioTotal;
    }

    //Funcion realizar comprar
    async function comprarCarrito(){
        await funcionBaseDeDatos();
        calcularTotal();
        precioTotal == 0 ? swal("Debe agregar productos para realizar una compra.") : swal("¡Muchas gracias por su compra", " ", "success");

        vaciarCarrito();
    }

    //Funcion cargar carrito al refrescar página 
    async function refrescarCarrito(){
        await funcionBaseDeDatos();
        if (arrayCarrito.length===0){
            let arrayNuevoCarrito = JSON.parse(localStorage.getItem("Carrito")) || []; 
            for(let producto of arrayNuevoCarrito){
                    arrayCarrito.push(producto.id);              
            }
            console.log(arrayCarrito)
        }
        calcularTotal();
    }


    //Eventos
    botonVaciar.addEventListener("click", vaciarCarrito)
    botonComprar.addEventListener("click", comprarCarrito)
    
    
    creadorTienda();
    refrescarCarrito();
    crearCarrito();
}

