
import React, { useEffect } from "react";

export default function Page2() {
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
      <main className="container my-5">
        <h1>Sobre nosotros</h1>

        <p>
          En Hotel Descanso Total queremos ofrecer una experiencia
          cómoda, tranquila y cercana al mar en Viña del Mar.
        </p>

        <h2 className="mt-5">Nuestro hotel</h2>

        <p>
          Descanso Total es un hotel cuatro estrellas que ofrece
          alojamiento y servicios pensados para brindar comodidad
          y una experiencia agradable a nuestros huéspedes.
        </p>

        <h2 className="mt-5">Nuestra misión</h2>

        <p>
          Entregar una experiencia de alojamiento cómoda y confiable,
          acompañada de una atención cercana y servicios de calidad.
        </p>
      </main>

      <footer className="text-center">
        <p>
          © 2026 Hotel Descanso Total · Viña del Mar, Chile
        </p>
      </footer>
    </>
  );
}
