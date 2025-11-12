import { createContext, useContext } from "react";

export type Student = {
  id: number;
  name: string;
  course: string;
};

type StudentContextType = {
  students: Student[];
  addStudent: (name: string, course: string) => void;
};

// Contexto sin valor por defecto (undefined) para forzar el Provider
export const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudents debe ser usado dentro de un StudentProvider");
  }
  return context;
};
