import { createContext, useContext } from "react";

// 1. Definimos el TIPO de estudiante (antes estaba en App.tsx)
export type Student = {
  id: number;
  name: string;
  course: string;
};

// 2. Definimos la "forma" que tendrá nuestro contexto
type StudentContextType = {
  students: Student[];
  totalStudents: number; // <--- ¡NUEVO! Contador total
  addStudent: (name: string, course: string) => void;
  deleteStudent: (id: number) => void; // <--- ¡AÑADIDO!
};

// 3. Creamos el Contexto
// Proveemos un valor por defecto que coincide con el tipo,
// aunque el valor real vendrá del Provider en App.tsx.
export const StudentContext = createContext<StudentContextType>({
  students: [],
  totalStudents: 0, // <--- ¡NUEVO! Valor inicial
  addStudent: () => {}, // Función vacía por defecto
  deleteStudent: () => {}, // <--- ¡AÑADIDO! (Función vacía por defecto)
});

// 4. (Buena Práctica) Creamos un "Hook personalizado"
// Esto nos ahorra importar useContext y StudentContext en cada componente.
// Además, añade una verificación de error.
export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudents debe ser usado dentro de un StudentProvider");
  }
  return context;
};
