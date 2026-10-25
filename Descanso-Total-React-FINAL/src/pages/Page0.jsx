
import React, { useEffect } from "react";

export default function Page0() {
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

  function enviarMensaje(e) {
    e.preventDefault();

    const formulario = e.currentTarget;

    if (!formulario.reportValidity()) {
      return;
    }

    alert("Tu mensaje fue registrado correctamente.");
    formulario.reset();
  }

  return (
    <>
      <main className="container my-5">
        <h1>Contáctanos</h1>

        <p>
          ¿Tienes alguna consulta sobre tu estadía o nuestros servicios?
          Envíanos un mensaje y estaremos encantados de ayudarte.
        </p>

        <section className="mt-5">
          <h2>Información de contacto</h2>

          <p>
            <i className="bi bi-geo-alt-fill"></i>{" "}
            <strong>Ubicación:</strong> Viña del Mar, Chile
          </p>

          <p>
            <i className="bi bi-telephone-fill"></i>{" "}
            <strong>Teléfono:</strong> +56 9 1234 5678
          </p>

          <p>
            <i className="bi bi-envelope-fill"></i>{" "}
            <strong>Correo:</strong> contacto@descansototal.cl
          </p>
        </section>

        <section className="mt-5">
          <h2>Envíanos un mensaje</h2>

          <form
            id="contactoForm"
            className="row g-3"
            onSubmit={enviarMensaje}
          >
            <div className="col-md-6">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="asunto" className="form-label">
                Asunto
              </label>
              <input
                type="text"
                className="form-control"
                id="asunto"
                placeholder="¿En qué podemos ayudarte?"
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="mensaje" className="form-label">
                Mensaje
              </label>
              <textarea
                className="form-control"
                id="mensaje"
                rows="5"
                placeholder="Escribe tu mensaje"
                required
              ></textarea>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-send-fill"></i>{" "}
                Enviar mensaje
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="text-center py-4 mt-5 border-top">
        <p className="mb-0">
          © 2026 Hotel Descanso Total · Viña del Mar, Chile
        </p>
      </footer>
    </>
  );
}
