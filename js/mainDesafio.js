

//Clase de Productos de Tienda
class Producto{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }

}

//Array Productos en Catalogo
const arrayTienda =[
    {
        id:1,
        nombre:"Desayuno Personalizado 1",
        precio:1500,
    },
    {
        id:2,
        nombre:"Desayuno Personalizado 2",
        precio:2500,

    },
    {
        id:3,
        nombre:"Desayuno 15 años",
        precio:2700,
    },
    {
        id:4,
        nombre:"Bandeja Salada",
        precio:1800,
    },
    {
        id:5,
        nombre:"Bandeja Salada y Dulce",
        precio:2000,
    },
    {
        id:6,
        nombre:"Torta Personalizada",
        precio:2000,
    },
    {
        id:7,
        nombre:"Torta Personalizada Pokemon",
        precio:2000,
    },
    {
        id:8,
        nombre:"Torta Princesa",
        precio:2000,
    },
    {
        id:9,
        nombre:"Torta Harry",
        precio:2500,
    },
    {
        id:10,
        nombre:"Torta Número",
        precio:3000,
    },
    {
        id:11,
        nombre:"Torta Letra",
        precio:2700,
    },
    {
        id:12,
        nombre:"Bombones y Mini Torta",
        precio:2500,
    },
]

//Array Productos en Carrito
const arrayCarrito = [];

//Funcion Mostrar Catalogo
const mostrarTienda = () =>{
    let listaProductos = "";
    for (let producto in arrayTienda) {
        const sigProducto = `Producto ${arrayTienda[producto].id}: ${arrayTienda[producto].nombre}. Precio: ${arrayTienda[producto].precio} \n`
        listaProductos += sigProducto;
    }
    alert(listaProductos);
}

//Funcion Buscar en Catálogo
const buscarProductoArrayTienda = () =>{
    let productoBuscado = prompt("Ingresa el nombre del producto que quires buscar");
    productoBuscado = productoBuscado.toUpperCase();
    alert(`Usted ha buscado el producto: ${productoBuscado}`);
    let productoEncontrado = arrayTienda.filter((producto)=>producto.nombre.toUpperCase() == productoBuscado);
    if(productoEncontrado==""){
        alert("Producto no encontrado.")
        let preguntaBuscar = prompt("¿Quiere buscar otro producto?:\n SI/NO ")
        preguntaBuscar = preguntaBuscar.toUpperCase();
        while (preguntaBuscar != "SI" && preguntaBuscar != "NO"){
            preguntaBuscar = prompt("Opción Inválida. ¿Quiere buscar otro producto en el catálogo?: SI/NO");
            preguntaBuscar = preguntaBuscar.toUpperCase();
        };
        if(preguntaBuscar=="SI"){
            buscarProductoArrayTienda();
        }
        else{
            mostrarMenu();
        }      
    }else{
        alert(`El producto ${productoBuscado} se encuentra en la tienda.`)
        mostrarMenu();
    }
    
}

//Funcion Agregar Producto Array
const agregarProductoArrayTienda = () =>
{      
        let pregAgregarProductoTienda = prompt("¿Quiere agregar un producto al catálogo?:\n SI/NO");
        pregAgregarProductoTienda = pregAgregarProductoTienda.toUpperCase();
        while (pregAgregarProductoTienda != "SI" && pregAgregarProductoTienda != "NO"){
            pregAgregarProductoTienda = prompt("Opción Inválida. ¿Quiere agregar un producto al catálogo?: SI/NO");
            pregAgregarProductoTienda = pregAgregarProductoTienda.toUpperCase();
        };
        while (pregAgregarProductoTienda=="SI"){
            let id=1;
            if(arrayTienda.length>0)
            {
                id=arrayTienda[arrayTienda.length-1].id+1;
            }
            
            let nombre = prompt("Ingrese el nombre del producto que desea agregar.");
            let precio = Number(prompt("Ingrese el precio del producto que desea agregar."));
            let nuevoProductoTienda = new Producto(id, nombre, precio);
    
            arrayTienda.push(nuevoProductoTienda);
            mostrarTienda();
            pregAgregarProductoTienda = prompt("¿Quiere agregar un producto al catálogo?:\n SI/NO");
            pregAgregarProductoTienda = pregAgregarProductoTienda.toUpperCase();
            while (pregAgregarProductoTienda != "SI" && pregAgregarProductoTienda != "NO"){
                pregAgregarProductoTienda = prompt("Opción Inválida. ¿Quiere agregar un producto al catálogo?: SI/NO");
                pregAgregarProductoTienda = pregAgregarProductoTienda.toUpperCase();
            };
            if(pregAgregarProductoTienda=="SI"){
                agregarProductoArrayTienda();
            }
        }
}

