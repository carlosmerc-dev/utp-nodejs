// Ejemplo 1
var name1 = "Juan";
var edad1 = 30;
var alumno = { nombre: "Ana", edad: 22 };
//Ejemplo 4
var Animal = /** @class */ (function () {
    function Animal(nombre) {
        this.nombre = nombre;
    }
    Animal.prototype.sonido = function () {
        console.log("".concat(this.nombre, " hace un sonido"));
    };
    return Animal;
}());
var perro = new Animal("Perro");
perro.sonido();
