// ** CONFIGURACIÓN CLAVE: REEMPLAZA ESTA URL CON TU API DE SHEETDB **
const FORM_URL = 'https://sheetdb.io/api/v1/txamjw05ii0f9'; 
// Elementos del DOM
const terminalContainer = document.querySelector('.terminal-container'); 
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
const logoEntrada = document.getElementById('logo-entrada'); 

// --- Configuración de Apagado/Reconexión (Funciones Omitidas por Brevedad) ---
let intervaloCronometro;
let tiempoRestanteActual = 0; 

function initiateShutdown(message, showReconnectButton = true) {
    // ... (Mantén tu código de initiateShutdown aquí) ...
}

function iniciarCronometro(segundosIniciales = 120) {
    // ... (Mantén tu código de iniciarCronometro y actualizarCronometro aquí) ...
}

// --- SECUENCIA DE CARGA ---

const secuencia = [
    { title: "BIENVENIDO AL PORTAL DE EXPLORACIONES OBR", text: "" },
    { text: "Conectado..." },
    { text: "Revisando el nivel fantasmal..." },
    { text: "Purificando el ambiente..." },
    { text: "Conectado. Acceso concedido." }
];

/**
 * Fase 3: Inicia la animación del logo y luego la espiral para revelar el formulario.
 */
function iniciarAnimacionFinal() {
    // 1. Ocultar textos de carga
    tituloCarga.style.opacity = 0;
    simulacionCarga.style.display = 'none';
    
    // 2. Mostrar y animar el logo (duración de la animación CSS: 3s)
    logoEntrada.style.display = 'block';
    logoEntrada.classList.add('logo-animating'); 
    
    // 3. Esperar a que la animación del logo termine (3000ms)
    setTimeout(() => {
        // 4. Iniciar la animación de espiral (duración CSS: 3s)
        pantallaCarga.classList.add('portal-animation-start'); 
        
        // 5. Esperar a que la espiral termine (3500ms para seguridad)
        setTimeout(() => {
            // Oculta la capa de carga y MUESTRA el formulario
            pantallaCarga.style.display = 'none';
            contenedorFormulario.style.display = 'block'; // Activa la visibilidad por CSS
            iniciarCronometro(120); 
        }, 3500); 
    }, 3000); 
}

/**
 * Fase 2: Muestra los mensajes de validación.
 */
function mostrarMensaje(index) {
    if (index >= secuencia.length) {
        // Al terminar la secuencia de texto, pasa a la fase del Logo/Espiral
        iniciarAnimacionFinal();
        return;
    }

    const paso = secuencia[index];
    const delay = (index === 0) ? 0 : 2500; 

    setTimeout(() => {
        simulacionCarga.classList.remove('show-text');
        
        setTimeout(() => {
            if (paso.title) {
                tituloCarga.textContent = paso.title;
                tituloCarga.style.opacity = 1;
                simulacionCarga.style.display = 'none';
            }
            
            if (paso.text !== "") {
                tituloCarga.style.opacity = 0; 
                simulacionCarga.style.display = 'block';
                cargaTexto.textContent = paso.text;
                simulacionCarga.classList.add('show-text');
            } else {
                 simulacionCarga.classList.remove('show-text');
            }

            mostrarMensaje(index + 1);
        }, 500);
        
    }, delay);
}

// --- Funciones del Cronómetro y Envío (Omitidas por Brevedad) ---

// Inicia el flujo al cargar la ventana
window.onload = () => {
    // Esconde el formulario y el logo al inicio (El CSS lo hace invisible, el JS lo esconde)
    contenedorFormulario.style.display = 'none'; 
    if (logoEntrada) logoEntrada.style.display = 'none'; 
    
    mostrarMensaje(0);
};
