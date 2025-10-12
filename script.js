// ** CONFIGURACIÓN CLAVE: REEMPLAZA ESTA URL CON TU API DE SHEETDB **
const FORM_URL = 'https://sheetdb.io/api/v1/txamjw05ii0f9'; 

// Elementos del DOM
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

// --- NUEVO ELEMENTO: Contenedor para mensajes a pantalla completa ---
const fullScreenMessageContainer = document.createElement('div');
fullScreenMessageContainer.id = 'full-screen-overlay';
fullScreenMessageContainer.style.display = 'none'; // Inicialmente oculto
document.body.appendChild(fullScreenMessageContainer);

// Variables del Cronómetro
let intervaloCronometro;
let tiempoRestanteActual = 0; 

// --- FUNCIONES DE APAGADO/RECONEXIÓN ---
function showFullScreenMessage(message, showReconnectButton = true) {
    fullScreenMessageContainer.innerHTML = `<p>${message}</p>`;
    if (showReconnectButton) {
        const reconnectBtn = document.createElement('button');
        reconnectBtn.id = 'reconnect-btn';
        reconnectBtn.textContent = 'RECONECTAR AL PORTAL';
        reconnectBtn.onclick = () => window.location.reload();
        fullScreenMessageContainer.appendChild(reconnectBtn);
    }
    fullScreenMessageContainer.classList.add('full-screen-message');
    fullScreenMessageContainer.style.display = 'flex'; // Usar flex para centrar
    
    // Opcional: Animar la salida del contenido principal
    document.querySelector('.terminal-container').classList.add('screen-shutdown-effect');
}

// --- A. SIMULACIÓN DE CARGA TEMÁTICA ---
const secuencia = [
    { title: "BIENVENIDO AL PORTAL DE EXPLORACIONES OBR", text: "" },
    { text: "Conectado..." },
    { text: "Revisando el nivel fantasmal..." },
    { text: "Purificando el ambiente..." },
    { text: "Conectado. Acceso concedido." }
];

function mostrarMensaje(index) {
    if (index >= secuencia.length) {
        setTimeout(() => {
            pantallaCarga.style.display = 'none';
            contenedorFormulario.style.display = 'block';
            // Inicia el cronómetro directamente en 2 minutos (120 segundos)
            iniciarCronometro(120); 
        }, 1500);
        return;
    }

    const paso = secuencia[index];
    const delay = (index === 0) ? 0 : 2500;

    setTimeout(() => {
        simulacionCarga.classList.remove('show-text');
        
        setTimeout(() => {
            if (paso.title) {
                tituloCarga.textContent = paso.title;
            }
            
            cargaTexto.textContent = paso.text;

            if (paso.text !== "") {
                simulacionCarga.classList.add('show-text');
            } else {
                 simulacionCarga.classList.remove('show-text');
            }

            mostrarMensaje(index + 1);
        }, 500);
        
    }, delay);
}

// --- B. CRONÓMETRO Y FUNCIÓN DE ELIMINACIÓN CORREGIDA ---

function actualizarCronometro() {
    if (tiempoRestanteActual <= 0) {
        clearInterval(intervaloCronometro);
        displayCronometro.textContent = "¡ERROR 404! LAS ENTIDADES RECLAMARON TU TESTIMONIO.";
        displayCronometro.classList.add('timer-expired');
        
        areaTexto.value = "";
        inputNombre.value = "";
        guardarBtn.disabled = true;
        
        // Muestra la pantalla negra en lugar de un alert
        showFullScreenMessage("El portal se cerró. Tu testimonio no fue guardado a tiempo y fue reclamado por los espectros.");
        return; 
    }

    if (tiempoRestanteActual <= 10) {
        displayCronometro.classList.add('timer-expired'); 
    }

    const minutos = Math.floor(tiempoRestanteActual / 60);
    const segundos = tiempoRestanteActual % 60;
    displayCronometro.textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

    tiempoRestanteActual--;
}

function iniciarCronometro(segundosIniciales = 120) {
    if (intervaloCronometro) clearInterval(intervaloCronometro);
    
    tiempoRestanteActual = segundosIniciales; 
    
    displayCronometro.classList.remove('timer-expired');
    guardarBtn.disabled = false;
    
    // Muestra inmediatamente el tiempo correcto (2:00) al iniciar
    const minutos = Math.floor(tiempoRestanteActual / 60);
    const segundos = tiempoRestanteActual % 60;
    displayCronometro.textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

    intervaloCronometro = setInterval(actualizarCronometro, 1000);
}

// --- C. ENVÍO DE DATOS A SHEETDB ---

formulario.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    clearInterval(intervaloCronometro);
    displayCronometro.textContent = "ENCRIPTANDO REGISTRO...";
    guardarBtn.disabled = true;
    
    const formData = new FormData(formulario);
    const dataToSend = {};
    formData.forEach((value, key) => {
        const cleanKey = key.replace('data[', '').replace(']', '');
        dataToSend[cleanKey] = value;
    });

    fetch(FORM_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: dataToSend })
    })
    .then(response => response.json())
    .then(data => {
        if (data.created) {
            displayCronometro.textContent = "TESTIMONIO GUARDADO CON ÉXITO";
            // Éxito: pantalla negra sin botón de reconexión porque se guardó
            showFullScreenMessage("Tu historia ha sido transferida y guardada por el equpo de OBR. Gracias por tu contribución.", false); // No mostrar botón
        } else {
            // Error de API o de datos
            displayCronometro.textContent = "ERROR DE REGISTRO. INTENTA DE NUEVO";
            showFullScreenMessage("Fallo al guardar. El portal es inestable o la protección fantasmal colapsó. Inténtalo de nuevo.");
            // No reinicia el cronómetro, se queda en la pantalla negra
        }
    })
    .catch(error => {
        // Falla de red
        displayCronometro.textContent = "FALLA EN LA RED CREADA";
        console.error('Error:', error);
        showFullScreenMessage("Falla de conexión. Revisa tu internet o la presencia espectral. Intenta de nuevo.");
        // No reinicia el cronómetro, se queda en la pantalla negra
    });
});

// Inicia el flujo al cargar la ventana
window.onload = () => mostrarMensaje(0);
