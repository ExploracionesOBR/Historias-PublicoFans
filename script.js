// ** CONFIGURACIÓN CLAVE: REEMPLAZA ESTA URL CON TU API DE SHEETDB **
const FORM_URL = 'https://sheetdb.io/api/v1/txamjw05ii0f9'; 

// Elementos del DOM
const cargaTexto = document.getElementById('carga-texto');
const simulacionCarga = document.getElementById('simulacion-carga');
const contenedorFormulario = document.getElementById('contenedor-formulario');
const formulario = document.getElementById('formulario-historia');
const displayCronometro = document.getElementById('cronometro-display');
const areaTexto = document.getElementById('historia');
const inputNombre = document.getElementById('nombre');
const guardarBtn = document.getElementById('guardar-btn');

// Variables del Cronómetro
let tiempoRestante = 300; // 5 minutos = 300 segundos
let intervaloCronometro;

// --- A. SIMULACIÓN DE CARGA TEMÁTICA ---
const mensajes = [
    "BIENVENIDO AL PORTAL DE EXPLORACIONES OBR...",
    "Conectado a la red espectral...",
    "Revisando el aura fantasmal (Protocolo 404)...",
    "Purificando el ambiente... (Fallo de integridad - RIESGO ALTO)",
    "Conexión forzada. ¡REGISTRA tu encuentro AHORA!"
];

function iniciarSimulacion(index = 0) {
    cargaTexto.textContent = mensajes[index];
    
    if (index < mensajes.length - 1) {
        // Simular retraso y errores visuales
        const delay = (index === 3) ? 3000 : 1500; // Más largo en el "Fallo de integridad"
        
        // Agregar y quitar la clase glitch para simular inestabilidad
        simulacionCarga.classList.add('timer-expired'); // Usa el estilo de error temporal
        setTimeout(() => simulacionCarga.classList.remove('timer-expired'), 200);

        setTimeout(() => iniciarSimulacion(index + 1), delay); 
    } else {
        // Al finalizar la simulación
        setTimeout(() => {
            simulacionCarga.style.display = 'none';
            contenedorFormulario.style.display = 'block';
            iniciarCronometro();
        }, 1000); 
    }
}

// --- B. CRONÓMETRO Y FUNCIÓN DE ELIMINACIÓN ---

function actualizarCronometro() {
    if (tiempoRestante <= 10) {
        displayCronometro.classList.add('timer-expired'); // Color rojo y parpadeo de terror
    }

    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    displayCronometro.textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

    if (tiempoRestante <= 0) {
        clearInterval(intervaloCronometro);
        displayCronometro.textContent = "¡ANULACIÓN! ENTIDAD RECLAMÓ TESTIMONIO";
        displayCronometro.classList.add('timer-expired');
        
        // Elimina el contenido
        areaTexto.value = "";
        inputNombre.value = "";

        // Deshabilita el formulario
        guardarBtn.disabled = true;
        
        // Mensaje de terror
        alert("El portal se cierra bruscamente. Tu testimonio no fue sellado a tiempo y fue borrado de la realidad.");
        
        // Opcional: Recargar la página después de un tiempo
        setTimeout(() => window.location.reload(), 5000); 
    }
    tiempoRestante--;
}

function iniciarCronometro() {
    if (intervaloCronometro) clearInterval(intervaloCronometro);
    tiempoRestante = 300; 
    displayCronometro.classList.remove('timer-expired');
    guardarBtn.disabled = false;
    intervaloCronometro = setInterval(actualizarCronometro, 1000);
}

// --- C. ENVÍO DE DATOS A SHEETDB ---

formulario.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    // 1. Detiene el cronómetro y desactiva el botón
    clearInterval(intervaloCronometro);
    displayCronometro.textContent = "SELLANDO REGISTRO...";
    guardarBtn.disabled = true;
    
    // 2. Prepara los datos para SheetDB
    const formData = new FormData(formulario);
    const dataToSend = {};
    formData.forEach((value, key) => {
        const cleanKey = key.replace('data[', '').replace(']', '');
        dataToSend[cleanKey] = value;
    });

    // 3. Envía a la API de SheetDB
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
            // Éxito
            displayCronometro.textContent = "TESTIMONIO SELLADO CON ÉXITO";
            alert("Tu historia ha sido transferida y sellada en el grimorio digital. Gracias por tu contribución.");
            formulario.reset(); 
            // Deja el cronómetro en estado final
        } else {
            // Error de API o de datos
            displayCronometro.textContent = "ERROR DE REGISTRO. INTENTA DE NUEVO";
            alert("Fallo al guardar. El portal es inestable o la red fantasmal colapsó. Inténtalo de nuevo.");
            guardarBtn.disabled = false;
            iniciarCronometro(); // Reinicia el tiempo para que el usuario pueda reintentar
        }
    })
    .catch(error => {
        displayCronometro.textContent = "FALLA EN LA RED FANTASMAL";
        console.error('Error:', error);
        alert("Falla de conexión. Revisa tu internet o la presencia espectral. Intenta de nuevo.");
        guardarBtn.disabled = false;
        iniciarCronometro(); // Reinicia el tiempo
    });
});

// Inicia el flujo al cargar la ventana
window.onload = iniciarSimulacion;
