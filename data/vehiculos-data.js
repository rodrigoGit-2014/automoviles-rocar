/*
  Inventario de vehículos.
  Para actualizar la vitrina, edita este arreglo: agrega, elimina o
  modifica objetos. No es necesario tocar el HTML ni el CSS.

  categoria   "sedan" | "suv" | "camioneta" | "hatchback"
  destacado   true pone la etiqueta roja sobre la foto
  foto        ruta a la foto del vehículo, por ejemplo
              "images/autos/sail-2019.jpg". Si se deja en null se
              muestra una silueta tenue según la categoría.

  Los datos de abajo son de ejemplo: hay que reemplazarlos por el
  inventario real antes de difundir el sitio.
*/
const VEHICULOS = [
  {
    id: "v1",
    marca: "Chevrolet",
    modelo: "Sail",
    anio: 2019,
    km: 45000,
    categoria: "sedan",
    transmision: "Automática",
    combustible: "Bencina",
    precio: 8990000,
    destacado: true,
    foto: null,
  },
  {
    id: "v2",
    marca: "Hyundai",
    modelo: "Accent",
    anio: 2018,
    km: 60500,
    categoria: "sedan",
    transmision: "Manual",
    combustible: "Bencina",
    precio: 7290000,
    destacado: false,
    foto: null,
  },
  {
    id: "v3",
    marca: "Toyota",
    modelo: "RAV4",
    anio: 2017,
    km: 78200,
    categoria: "suv",
    transmision: "Automática",
    combustible: "Bencina",
    precio: 12500000,
    destacado: true,
    foto: null,
  },
  {
    id: "v4",
    marca: "Nissan",
    modelo: "NP300",
    anio: 2020,
    km: 52000,
    categoria: "camioneta",
    transmision: "Manual",
    combustible: "Diésel",
    precio: 14990000,
    destacado: false,
    foto: null,
  },
  {
    id: "v5",
    marca: "Suzuki",
    modelo: "Swift",
    anio: 2019,
    km: 38400,
    categoria: "hatchback",
    transmision: "Manual",
    combustible: "Bencina",
    precio: 6490000,
    destacado: false,
    foto: null,
  },
  {
    id: "v6",
    marca: "Kia",
    modelo: "Sportage",
    anio: 2016,
    km: 90100,
    categoria: "suv",
    transmision: "Automática",
    combustible: "Diésel",
    precio: 9990000,
    destacado: false,
    foto: null,
  },
];