//Funcion Modificar Producto Array
const modificarProductoArrayTienda= () =>
{
   let id= Number(prompt("Ingrese el id del producto del catálogo que quiere modificar."));

   let existe = arrayTienda.some((producto)=>producto.id===id);

   if(existe)
   {
       let productoEncontrado = arrayTienda.find((producto)=>producto.id===id);
       let nuevoNombre = prompt("Ingrese el nuevo nombre.");
       let nuevoPrecio = Number(prompt("Ingrese el nuevo precio."));

       productoEncontrado.nombre = nuevoNombre;
       productoEncontrado.precio = nuevoPrecio;

       console.log(`El producto ${productoEncontrado.id} fue modificado correctamente`)
   }
   else
   {
       alert("Producto no encontrado.")
   }

}

//Funcion Eliminar Producto Array
const eliminarProductoArrayTienda = () =>
{
    let pregEliminarProductoTienda = prompt("¿Quiere eliminar un producto del catálogo?:\n SI/NO");
    pregEliminarProductoTienda = pregEliminarProductoTienda.toUpperCase();
    while (pregEliminarProductoTienda != "SI" && pregEliminarProductoTienda != "NO"){
        pregEliminarProductoTienda = prompt("Opción Inválida. ¿Quiere eliminar un producto al catálogo?: SI/NO");
        pregEliminarProductoTienda = pregEliminarProductoTienda.toUpperCase();
    };
    while (pregEliminarProductoTienda=="SI"){
        let id= Number(prompt("Ingrese el id del producto que desea eliminar."));

        let productoEncontrado = arrayTienda.find((producto)=>producto.id===id);

        if(!productoEncontrado)
        {
            alert("Producto no Encontrado.");
        }
        else
        {
            let indice = arrayTienda.indexOf(productoEncontrado);
            arrayTienda.splice(indice,1);          
        }
        mostrarTienda();
        pregEliminarProductoTienda = prompt("¿Quiere eliminar un producto del catálogo?:\n SI/NO");
        pregEliminarProductoTienda = pregEliminarProductoTienda.toUpperCase();
        while (pregEliminarProductoTienda != "SI" && pregEliminarProductoTienda != "NO"){
            pregEliminarProductoTienda = prompt("Opción Inválida. ¿Quiere eliminar un producto al catálogo?: SI/NO");
            pregEliminarProductoTienda = pregEliminarProductoTienda.toUpperCase();
        };
        if(pregEliminarProductoTienda=="SI"){
            eliminarProductoArrayTienda();
        }
    }
}

/*//Clase de Productos de Carrito
class ProductoCarrito{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }

}*/

//Mostrar Carrito
const mostrarCarrito = () =>{
    let listaProductos = "";
    for (let producto in arrayCarrito) {
        const sigProducto = `Producto ${arrayCarrito[producto].id}: ${arrayCarrito[producto].nombre}. Precio: ${arrayCarrito[producto].precio} \n`
        listaProductos += sigProducto;
    }
    alert(listaProductos);
}

