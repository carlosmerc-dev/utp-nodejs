
# 🐧 Chuleta de Comandos Linux — Creación, Navegación y Manipulación de Archivos

## 🧭 **Navegación en el sistema**
| Acción | Comando | Ejemplo / Nota |
|--------|----------|----------------|
| Mostrar ruta actual | `pwd` | (`print working directory`) |
| Listar archivos y carpetas | `ls` | muestra el contenido del directorio actual |
| Listar con detalles | `ls -l` | permisos, propietario, tamaño y fecha |
| Listar todo (incluye ocultos) | `ls -a` | archivos que comienzan con “.” |
| Listar con formato legible | `ls -lh` | tamaños en KB, MB, GB |
| Cambiar de directorio | `cd [ruta]` | `cd /home/usuario` |
| Volver al directorio anterior | `cd -` | útil para ir y venir |
| Ir al directorio raíz | `cd /` | raíz del sistema |
| Ir al directorio personal | `cd ~` | atajo al *home* del usuario |

---

## 📁 **Gestión de carpetas (directorios)**
| Acción | Comando | Ejemplo / Nota |
|--------|----------|----------------|
| Crear una carpeta | `mkdir nombre` | `mkdir proyectos` |
| Crear varias a la vez | `mkdir carpeta1 carpeta2` | crea múltiples carpetas |
| Crear con subcarpetas | `mkdir -p ruta/subcarpeta` | crea toda la ruta si no existe |
| Eliminar carpeta vacía | `rmdir nombre` | solo si está vacía |
| Eliminar carpeta con contenido | `rm -r nombre` | elimina todo el contenido |
| Confirmar antes de borrar | `rm -ri nombre` | te pregunta por cada archivo |

---

## 📄 **Gestión de archivos**
| Acción | Comando | Ejemplo / Nota |
|--------|----------|----------------|
| Crear archivo vacío | `touch archivo.txt` | crea el archivo si no existe |
| Crear archivo con contenido | `echo "texto" > archivo.txt` | sobrescribe contenido |
| Agregar texto a un archivo | `echo "nuevo texto" >> archivo.txt` | añade al final |
| Ver contenido de archivo | `cat archivo.txt` | muestra el contenido completo |
| Ver con paginación | `less archivo.txt` o `more archivo.txt` | útil para archivos largos |
| Ver primeras líneas | `head archivo.txt` | las primeras 10 líneas por defecto |
| Ver últimas líneas | `tail archivo.txt` | últimas 10 líneas por defecto |
| Copiar archivo | `cp origen destino` | `cp archivo.txt /home/usuario/` |
| Mover o renombrar archivo | `mv origen destino` | `mv archivo.txt nuevo.txt` |
| Eliminar archivo | `rm archivo.txt` | borra el archivo indicado |

---

## 🔍 **Búsqueda y exploración**
| Acción | Comando | Ejemplo / Nota |
|--------|----------|----------------|
| Buscar archivo por nombre | `find /ruta -name "archivo.txt"` | búsqueda recursiva |
| Buscar texto dentro de archivos | `grep "texto" archivo.txt` | busca dentro del archivo |
| Buscar texto recursivamente | `grep -r "texto" /ruta/` | busca en todos los archivos |
| Mostrar archivos recientes | `ls -lt` | ordena por fecha de modificación |

---

## ⚙️ **Permisos y propiedades**
| Acción | Comando | Ejemplo / Nota |
|--------|----------|----------------|
| Ver permisos | `ls -l` | muestra permisos (rwx) |
| Cambiar permisos | `chmod 755 archivo.sh` | rwx para propietario, rx para otros |
| Cambiar propietario | `chown usuario:grupo archivo` | requiere permisos root |
| Hacer ejecutable | `chmod +x script.sh` | útil para scripts |

---

## 🧰 **Comandos útiles adicionales**
| Acción | Comando | Ejemplo / Nota |
|--------|----------|----------------|
| Limpiar la terminal | `clear` | limpia la pantalla |
| Mostrar historial de comandos | `history` | lista comandos ejecutados |
| Cancelar ejecución actual | `Ctrl + C` | interrumpe el proceso actual |
| Autocompletar ruta o comando | `Tab` | muy útil para navegar |
| Subir comandos previos | `↑ / ↓` | recorre el historial |
| Mostrar fecha y hora | `date` | |
| Mostrar usuario actual | `whoami` | |
| Mostrar información del sistema | `uname -a` | kernel y arquitectura |

---

## 💾 **Compresión y descompresión**
| Acción | Comando | Ejemplo / Nota |
|--------|----------|----------------|
| Comprimir carpeta | `tar -czvf archivo.tar.gz carpeta/` | crea un archivo comprimido |
| Descomprimir archivo `.tar.gz` | `tar -xzvf archivo.tar.gz` | extrae en la carpeta actual |
| Comprimir ZIP | `zip -r archivo.zip carpeta/` | |
| Descomprimir ZIP | `unzip archivo.zip` | |

---

## 🧑‍💻 **Ejemplo rápido de flujo de trabajo**
```bash
# Crear un proyecto
mkdir mi_proyecto
cd mi_proyecto

# Crear archivos
touch index.html style.css script.js

# Ver lo que hay dentro
ls -lh

# Editar contenido rápido
echo "<h1>Hola Linux</h1>" > index.html

# Ver contenido
cat index.html

# Comprimir el proyecto
tar -czvf mi_proyecto.tar.gz .
```

---
