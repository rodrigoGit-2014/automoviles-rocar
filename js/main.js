(function () {
  "use strict";

  /* ---------------------------------------------------------------
     Datos de contacto.
     TODO: reemplazar por los reales antes de difundir el sitio.
     El número de WhatsApp va sin +, sin espacios y con código de
     país (56 = Chile).
     --------------------------------------------------------------- */
  const CONTACTO = {
    whatsapp: "56900000000",
    telefono: "+56 9 0000 0000",
  };

  const wa = (texto) =>
    "https://wa.me/" + CONTACTO.whatsapp + "?text=" + encodeURIComponent(texto);

  const $ = (sel) => document.querySelector(sel);

  /* ------------------------------------------------ datos de contacto -- */
  $("#fono").textContent = CONTACTO.telefono;
  $("#fono-foot").textContent = CONTACTO.telefono;
  $("#llamar").href = "tel:+" + CONTACTO.whatsapp;
  $("#anio").textContent = new Date().getFullYear();

  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = wa("Hola ROCAR, quisiera más información.");
  });

  /* --------------------------------------------------- barra superior -- */
  const topbar = $("#topbar");
  const nav = $("#nav");
  const burger = $("#burger");

  const syncBar = () => topbar.classList.toggle("is-solid", window.scrollY > 40);
  syncBar();
  addEventListener("scroll", syncBar, { passive: true });

  burger.addEventListener("click", () => {
    const abierto = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(abierto));
    burger.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    if (abierto) topbar.classList.add("is-solid");
    else syncBar();
  });

  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    })
  );

  /* ------------------------------------------------------------ vitrina */
  const TIPO = {
    sedan: "Sedán",
    suv: "SUV",
    camioneta: "Camioneta",
    hatchback: "Hatchback",
  };

  /* Siluetas de reemplazo mientras no haya foto del vehículo.
     Van muy tenues: señalan el tipo sin fingir que son una foto. */
  const SILUETA = {
    sedan: `<path d="M8 58v-7c0-4 3-8 7-9l31-6 19-14c5-4 10-6 16-6h33c6 0 12 3 16 7l14 13 29 6c5 1 9 5 9 10v6z"/>`,
    suv: `<path d="M8 58v-9c0-5 3-9 8-10l10-16c3-5 9-8 15-8h47c6 0 12 3 15 8l10 16 30 6c5 1 9 5 9 10v3z"/>`,
    camioneta: `<path d="M6 58V34h56c5 0 10 2 13 6l10 12h13V20h29c6 0 11 3 14 8l11 17v13z"/>`,
    hatchback: `<path d="M8 58v-7c0-4 3-8 7-9l30-6 18-14c5-4 10-6 16-6h30c5 0 10 2 13 6l20 22 26 5c5 1 8 5 8 9z"/>`,
  };

  const marco = (tipo) => `
    <svg viewBox="0 0 200 76" fill="currentColor" aria-hidden="true">
      ${SILUETA[tipo] || SILUETA.sedan}
      <circle cx="54" cy="59" r="12"/><circle cx="150" cy="59" r="12"/>
    </svg>`;

  const flecha = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6"/></svg>`;

  const pesos = new Intl.NumberFormat("es-CL", {
    style: "currency", currency: "CLP", maximumFractionDigits: 0,
  });
  const miles = new Intl.NumberFormat("es-CL");

  function tarjeta(v) {
    const consulta =
      `Hola ROCAR, me interesa el ${v.marca} ${v.modelo} ${v.anio} ` +
      `que vi en el sitio. ¿Sigue disponible?`;

    const media = v.foto
      ? `<img src="${v.foto}" alt="${v.marca} ${v.modelo} ${v.anio}" loading="lazy">`
      : marco(v.categoria);

    return `
      <article class="card">
        <div class="card-media">
          ${v.destacado ? '<span class="tag">Destacado</span>' : ""}
          ${media}
        </div>
        <div class="card-body">
          <p class="card-kind">${TIPO[v.categoria] || ""}</p>
          <h3 class="card-name">${v.marca} ${v.modelo} <span>${v.anio}</span></h3>
          <p class="specs">
            <span>${miles.format(v.km)} km</span>
            <span>${v.transmision}</span>
            <span>${v.combustible}</span>
          </p>
          <p class="price">${pesos.format(v.precio)}</p>
          <a class="card-cta" href="${wa(consulta)}" target="_blank" rel="noopener">
            Consultar por WhatsApp ${flecha}
          </a>
        </div>
      </article>`;
  }

  const grid = $("#grid");
  const vacio = $("#empty");
  const filtros = $("#filters");

  function pintar(filtro) {
    const lista =
      filtro === "todos" ? VEHICULOS : VEHICULOS.filter((v) => v.categoria === filtro);
    grid.innerHTML = lista.map(tarjeta).join("");
    vacio.hidden = lista.length > 0;
  }

  filtros.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    filtros.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-on"));
    chip.classList.add("is-on");
    pintar(chip.dataset.filter);
  });

  pintar("todos");

  /* ---------------------------------------------- consulta -> WhatsApp -- */
  $("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = $("#f-nombre").value.trim();
    const mensaje = $("#f-msg").value.trim();
    window.open(wa(`Hola ROCAR, soy ${nombre}. ${mensaje}`), "_blank", "noopener");
  });
})();
