import { createContext, useContext } from "react";

// 1. Definimos el TIPO de motocicleta
export type Motorcycle = {
  id: number;
  marca: string;
  modelo: string;
  imageUrl?: string; // Campo opcional para la URL de la imagen
};

// 2. Definimos la "forma" que tendrá nuestro contexto
type MotorcycleContextType = {
  motorcycles: Motorcycle[];
  addMotorcycle: (marca: string, modelo: string, imageUrl?: string) => void;
  deleteMotorcycle: (id: number) => void;
};

// 3. Creamos el Contexto
// Proveemos un valor por defecto que coincide con el tipo,
// aunque el valor real vendrá del Provider en App.tsx.
export const MotorcycleContext = createContext<MotorcycleContextType>({
  motorcycles: [],
  addMotorcycle: () => {}, // Función vacía por defecto
  deleteMotorcycle: () => {}, // Función vacía por defecto
});

// 4. (Buena Práctica) Creamos un "Hook personalizado"
// Esto nos ahorra importar useContext y MotorcycleContext en cada componente.
// Además, añade una verificación de error.
export const useMotorcycles = () => {
  const context = useContext(MotorcycleContext);
  if (!context) {
    throw new Error(
      "useMotorcycles debe ser usado dentro de un MotorcycleProvider"
    );
  }
  return context;
};
