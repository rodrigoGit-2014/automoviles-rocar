(function () {
  "use strict";

  /* -------------------------------------------------------
     Configuración de contacto
     TODO: reemplazar por los datos reales del negocio.
     Formato del teléfono para WhatsApp: solo números, con
     código de país (56 = Chile), sin +, sin espacios.
     ------------------------------------------------------- */
  const CONFIG = {
    whatsappNumber: "56900000000",
    phoneDisplay: "+56 9 0000 0000",
  };

  const waLink = (text) =>
    "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(text);

  document.getElementById("phoneDisplay").textContent = CONFIG.phoneDisplay;
  document.getElementById("footerPhone").textContent = CONFIG.phoneDisplay;

  const callLink = document.getElementById("callLink");
  if (callLink) callLink.href = "tel:" + CONFIG.whatsappNumber;

  document.querySelectorAll("[data-whatsapp-generic]").forEach((el) => {
    el.href = waLink("Hola ROCAR, quisiera más información.");
  });

  const headerWa = document.getElementById("headerWhatsapp");
  if (headerWa) headerWa.href = waLink("Hola ROCAR, quisiera más información.");

  /* -------------------------------------------------------
     Año en el footer
     ------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* -------------------------------------------------------
     Menú móvil
     ------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* -------------------------------------------------------
     Íconos de vehículo (línea, estilo plano) por categoría
     ------------------------------------------------------- */
  const ICONS = {
    sedan: `<svg viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M6 42c0-4 3-7 7-8l14-14c4-4 9-6 15-6h20c6 0 11 2 15 6l12 12c6 1 11 4 12 8" /><path d="M4 42h112" /><path d="M4 42v4a4 4 0 0 0 4 4h6" /><path d="M106 50h6a4 4 0 0 0 4-4v-4" /><path d="M27 20h58" /><circle cx="30" cy="50" r="8"/><circle cx="90" cy="50" r="8"/></svg>`,
    suv: `<svg viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M8 40c0-5 3-9 8-10l10-16c3-5 9-8 15-8h18c6 0 12 3 15 8l9 15c8 1 13 5 13 11" /><path d="M4 40h112" /><path d="M4 40v4a4 4 0 0 0 4 4h6" /><path d="M106 48h6a4 4 0 0 0 4-4v-4" /><path d="M25 22c4-4 9 -4 9-4" /><path d="M32 12h34" /><path d="M28 26h62" /><circle cx="30" cy="48" r="8"/><circle cx="90" cy="48" r="8"/></svg>`,
    camioneta: `<svg viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M4 44V26h48c5 0 10 2 13 6l9 10" /><path d="M4 44h108" /><path d="M74 44V16h20c5 0 9 2 12 6l6 8v14" /><path d="M4 44v2a4 4 0 0 0 4 4h6" /><path d="M104 50h8a4 4 0 0 0 4-4v-2" /><path d="M52 26v-6h14v6" /><circle cx="26" cy="50" r="8"/><circle cx="92" cy="50" r="8"/></svg>`,
    hatchback: `<svg viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M8 42c0-4 3-7 7-8l12-14c3-4 8-6 13-6h14c5 0 9 2 12 5l14 15c6 1 10 4 11 8" /><path d="M4 42h112" /><path d="M4 42v4a4 4 0 0 0 4 4h6" /><path d="M106 50h6a4 4 0 0 0 4-4v-4" /><path d="M27 20h30" /><circle cx="30" cy="50" r="8"/><circle cx="90" cy="50" r="8"/></svg>`,
  };

  const CATEGORY_LABEL = {
    sedan: "Sedán",
    suv: "SUV",
    camioneta: "Camioneta",
    hatchback: "Hatchback",
  };

  const currency = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

  const km = new Intl.NumberFormat("es-CL");

  /* -------------------------------------------------------
     Render de vitrina de vehículos
     ------------------------------------------------------- */
  const grid = document.getElementById("vehicleGrid");
  const emptyState = document.getElementById("emptyState");
  const filterBar = document.getElementById("filterBar");

  function vehicleCard(v) {
    const message =
      "Hola ROCAR, me interesa el " +
      v.marca + " " + v.modelo + " " + v.anio +
      " que vi en el sitio. ¿Sigue disponible?";

    return `
      <article class="vehicle-card" data-categoria="${v.categoria}">
        <div class="vehicle-media">
          ${v.destacado ? '<span class="badge-destacado">Destacado</span>' : ""}
          ${ICONS[v.categoria] || ICONS.sedan}
        </div>
        <div class="vehicle-body">
          <div>
            <h3 class="vehicle-name">${v.marca} ${v.modelo}</h3>
            <p class="vehicle-year">${v.anio} · ${CATEGORY_LABEL[v.categoria] || ""}</p>
          </div>
          <div class="spec-chips">
            <span class="spec-chip">${km.format(v.km)} km</span>
            <span class="spec-chip">${v.transmision}</span>
            <span class="spec-chip">${v.combustible}</span>
          </div>
          <p class="vehicle-price"><small>Precio</small>${currency.format(v.precio)}</p>
          <a class="vehicle-cta" href="${waLink(message)}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
        </div>
      </article>
    `;
  }

  function renderVehicles(filter) {
    const list = filter === "todos" ? VEHICULOS : VEHICULOS.filter((v) => v.categoria === filter);
    grid.innerHTML = list.map(vehicleCard).join("");
    emptyState.hidden = list.length !== 0;
  }

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-pill");
    if (!btn) return;
    filterBar.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderVehicles(btn.dataset.filter);
  });

  renderVehicles("todos");

  /* -------------------------------------------------------
     Formulario rápido -> WhatsApp
     ------------------------------------------------------- */
  const quickForm = document.getElementById("quickForm");
  quickForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("qfNombre").value.trim();
    const mensaje = document.getElementById("qfMensaje").value.trim();
    const text = "Hola ROCAR, soy " + nombre + ". " + mensaje;
    window.open(waLink(text), "_blank", "noopener");
  });

  /* -------------------------------------------------------
     Revelado suave al hacer scroll.
     Solo en las fotografías de la historia: son fotos reales
     "apareciendo", tiene sentido narrativo. La vitrina y los
     beneficios se muestran de inmediato, sin puesta en escena.
     ------------------------------------------------------- */
  function initReveal() {
    const targets = document.querySelectorAll(".photo-print:not(.reveal-bound)");
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((el) => {
      el.classList.add("reveal", "reveal-bound");
      observer.observe(el);
    });
  }

  initReveal();
})();
