class Carrito{

    constructor(productos)
    {
        this.productos = productos || "productos";
        this.items = this.obtener();
    }

    agregarProducto(producto)
    {
        const existe = this.productos.find(element => producto.id ===element.id )
        if (existe)
        {
            existe.cantidad = producto.cantidad+existe.cantidad
            this.guardar();
        }
        else{
            this.productos.push(producto)
            this.guardar();
        }
    }

    calcularTotal()
    {
        let total = 0;
        for (let i=0; i<this.productos.length;i++)
        {
            total+=this.productos[i].precio*this.productos[i].cantidad;
        }
        return total;
    }

    vaciarCarrito()
    {
        this.productos=[];
        localStorage.clear();
    }

    eliminarCarritoProducto(producto){
        const prodABorrar = this.productos.find(element => producto.id ===element.id )
        const index = this.productos.indexOf(prodABorrar);
        this.productos.splice(index,1)
        this.guardar();
    }

    guardar() {
        localStorage.setItem("Carrito", JSON.stringify(this.productos));
    }

    obtener() {
        const productosGuardados = localStorage.getItem("Carrito");
        this.productos = JSON.parse(productosGuardados) || [];
        return this.productos;
    }

}  