// Ejemplo 1
//let name1: string = "Juan"; 
//let edad1: number = 30;

// Ejemplo 2
let mensaje = "Hola";  // Inferido como string
mensaje = 123;         // Error en TS

// Ejemplo 3
interface Persona {
  nombre: string;
  edad: number;
}

let alumno: Persona = { nombre: "Ana", edad: 22 };

//Ejemplo 4
class Animal {
  constructor(private nombre: string) {}

  sonido() {
    console.log(`${this.nombre} hace un sonido`);
  }
}

let perro = new Animal("Perro");
perro.sonido();