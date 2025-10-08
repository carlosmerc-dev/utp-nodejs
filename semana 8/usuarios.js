// Clase para gestionar usuarios
var GestorUsuarios = /** @class */ (function () {
    function GestorUsuarios() {
        this.usuarios = [];
    }
    // Método para agregar un usuario con validación de edad
    GestorUsuarios.prototype.agregarUsuario = function (usuario) {
        if (usuario.edad > 17) {
            this.usuarios.push(usuario);
            console.log("\u2705 Usuario ".concat(usuario.nombre, " agregado correctamente."));
        }
        else {
            console.log("\u26A0\uFE0F No se puede registrar a ".concat(usuario.nombre, ". Debe tener m\u00E1s de 17 a\u00F1os."));
        }
    };
    // Método para listar los usuarios registrados
    GestorUsuarios.prototype.listarUsuarios = function () {
        console.log("📋 Lista de usuarios registrados:");
        this.usuarios.forEach(function (u) {
            console.log("- Nombre: ".concat(u.nombre, ", Edad: ").concat(u.edad, ", Correo: ").concat(u.correo));
        });
    };
    return GestorUsuarios;
}());
// Ejemplo de uso
var gestor = new GestorUsuarios();
gestor.agregarUsuario({ nombre: "Carlos", edad: 20, correo: "carlos@example.com" });
gestor.agregarUsuario({ nombre: "Daniel", edad: 30, correo: "daniel@example.com" });
gestor.agregarUsuario({ nombre: "Rosa", edad: 14, correo: "rosa@example.com" });
gestor.agregarUsuario({ nombre: "Roberto", edad: 22, correo: "roberto@example.com" });
gestor.agregarUsuario({ nombre: "Ana", edad: 16, correo: "ana@example.com" });
gestor.listarUsuarios();
