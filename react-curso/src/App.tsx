import React from "react";
import Saludo from "./components/Saludo";

export default function App() {
  const alumnos = ["Ana", "Luis", "María"];

  return (
    <div className="container">
      <header className="my-4">
        <h1 className="display-6">Curso: React + TypeScript (Demo)</h1>
        <p className="text-muted">Clase 1 — Componentes, JSX/TSX y Bootstrap</p>
      </header>

      <section className="mb-4">
        <h2>Lista de saludos</h2>
        {alumnos.map((a) => (
          <Saludo key={a} nombre={a} edad={20 + a.length} />
        ))}
      </section>
    </div>
  );
}
