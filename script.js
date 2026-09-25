// ==========================================
// PITUK DEPORTES
// ==========================================

const numeroWhatsApp = "5493498449902";


// ==========================================
// ELEMENTOS
// ==========================================

const productos =
    document.querySelectorAll(".item-catalogo");

const filtros =
    document.querySelectorAll(".filtro");

const buscador =
    document.getElementById("buscador");

const sinResultados =
    document.getElementById("sin-resultados");

let categoriaActual = "todos";


// ==========================================
// NORMALIZAR TEXTO
// Permite buscar con o sin acentos
// ==========================================

function normalizarTexto(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


// ==========================================
// FILTRAR PRODUCTOS
// ==========================================

function filtrarProductos() {

    const busqueda =
        normalizarTexto(buscador.value.trim());

    let cantidadVisible = 0;


    productos.forEach(producto => {

        const categoria =
            producto.dataset.categoria;

        const nombre =
            normalizarTexto(producto.dataset.nombre);


        const coincideCategoria =
            categoriaActual === "todos" ||
            categoria === categoriaActual;


        const coincideBusqueda =
            nombre.includes(busqueda);


        if (coincideCategoria && coincideBusqueda) {

            producto.style.display = "";

            cantidadVisible++;

        } else {

            producto.style.display = "none";

        }

    });


    if (cantidadVisible === 0) {

        sinResultados.style.display = "block";

    } else {

        sinResultados.style.display = "none";

    }

}


// ==========================================
// BOTONES DE CATEGORÍAS
// ==========================================

filtros.forEach(boton => {

    boton.addEventListener("click", () => {

        filtros.forEach(filtro => {
            filtro.classList.remove("activo");
        });


        boton.classList.add("activo");


        categoriaActual =
            boton.dataset.filtro;


        filtrarProductos();

    });

});


// ==========================================
// BUSCADOR
// ==========================================

buscador.addEventListener(
    "input",
    filtrarProductos
);


// ==========================================
// SELECCIONAR TALLE
// ==========================================

document.querySelectorAll(".talle").forEach(boton => {

    boton.addEventListener("click", () => {

        const producto =
            boton.closest(".item-catalogo");


        producto
            .querySelectorAll(".talle")
            .forEach(talle => {

                talle.classList.remove("seleccionado");

            });


        boton.classList.add("seleccionado");

    });

});


// ==========================================
// SELECCIONAR VARIANTE / COLOR
// + CAMBIAR FOTO
// ==========================================

document
    .querySelectorAll(".color-producto")
    .forEach(boton => {

        boton.addEventListener("click", () => {

            const producto =
                boton.closest(".item-catalogo");


            producto
                .querySelectorAll(".color-producto")
                .forEach(color => {

                    color.classList.remove("seleccionado");

                });


            boton.classList.add("seleccionado");


            const nuevaImagen =
                boton.dataset.imagen;


            const imagen =
                producto.querySelector(".imagen-variante");


            if (imagen && nuevaImagen) {

                imagen.style.opacity = "0";


                setTimeout(() => {

                    imagen.src = nuevaImagen;

                    imagen.style.opacity = "1";

                }, 150);

            }

        });

    });


// ==========================================
// CONSULTAR POR WHATSAPP
// ==========================================

document
    .querySelectorAll(".consultar-producto")
    .forEach(boton => {

        boton.addEventListener("click", () => {

            const producto =
                boton.closest(".item-catalogo");


            const nombre =
                boton.dataset.producto;


            const talleSeleccionado =
                producto.querySelector(
                    ".talle.seleccionado"
                );


            const opcionesColor =
                producto.querySelectorAll(
                    ".color-producto"
                );


            const colorSeleccionado =
                producto.querySelector(
                    ".color-producto.seleccionado"
                );


            // TALLE OBLIGATORIO

            if (!talleSeleccionado) {

                alert(
                    "Elegí un talle antes de consultar."
                );

                return;

            }


            // COLOR / DISEÑO OBLIGATORIO
            // solamente si el producto tiene variantes

            if (
                opcionesColor.length > 0 &&
                !colorSeleccionado
            ) {

                alert(
                    "Elegí un color o diseño antes de consultar."
                );

                return;

            }


            const talle =
                talleSeleccionado.textContent.trim();


            let mensaje =
                `Hola, quería consultar por ${nombre}, talle ${talle}`;


            if (colorSeleccionado) {

                const variante =
                    colorSeleccionado.dataset.color;

                mensaje += `, opción ${variante}`;

            }


            mensaje +=
                ". ¿Está disponible?";


            const enlace =
                `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;


            window.open(
                enlace,
                "_blank"
            );

        });

    });