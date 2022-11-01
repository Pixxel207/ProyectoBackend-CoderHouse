class Usuario {
    constructor(name,lastname,libros=[{}],mascotas=[]){
     this.name= name;
     this.lastname=lastname;
     this.libros=libros;
     this.mascotas=mascotas;
    }
    getFullName(){
        const nombreCompleto = `El nombre del usuario es ${this.name} ${this.lastname} :)`;
        return console.log(`${nombreCompleto}`);
    }
    addMascota(mascota){
         this.mascotas.push(mascota);
         console.log(`Se agregó la mascota '${mascota}' correctamente!. Mascotas: '${this.mascotas}'`); 
    }
    countMascotas() {
        return this.mascotas.length;
    }
    addBook(nombre, autor){
        let object = {nombre: nombre, autor: autor};
        this.libros.push(object);
        console.log(`Se agregó el libro '${object.nombre}' correctamente!`);
    }
    getBookNames(){
        let array = this.libros.map((e) => e.nombre);
        return array;
    }
}


const usario1 = new Usuario("Ivan","Amarilla",[{autor:"J.R.R TOLKIEN",nombre:"el señor de losa anillos"},{autor:"GEORGE R.R. MARTIN",nombre:"game of thrones"}],["perro","gato","conejo"]);
usario1.getFullName();
usario1.addMascota("Caballo");
console.log(`El total de mascotas del usuario es: ${usario1.countMascotas()}`);
usario1.addBook("Shrek", "William Steig");
console.log("Los libros son: ", usario1.getBookNames());