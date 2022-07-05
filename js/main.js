let divRowTienda = document.getElementById("rowTienda");
let divCarrito = document.getElementById("carrito");
let precioTotal = 0;
let totalSpan = document.getElementById('total');
let botonVaciar = document.getElementById('botonVaciar');
let botonComprar = document.getElementById('botonComprar');

const miCarrito = new Carrito([]);
mostrarProductos();
mostrarCarrito();
mostrarTotalCarrito();
funcionesBotones();
comprarCarrito();

function mostrarProductos()
{
    baseDeDatos.forEach(element=>{ 
        const divColProducto = document.createElement("div");
        divColProducto.className = "container col-lg-6 col-xl-4";
        divColProducto.innerHTML = `<div id="tarjetaComida" class="card mb-4 box-shadow border border-dark shadow">
        <img class="imgCardsTienda card-img-top img-fluid" alt="${element.nombre}" style="object-fit: cover; max-height: 300px;" src="${element.imagen}" data-holder-rendered="true">
        <div id="tarjetaDescripcion" class="card-body">                       
        <ul class="list-group mb-3 shadow">
        <li class="list-group-item active bg-warning bg-opacity-50 text-dark text-center border border-dark"><h5 class="lead">${element.nombre}</h5></li>
        <li id="descripcionComida" class="list-group-item border-dark"><p>${element.descripcion}</p></li>
        <li id="precioComida" class="list-group-item active bg-warning bg-opacity-50 text-dark text-center p-1 border border-dark"><p class="pt-1">$${element.precio}</p></li>
        </ul>
        <div class="d-flex justify-content-center">
        <button type="button" id="botonAnadirProducto${element.id}" class="btn btn-sm btn-warning text-white mx-1 shadow align-self-center" idProducto="${element.id}">Agregar al Carrito</button>
        </div>
        </div>
        </div>
        </div>`;
        divRowTienda.appendChild(divColProducto)
        let botonAnadirProducto = document.getElementById(`botonAnadirProducto${element.id}`);
        botonAnadirProducto.addEventListener('click', ()=> {
            const productoParaCarrito ={
                ...element,
                cantidad:1,
            }
            miCarrito.agregarProducto(productoParaCarrito);
            Toastify({
                text: "!Has agregado un producto al carrito!",
                duration: 3000
            }).showToast(); 
            mostrarCarrito();
            console.log("Carrito", miCarrito)
        })

    })
    
}

function mostrarCarrito()
{
    miCarrito.obtener();
    divCarrito.innerHTML="";
    miCarrito.productos.forEach(element =>{
        let listProductoCarrito = document.createElement('li');
        
        listProductoCarrito.className= "list-group-item text-right mx-2";
        listProductoCarrito.innerText = `${element.cantidad} x ${element.nombre} - $${element.precio*element.cantidad}`;
        let botonEliminarProductoCarrito = document.createElement('button');
        botonEliminarProductoCarrito.className = "botonEliminarProductoCarrito btn btn-secondary mx-5 shadow";
        botonEliminarProductoCarrito.textContent = 'X';
        botonEliminarProductoCarrito.style.marginLeft = '1rem';
        botonEliminarProductoCarrito.setAttribute('item', element);
        listProductoCarrito.appendChild(botonEliminarProductoCarrito);
        divCarrito.appendChild(listProductoCarrito);
        botonEliminarProductoCarrito.addEventListener('click', ()=>{
            eliminarCarritoProducto(element);
            Toastify({
                text: "!Has eliminado un producto del carrito!",
                duration: 3000
            }).showToast(); 
            mostrarCarrito();
            console.log("Carrito", miCarrito)
            
        })
    })
    mostrarTotalCarrito();
}

function mostrarTotalCarrito(){
    totalSpan.innerHTML = "";
    total = miCarrito.calcularTotal();
    totalSpan.innerHTML = total;
}

function funcionesBotones()
{
    vaciarCarrito();
}

function vaciarCarrito()
{
    botonVaciar.addEventListener('click', ()=>{
        miCarrito.vaciarCarrito();
        mostrarCarrito();
    })
}

function eliminarCarritoProducto(producto){
    miCarrito.eliminarCarritoProducto(producto);
    mostrarCarrito();
}

function comprarCarrito(){
    botonComprar.addEventListener('click', ()=>{
        total = miCarrito.calcularTotal();
        total == 0 ? swal("Debe agregar productos para realizar una compra.") : swal("¡Muchas gracias por su compra", " ", "success");
        miCarrito.vaciarCarrito();
        localStorage.clear();
        mostrarCarrito();
    })
}
