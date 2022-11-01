//Clase Contenedor
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
 //Obtener producto aleatorio
 async getRandom(){
    try {
        const productos = await this.getAll();
        return productos[Math.floor(Math.random() * productos.length)]

    } catch (error) {
        return "Ha ocurrido un error al obtener un producto aleatorio.\n Error: " + error;
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
 async deleteAll(){
    try {
        const eliminar = await fs.promises.unlink("productos.txt",error =>{
            if(error){
               console.log("Hubo un error al eliminar el archivo")
            }else{
                console.log("Se elimino el archivo")
                console.log(eliminar)
            }

        })
    } catch (error) {
        
    }

 }
 
  getName(){
     return this.filename;
  }
 }
//----------------------


const express = require('express')
const app = express()
const PORT = 8080

const objContenedor = new Contenedor("Productos.txt")

const server = app.listen(PORT, () => {
    console.log('Servidor http: Escuchando solicitudes..')
})

app.get('/productos', (req,res) => {
    let productos = objContenedor.getAll()
    res.send('Lista de productos: ' + productos.then(productos => console.log(productos)))
})

app.get('/productoRandom', (req, res) => {
    res.send('Producto aleatorio: ' + objContenedor.getRandom().then(prod => console.log(prod)))
})

