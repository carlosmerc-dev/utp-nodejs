import { promises as fs } from 'fs';

async function procesarArchivo(ruta) {
  try {
    // 1. Verificar stats
    const stats = await fs.stat(ruta);
    console.log('Tamaño (bytes):', stats.size);
    console.log('Es archivo?:', stats.isFile());
    console.log('Fecha de modificación:', stats.mtime);

    // 2. Leer contenido si es archivo
    if (stats.isFile()) {
      const contenido = await fs.readFile(ruta, 'utf8');
      console.log('Contenido:', contenido.substring(0, 100), '...');  // solo primeras 100 letras
    }

    // 3. Crear copia
    const copia = ruta + '.bak';
    await fs.writeFile(copia, await fs.readFile(ruta));
    console.log('Copia creada:', copia);

    // 4. Eliminar copia si existe después de un tiempo
    // await fs.unlink(copia);
    // console.log('Copia borrada:', copia);
  } catch (err) {
    console.error('Error al procesar archivo:', err.message);
  }
}

procesarArchivo('datos.txt');