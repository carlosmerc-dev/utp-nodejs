// Definimos la interfaz Usuario
interface Usuario {
  nombre: string;
  edad: number;
  correo: string;
}

// Clase para gestionar usuarios
class GestorUsuarios {
  private usuarios: Usuario[] = [];

  // Método para agregar un usuario con validación de edad
  agregarUsuario(usuario: Usuario): void {
    if (usuario.edad > 17) {
      this.usuarios.push(usuario);
      console.log(`✅ Usuario ${usuario.nombre} agregado correctamente.`);
    } else {
      console.log(`⚠️ No se puede registrar a ${usuario.nombre}. Debe tener más de 17 años.`);
    }
  }

  // Método para listar los usuarios registrados
  listarUsuarios(): void {
    console.log("📋 Lista de usuarios registrados:");
    this.usuarios.forEach((u) => {
      console.log(`- Nombre: ${u.nombre}, Edad: ${u.edad}, Correo: ${u.correo}`);
    });
  }
}

// Ejemplo de uso
const gestor = new GestorUsuarios();

gestor.agregarUsuario({ nombre: "Carlos", edad: 20, correo: "carlos@example.com" });
gestor.agregarUsuario({ nombre: "Daniel", edad: 30, correo: "daniel@example.com" });
gestor.agregarUsuario({ nombre: "Rosa", edad: 14, correo: "rosa@example.com" });
gestor.agregarUsuario({ nombre: "Roberto", edad: 22, correo: "roberto@example.com" });
gestor.agregarUsuario({ nombre: "Ana", edad: 16, correo: "ana@example.com" });

gestor.listarUsuarios();
