const fs = require("fs");

class Contenedor{
   constructor(name){
   this.filename = name;
}

   async save(product){
  try {
    if(fs.existsSync(this.filename)){

        const productos = await this.getAll();
        if(productos.length>0){
            // agregar un producto mas ademas del primero
            const lastId =productos [productos.length -1].id+1;
            product.id = lastId;
            productos.push(product);
            await fs.promises.writeFile(this.filename,JSON.stringify([productos],null,2));
        }else{
            // agregamos primer producto
            product.id = 1;
            await fs.promises.writeFile(this.filename,JSON.stringify([product],null,2));
        }
    }else{
        product.id = 1;
        await fs.promises.writeFile(this.filename,JSON.stringify([product],null,2));
    }

} catch (error) {
    return "El producto no puede guardarse ";
}
   }
   async getAll(){
     try {
     const contenido = await fs.promises.readFile(this.filename,"utf-8");
    if(contenido.length>0){
       const productos = JSON.parse(contenido);
       return productos;
    } else{
        return [];
    }
} catch(error){
        return "El  archivo no se puede leer";
    }
}
async getById(id){
   try{
    //  Obtener todos los productos
    const productos = await this.getAll();
    // Buscar nuestro producto por el id
    const producto = productos.find(elemento=>elemento.id === id);
   }catch(error){
    return "El producto no se encuentra";
   }
}
async deleteById(id){
    try{
        const productos = await this.getAll();
        const newProducts = productos.filter(elemento=>elemento.id !== id)
        await fs.promises.writeFile(this.filename,JSON.stringify(newProducts,null,2));
        return `El producto con el id ${id} fue eliminado `;
    } catch (error) {
        return "El elemento no puede ser eliminado"
    }
}

 getName(){
    return this.filename;
 }
}

export const objContenedor = new Contenedor("Productos.txt")

/*const dispositivo1 ={
    id: 1,
    title: "Iphone 11 pro",
    precio: 550,
    link:"https://i.blogs.es/187a45/iphone-11-pro-02/840_560.jpg"
}
const dispositivo2 ={
    id: 2,
    title: "Iphone 13 pro",
    precio: 890,
    link:"https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_GEO_09142021_inline.jpg.slideshow-large_2x.jpg"
}
const dispositivo3 ={
    id: 3,
    title: "Iphone 8 plus",
    precio: 1890,
    link:"https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_GEO_09142021_inline.jpg.slideshow-large_2x.jpg"
}

const listadoDeProductos = new Contenedor("Productos.txt");
console.log(listadoDeProductos);
const getDate = async()=>{
    await listadoDeProductos.save(dispositivo1);
    await listadoDeProductos.save(dispositivo2);
    await listadoDeProductos.save(dispositivo3);
    const productos = await listadoDeProductos.getAll();
    console.log("Estos son los productos",productos);
    const productoEncontrado = await listadoDeProductos.getById(2);
    console.log("producto encontrado>", productoEncontrado);
    await listadoDeProductos.deleteById(1);
}
getDate();*/

