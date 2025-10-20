// ** CONFIGURACIÓN CLAVE: REEMPLAZA ESTA URL CON TU API DE SHEETDB **
const FORM_URL = 'https://sheetdb.io/api/v1/txamjw05ii0f9'; 
// Elementos del DOM (index.html)
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

// --- Contenedor para mensajes a pantalla completa (Apagado) ---
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

// --- CRONÓMETRO Y FUNCIÓN DE ELIMINACIÓN ---

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

    actualizarCronometro(); 
    intervaloCronometro = setInterval(actualizarCronometro, 1000);
}


// --- SIMULACIÓN DE CARGA TEMÁTICA ---
const secuencia = [
    { text: "Conectado..." }, 
    { text: "Revisando el nivel fantasmal..." },
    { text: "Purificando el ambiente..." },
    { text: "Conectado. Acceso concedido." } 
];

function iniciarAperturaEspiral() {
    if (tituloCarga) tituloCarga.style.opacity = 0;
    if (simulacionCarga) simulacionCarga.style.display = 'none';

    if (tituloCarga) {
        tituloCarga.innerHTML = "BIENVENIDO AL PORTAL DE<br>EXPLORACIONES OBR";
        tituloCarga.style.opacity = 1;
        tituloCarga.style.display = 'block'; 
    }

    if (pantallaCarga) pantallaCarga.classList.add('portal-animation-start'); 
    
    setTimeout(() => {
        if (pantallaCarga) pantallaCarga.style.display = 'none';
        if (contenedorFormulario) contenedorFormulario.style.display = 'block'; 
        iniciarCronometro(180); 
    }, 3500); 
}

function iniciarAnimacionLogo() {
    if (tituloCarga) tituloCarga.style.opacity = 0;
    if (simulacionCarga) simulacionCarga.style.display = 'none';

    if (logoEntrada) {
        logoEntrada.style.display = 'block';
        logoEntrada.classList.add('logo-animating'); 
    }
    
    setTimeout(() => {
        if (logoEntrada) logoEntrada.style.display = 'none'; 
        iniciarAperturaEspiral();
    }, 3000); 
}

function mostrarMensaje(index) {
    if (index >= secuencia.length) {
        iniciarAnimacionLogo();
        return;
    }

    const paso = secuencia[index];
    const delay = (index === 0) ? 0 : 2500; 

    setTimeout(() => {
        if (simulacionCarga) simulacionCarga.classList.remove('show-text');
        
        setTimeout(() => {
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


// --- ENVÍO DE DATOS A SHEETDB ---

if (formulario) {
    formulario.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        if (intervaloCronometro) clearInterval(intervaloCronometro);
        if (displayCronometro) displayCronometro.textContent = "ENCRIPTANDO REGISTRO...";
        if (guardarBtn) guardarBtn.disabled = true;
        if (mensajeEstado) mensajeEstado.textContent = "Procesando el envío..."; 

        const formData = new FormData(formulario);
        const dataToSend = {};
        
        // Mapeo explícito a las columnas de la tabla (Nombre y Historia)
        dataToSend["Nombre"] = formData.get("data[nombre]"); 
        dataToSend["Historia"] = formData.get("data[historia]");
        
        const payload = JSON.stringify({ data: dataToSend });
        
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
                // ERROR DE API
                if (displayCronometro) displayCronometro.textContent = "ERROR DE REGISTRO.";
                initiateShutdown("Fallo al guardar. La base de datos rechazó el testimonio. Revisa la configuración de SheetDB o los nombres de las columnas ('Nombre' e 'Historia').");
            }
        })
        .catch(error => {
            // FALLA DE RED O ERROR HTTP
            if (displayCronometro) displayCronometro.textContent = "FALLA EN LA RED CREADA";
            initiateShutdown("Falla de conexión o de datos. Revisa que la URL de SheetDB sea correcta y que tu hoja de cálculo tenga las columnas 'Nombre' e 'Historia'. Intenta de nuevo.");
        });
    });
}


// --- LÓGICA ESPECÍFICA PARA LA VISTA DE ADMINISTRADOR ---

const nombresLista = document.getElementById('nombres-lista');
const buscarInput = document.getElementById('buscar-nombre');
const detalleTitulo = document.getElementById('detalle-titulo');
const historiaContenido = document.getElementById('historia-contenido');

let todosLosRegistros = []; 
let currentTypingInterval; // Variable de control de animación (CORRECCIÓN DOBLE CLIC)