//Funcion Agregar Producto a Carrito
const agregarProductoArrayCarrito = () =>
{      
    let pregAgregarProductoCarrito = prompt("¿Quiere agregar un producto al carrito?:\n SI/NO");
    pregAgregarProductoCarrito = pregAgregarProductoCarrito.toUpperCase();
    while (pregAgregarProductoCarrito != "SI" && pregAgregarProductoCarrito != "NO"){
        pregAgregarProductoCarrito = prompt("Opción Inválida. ¿Quiere agregar un producto al carrito?: SI/NO");
        pregAgregarProductoCarrito = pregAgregarProductoCarrito.toUpperCase();
    };
    if(pregAgregarProductoCarrito=="SI"){
        mostrarTienda();
        let id= Number(prompt("Ingrese el id del producto del catálogo que quiere agregar al carrito."));
        let existe = arrayTienda.some((producto)=>producto.id===(id));
        if(existe)
        {
            arrayCarrito.push(arrayTienda[(id-1)]);
            console.log(`${arrayTienda[(id-1)].nombre} fue agregado al carrito exitosamente.`)
            alert(`${arrayTienda[(id-1)].nombre} fue agregado al carrito exitosamente.`)
            mostrarCarrito();
            agregarProductoArrayCarrito();
        }
        else
        {
            alert("Producto no encontrado.");
            agregarProductoArrayCarrito();       
        }
    }else{
        return;
    }   
}

//Funcion Eliminar Producto a Carrito
const eliminarProductoArrayCarrito = () =>
{
    console.log(arrayCarrito);
    let pregEliminarProductoCarrito = prompt("¿Quiere eliminar un producto del carrito?:\n SI/NO");
    pregEliminarProductoCarrito = pregEliminarProductoCarrito.toUpperCase();
    while (pregEliminarProductoCarrito != "SI" && pregEliminarProductoCarrito != "NO"){
        pregEliminarProductoCarrito = prompt("Opción Inválida. ¿Quiere eliminar un producto del carrito?: SI/NO");
        pregEliminarProductoCarrito = pregEliminarProductoCarrito.toUpperCase();
    };
    if(pregEliminarProductoCarrito=="SI"){
        mostrarCarrito();
        let id= Number(prompt("Ingrese el id del producto que desea eliminar del carrito."));
        let productoEncontrado = arrayCarrito.find((producto)=>producto.id===id);
        if(!productoEncontrado)
        {
            alert("Producto no Encontrado.");
            eliminarProductoArrayCarrito();
        }
        else
        {
            let indice = arrayCarrito.indexOf(productoEncontrado);
            if (indice !== -1){
                console.log(`${arrayCarrito[indice].nombre} fue eliminado del carrito exitosamente.`)
                alert(`${arrayCarrito[indice].nombre} fue eliminado del carrito exitosamente.`)
                arrayCarrito.splice((indice),1);
                mostrarCarrito();
                eliminarProductoArrayCarrito();  
            }else{
                alert("Producto no Encontrado.");
                eliminarProductoArrayCarrito();
            } 
        }
    }else{
        return;
    }  
}

mostrarMenu();

//Funcion Mostrar Menu con Opciones
function mostrarMenu()
{
    let opcion = 0;
   
    while(opcion!==10 && opcion!==9)
    {
        opcion = Number( prompt(`Seleccione el número de la opción correspondiente:
                           1. Mostrar Catálogo de Productos
                           2. Buscar Producto en Catálogo
                           3. Agregar Producto a Catálogo
                           4. Modificar Producto de Catálogo
                           5. Eliminar Producto de Catálogo
                           6. Mostrar Carrito
                           7. Agregar Producto al Carrito
                           8. Eliminar Producto del Carrito
                           9. Finalizar Compra
                           10. Salir`));

        switch(opcion)
        {
                case 1:
                {
                    mostrarTienda();
                    break;
                }
                case 2: 
                {
                    buscarProductoArrayTienda();
                    break;
                }
                case 3: 
                {
                    agregarProductoArrayTienda();
                    break;
                }
                case 4: 
                {
                    modificarProductoArrayTienda();
                    break;
                }
                case 5:
                {
                    eliminarProductoArrayTienda();
                    break;
                }
                case 6:
                {
                    mostrarCarrito();
                    break;
                }
                case 7:
                {
                    agregarProductoArrayCarrito();
                    break;
                }
                case 8:
                {
                    eliminarProductoArrayCarrito();
                    break;
                }
                case 9:
                {
                    mostrarCarrito();
                    alert("¡Muchas gracias por su compra!. \nA continuación lo redirigiremos para que pueda realizar el pago.");
                    break;
                }
                case 10:
                {
                    alert("Gracias por Visitarnos.")
                    break;
                }
                default:{
                    alert("opcion inválida");
                    break;
                }
        }
    }
}

