import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { StudentContext, type Student } from "./studentCore";

// Datos iniciales (simulando API)
const INITIAL_STUDENTS: Student[] = [
  { id: 1001, name: "Alvaro Maravi", course: "JavaScript Avanzado" },
  { id: 1002, name: "Ana Torres", course: "React con TS" },
];

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);

  // Al montar, intentar leer desde localStorage; si no existe, cargar los iniciales
  useEffect(() => {
    try {
      const raw = localStorage.getItem("students");
      console.debug("StudentProvider: localStorage raw=", raw);
      if (raw) {
        const parsed: Student[] = JSON.parse(raw);
        console.debug(
          "StudentProvider: loaded students from localStorage",
          parsed
        );
        setStudents(parsed);
        return;
      }
    } catch (err) {
      console.error("Error parsing students from localStorage", err);
    }

    const timer = setTimeout(() => {
      setStudents(INITIAL_STUDENTS);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Persistencia: guardar cada vez que cambie la lista
  useEffect(() => {
    try {
      localStorage.setItem("students", JSON.stringify(students));
      console.debug("StudentProvider: saved students, count=", students.length);
    } catch (err) {
      console.error("Error saving students to localStorage", err);
    }
  }, [students]);

  const addStudent = (name: string, course: string) => {
    const newStudent: Student = { id: Date.now(), name, course };
    // Actualizamos el estado y guardamos inmediatamente en localStorage
    setStudents((prev) => {
      const next = [...prev, newStudent];
      try {
        localStorage.setItem("students", JSON.stringify(next));
        console.debug(
          "StudentProvider: addStudent saved immediately, nextCount=",
          next.length
        );
      } catch (err) {
        console.error("Error saving students synchronously", err);
      }
      console.debug(
        "StudentProvider: addStudent ->",
        newStudent,
        "nextCount=",
        next.length
      );
      return next;
    });
  };

  return (
    <StudentContext.Provider value={{ students, addStudent }}>
      {children}
    </StudentContext.Provider>
  );
}
