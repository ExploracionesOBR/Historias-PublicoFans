// ** CONFIGURACIÓN CLAVE: REEMPLAZA ESTA URL CON TU API DE SHEETDB **
const FORM_URL = 'https://sheetdb.io/api/v1/txamjw05ii0f9'; 
// Elementos del DOM actualizados
const tituloCarga = document.getElementById('titulo-carga');
const cargaTexto = document.getElementById('carga-texto');
const simulacionCarga = document.getElementById('simulacion-carga');
const pantallaCarga = document.getElementById('pantalla-carga');
const contenedorFormulario = document.getElementById('contenedor-formulario');
const formulario = document.getElementById('formulario-historia');
const displayCronometro = document.getElementById('cronometro-display');
const areaTexto = document.getElementById('historia');
const inputNombre = document.getElementById('nombre');
const guardarBtn = document.getElementById('guardar-btn');

// Variables del Cronómetro (resto de tu código anterior)
let tiempoRestante = 300; 
let intervaloCronometro;

// --- A. SIMULACIÓN DE CARGA TEMÁTICA MODIFICADA ---
const secuencia = [
    { title: "BIENVENIDO AL PORTAL DE EXPLORACIONES OBR", text: "" }, // Título inicial
    { text: "Conectado..." },
    { text: "Revisando el nivel fantasmal..." },
    { text: "Purificando el ambiente..." },
    { text: "Conectado. Acceso concedido." }
];

function mostrarMensaje(index) {
    if (index >= secuencia.length) {
        // Al finalizar la simulación
        setTimeout(() => {
            pantallaCarga.style.display = 'none';
            contenedorFormulario.style.display = 'block';
            iniciarCronometro();
        }, 1000); 
        return;
    }

    const paso = secuencia[index];
    const delay = (index === 0) ? 0 : 2000; // 2 segundos entre mensajes

    setTimeout(() => {
        // 1. Oculta el texto actual (efecto de "desaparece")
        simulacionCarga.classList.remove('show-text');
        
        // Retraso para simular el parpadeo
        setTimeout(() => {
            // 2. Muestra o actualiza el título
            if (paso.title) {
                tituloCarga.textContent = paso.title;
            }
            
            // 3. Muestra el nuevo texto de simulación
            cargaTexto.textContent = paso.text;

            if (paso.text !== "") {
                simulacionCarga.classList.add('show-text');
            } else {
                 simulacionCarga.classList.remove('show-text');
            }

            // 4. Llama al siguiente paso
            mostrarMensaje(index + 1);
        }, 500); // 500ms de pausa entre la desaparición y la aparición
        
    }, delay);
}


// --- RESTO DE TU CÓDIGO (CRONÓMETRO Y SHEETDB) ---

// [¡IMPORTANTE! PEGA AQUÍ LAS FUNCIONES iniciarCronometro(), actualizarCronometro(), y el Event Listener del formulario (todos los bloques de código que siguen)]

// ... (El código de las secciones B y C de la respuesta anterior)

function actualizarCronometro() { /* PEGA AQUÍ TU FUNCIÓN */ }
function iniciarCronometro() { /* PEGA AQUÍ TU FUNCIÓN */ }

formulario.addEventListener('submit', function(e) { /* PEGA AQUÍ TU FUNCIÓN */ });


// Inicia el flujo con la nueva función
window.onload = () => mostrarMensaje(0);