/**
 * Función para obtener todos los registros de SheetDB.
 */
function obtenerRegistrosAdmin() {
    if (!nombresLista) return; 

    nombresLista.innerHTML = '<p style="text-align: center;">Accediendo a la base de datos...</p>';

    fetch(FORM_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fallo al obtener los datos. Error HTTP " + response.status);
            }
            return response.json();
        })
        .then(data => {
            todosLosRegistros = data; 
            mostrarListaNombres(todosLosRegistros);
        })
        .catch(error => {
            nombresLista.innerHTML = `<p style="color: var(--error-color); text-align: center;">ERROR DE CONEXIÓN: ${error.message}</p>`;
        });
}

/**
 * Muestra la lista de nombres o los filtra según el texto de búsqueda.
 */
function mostrarListaNombres(registros) {
    if (!nombresLista) return;

    if (registros.length === 0) {
        nombresLista.innerHTML = '<p style="text-align: center; color: var(--error-color);">No hay registros en la base de datos.</p>';
        return;
    }

    const filtro = buscarInput.value.toLowerCase();
    const registrosFiltrados = registros.filter(reg => 
        reg.Nombre && reg.Nombre.toLowerCase().includes(filtro)
    );

    nombresLista.innerHTML = ''; 

    if (registrosFiltrados.length === 0) {
        nombresLista.innerHTML = '<p style="text-align: center;">No se encontraron nombres que coincidan.</p>';
        return;
    }

    registrosFiltrados.forEach(registro => {
        const div = document.createElement('div');
        div.classList.add('nombre-registro');
        div.textContent = `> ${registro.Nombre}`;
        div.onclick = () => seleccionarRegistro(registro, div);
        nombresLista.appendChild(div);
    });
}

/**
 * Muestra el detalle de la Historia seleccionada (con efecto de máquina de escribir).
 */
function seleccionarRegistro(registro, elementoClicado) {
    if (!historiaContenido || !detalleTitulo) return;
    
    // DETENER animación anterior (CORRECCIÓN DOBLE CLIC)
    if (currentTypingInterval) {
        clearTimeout(currentTypingInterval);
    }
    
    // Quitar la clase 'selected' de todos los elementos
    document.querySelectorAll('.nombre-registro').forEach(el => el.classList.remove('selected'));
    
    // Añadir la clase 'selected' al elemento clickeado
    elementoClicado.classList.add('selected');

    // Usar innerHTML para diferenciar color de "TESTIMONIO DE"
    const nombreEnMayusculas = registro.Nombre.toUpperCase();
    const tituloEstatico = `<span style="color: var(--neon-blue);">TESTIMONIO DE </span>`; // Color diferente
    detalleTitulo.innerHTML = `>>> [ ${tituloEstatico}${nombreEnMayusculas} ] <<<`;
    
    // Simulación de escritura (efecto máquina de escribir)
    historiaContenido.textContent = '';
    historiaContenido.style.color = 'var(--text-color)';
    
    const textoCompleto = registro.Historia || "El testimonio fue encriptado o no se registró correctamente.";
    let i = 0;
    
    function typeWriter() {
        if (i < textoCompleto.length) {
            historiaContenido.textContent += textoCompleto.charAt(i);
            i++;
            // ALMACENAR el ID del timeout
            currentTypingInterval = setTimeout(typeWriter, 20); 
        } else {
             // Texto finalizado
             historiaContenido.style.color = 'var(--neon-blue)';
             currentTypingInterval = null; 
        }
    }
    
    // Iniciar la nueva animación
    typeWriter();
}

// 1. Añadir el evento de búsqueda
if (buscarInput) {
    buscarInput.addEventListener('keyup', () => {
        mostrarListaNombres(todosLosRegistros);
    });
}

// FASE 1: Inicia el flujo al cargar la ventana
// Manejador que distingue entre index.html y admin.html
window.onload = () => {
    
    // Lógica para index.html (Portal de Registro)
    if (contenedorFormulario) {
        const logoEntrada = document.getElementById('logo-entrada'); 
        if (contenedorFormulario) contenedorFormulario.style.display = 'none'; 
        if (logoEntrada) logoEntrada.style.display = 'none'; 
        // Inicia la secuencia de mensajes de carga
        mostrarMensaje(0); 
    } 
    
    // Lógica para admin.html (Portal de Control)
    if (nombresLista) {
        obtenerRegistrosAdmin();
    }
};
