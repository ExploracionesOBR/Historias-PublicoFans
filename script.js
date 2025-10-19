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
const mensajeEstado = document.getElementById('mensaje-estado'); 

// --- NUEVO ELEMENTO: Contenedor para mensajes a pantalla completa (Asegura su existencia) ---
let fullScreenMessageContainer = document.getElementById('full-screen-overlay');
if (!fullScreenMessageContainer) {
    fullScreenMessageContainer = document.createElement('div');
    fullScreenMessageContainer.id = 'full-screen-overlay';
    fullScreenMessageContainer.style.display = 'none'; 
    document.body.appendChild(fullScreenMessageContainer);
}

// Variables del Cronómetro
let intervaloCronometro;
let tiempoRestanteActual = 0; 

// --- FUNCIONES DE APAGADO/RECONEXIÓN ---

function initiateShutdown(message, showReconnectButton = true) {
    if (intervaloCronometro) clearInterval(intervaloCronometro);
    
    if (contenedorFormulario) contenedorFormulario.style.display = 'none';
    
    if (terminalContainer) terminalContainer.classList.add('screen-shutdown-effect');
    
    setTimeout(() => {
        fullScreenMessageContainer.innerHTML = `<p>${message}</p>`;
        
        if (showReconnectButton) {
            const reconnectBtn = document.createElement('button');
            reconnectBtn.id = 'reconnect-btn';
            reconnectBtn.textContent = 'RECONECTAR AL PORTAL';
            reconnectBtn.onclick = () => window.location.reload();
            fullScreenMessageContainer.appendChild(reconnectBtn);
        }
        
        fullScreenMessageContainer.classList.add('full-screen-message');
        fullScreenMessageContainer.style.display = 'flex';
        
        if (terminalContainer) terminalContainer.style.display = 'none';

    }, 600); 
}

// --- B. CRONÓMETRO Y FUNCIÓN DE ELIMINACIÓN ---

function actualizarCronometro() {
    if (tiempoRestanteActual <= 0) {
        clearInterval(intervaloCronometro);
        if (displayCronometro) {
            displayCronometro.textContent = "¡ERROR 404! LAS ENTIDADES RECLAMARON TU TESTIMONIO.";
            displayCronometro.classList.add('timer-expired');
        }
        
        if (areaTexto) areaTexto.value = "";
        if (inputNombre) inputNombre.value = "";
        if (guardarBtn) guardarBtn.disabled = true;
        
        initiateShutdown("El portal se cerró. Tu testimonio no fue guardado a tiempo y fue reclamado por los espectros.");
        return; 
    }

    if (tiempoRestanteActual <= 10 && displayCronometro) {
        displayCronometro.classList.add('timer-expired'); 
    }

    if (displayCronometro) {
        const minutos = Math.floor(tiempoRestanteActual / 60);
        const segundos = tiempoRestanteActual % 60;
        displayCronometro.textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    }

    tiempoRestanteActual--;
}

function iniciarCronometro(segundosIniciales = 180) { // 180 SEGUNDOS (3 MINUTOS)
    if (intervaloCronometro) clearInterval(intervaloCronometro);
    
    tiempoRestanteActual = segundosIniciales; 
    
    if (displayCronometro) {
        displayCronometro.classList.remove('timer-expired');
        const minutos = Math.floor(tiempoRestanteActual / 60);
        const segundos = tiempoRestanteActual % 60;
        displayCronometro.textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    }
    
    if (guardarBtn) guardarBtn.disabled = false;

    // Llama a actualizarCronometro inmediatamente para iniciar el conteo
    actualizarCronometro(); 
    intervaloCronometro = setInterval(actualizarCronometro, 1000);
}


// --- A. SIMULACIÓN DE CARGA TEMÁTICA (4 FASES) ---
// FASE 1: Textos de validación (Inicia con Conectado...)
const secuencia = [
    { text: "Conectado..." }, // Paso 1
    { text: "Revisando el nivel fantasmal..." },
    { text: "Purificando el ambiente..." },
    { text: "Conectado. Acceso concedido." } // Paso final de texto
];

/**
 * FASE 4: Inicia la animación de espiral (revelación final).
 */
function iniciarAperturaEspiral() {
    // 1. Ocultar el texto final de conexión
    if (tituloCarga) tituloCarga.style.opacity = 0;
    if (simulacionCarga) simulacionCarga.style.display = 'none';

    // 2. MUESTRA el título grande (BIENVENIDO AL PORTAL...)
    if (tituloCarga) {
        // **CORRECCIÓN CLAVE: INSERCIÓN DE <BR> PARA PANTALLAS MÓVILES**
        tituloCarga.innerHTML = "BIENVENIDO AL PORTAL DE<br>EXPLORACIONES OBR";
        tituloCarga.style.opacity = 1;
        tituloCarga.style.display = 'block'; 
    }

    // 3. Iniciar la animación de espiral (duración CSS: 3s)
    if (pantallaCarga) pantallaCarga.classList.add('portal-animation-start'); 
    
    // 4. Esperar a que la espiral termine (3500ms para seguridad)
    setTimeout(() => {
        // Oculta la capa de carga y MUESTRA el formulario
        if (pantallaCarga) pantallaCarga.style.display = 'none';
        if (contenedorFormulario) contenedorFormulario.style.display = 'block'; 
        iniciarCronometro(180); // Inicia con 3 minutos
    }, 3500); 
}


