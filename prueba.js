const fs = require("fs");
//Clase Contenedor
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
        //console.log(productos)
        return productos;
     } else{
         return [];
     }
 } catch(error){
         return "El archivo no se puede leer" + error;
     }
 }
 async getById(id){
    try{
     //  Obtener todos los productos
     const productos = await this.getAll();
     // Buscar nuestro producto por el id
     const producto = productos.find(elemento=>elemento.id === id);
     return producto;
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
//---------------------

//const contenedor = require('./contenedor.js')

const objContenedor = new Contenedor("./Productos.txt")

//let productos = objContenedor.getAll()

objContenedor.getAll().then(val => console.log(val))

