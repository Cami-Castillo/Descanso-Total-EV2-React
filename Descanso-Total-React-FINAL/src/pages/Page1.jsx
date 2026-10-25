
import React, { useEffect } from "react";

export default function Page1() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/LandingPage-estilos.css";
    link.setAttribute("data-page-style", "");
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, []);

  return (
    <>
      <main>
        <section className="hero">
          <img
            src="https://i.pinimg.com/originals/c0/05/3e/c0053eaa4975369a2e93e900e1d76e70.jpg"
            alt="Vista principal del Hotel Descanso Total"
          />

          <div className="hero-texto">
            <h1>Tu descanso comienza frente al mar</h1>

            <p>
              Disfruta de una estadía inolvidable en Viña del Mar
            </p>

            <a
              href="/rf01-disponibilidad"
              className="btn btn-primary"
            >
              Buscar habitación
            </a>
          </div>
        </section>
      </main>

      <footer className="text-center">
        <p>
          © 2026 Hotel Descanso Total · Viña del Mar, Chile
        </p>
      </footer>
    </>
  );
}