/**
 * FASE 3: Inicia la animación de zoom del logo.
 */
function iniciarAnimacionLogo() {
    // 1. Ocultar textos de carga
    if (tituloCarga) tituloCarga.style.opacity = 0;
    if (simulacionCarga) simulacionCarga.style.display = 'none';

    // 2. Mostrar y animar el logo (duración de la animación CSS: 3s)
    if (logoEntrada) {
        logoEntrada.style.display = 'block';
        logoEntrada.classList.add('logo-animating'); 
    }
    
    // 3. Esperar a que la animación del logo termine (3000ms)
    setTimeout(() => {
        // 4. Oculta el logo y pasa a mostrar el título y la espiral
        if (logoEntrada) logoEntrada.style.display = 'none'; 
        iniciarAperturaEspiral();
    }, 3000); 
}


/**
 * FASE 2: Muestra los mensajes de validación.
 */
function mostrarMensaje(index) {
    if (index >= secuencia.length) {
        // Al terminar la secuencia de texto, pasa a la fase del Logo
        iniciarAnimacionLogo();
        return;
    }

    const paso = secuencia[index];
    const delay = (index === 0) ? 0 : 2500; 

    setTimeout(() => {
        if (simulacionCarga) simulacionCarga.classList.remove('show-text');
        
        setTimeout(() => {
            // Aseguramos que el titulo principal esté oculto
            if (tituloCarga) tituloCarga.style.opacity = 0; 
            
            if (paso.text !== "" && cargaTexto) {
                if (simulacionCarga) simulacionCarga.style.display = 'block';
                cargaTexto.textContent = paso.text;
                if (simulacionCarga) simulacionCarga.classList.add('show-text');
            } else {
                 if (simulacionCarga) simulacionCarga.classList.remove('show-text');
            }

            mostrarMensaje(index + 1);
        }, 500);
        
    }, delay);
}


// --- C. ENVÍO DE DATOS A SHEETDB ---

if (formulario) {
    formulario.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        // Desactivar UI y mostrar estado
        if (intervaloCronometro) clearInterval(intervaloCronometro);
        if (displayCronometro) displayCronometro.textContent = "ENCRIPTANDO REGISTRO...";
        if (guardarBtn) guardarBtn.disabled = true;
        if (mensajeEstado) mensajeEstado.textContent = "Procesando el envío..."; 

        const formData = new FormData(formulario);
        
        // Estructurar los datos para que coincidan con las columnas de Google Sheets
        const dataToSend = {};

        // Mapeo explícito a las columnas de la tabla (Nombre y Historia)
        dataToSend["Nombre"] = formData.get("data[nombre]");
        dataToSend["Historia"] = formData.get("data[historia]");
        
        const payload = JSON.stringify({ data: dataToSend });
        
        console.log("Intentando enviar datos:", payload); 

        fetch(FORM_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload
        })
        .then(response => {
            if (!response.ok) {
                console.error("Error HTTP al guardar:", response.status, response.statusText);
                throw new Error("Fallo de conexión con el servidor de la base de datos.");
            }
            return response.json();
        })
        .then(data => {
            if (data.created) {
                // ÉXITO
                formulario.reset(); 
                initiateShutdown(
                    "TESTIMONIO GUARDADO CON ÉXITO. Tu historia ha sido transferida y guardada por el equipo de OBR. Gracias por tu contribución.", 
                    false 
                ); 
            } else {
                // ERROR DE API (Ejemplo: campos faltantes o error de formato de SheetDB)
                if (displayCronometro) displayCronometro.textContent = "ERROR DE REGISTRO.";
                console.error('Respuesta de SheetDB fallida:', data);
                initiateShutdown("Fallo al guardar. La base de datos rechazó el testimonio. Revisa el formato o la configuración de SheetDB.");
            }
        })
        .catch(error => {
            // FALLA DE RED O ERROR HTTP
            if (displayCronometro) displayCronometro.textContent = "FALLA EN LA RED CREADA";
            console.error('Error de red o procesamiento:', error);
            
            initiateShutdown("Falla de conexión o de datos. Revisa la URL del API de SheetDB o tu conexión a internet. Intenta de nuevo.");
        });
    });
}


// FASE 1: Inicia el flujo al cargar la ventana
window.onload = () => {
    // Esconde el formulario y el logo al inicio
    if (contenedorFormulario) contenedorFormulario.style.display = 'none'; 
    if (logoEntrada) logoEntrada.style.display = 'none'; 
    
    // Inicia la secuencia de mensajes de carga
    mostrarMensaje(0);
};
