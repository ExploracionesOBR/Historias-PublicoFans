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

// Variables del Cronómetro
let tiempoRestante = 120; // REDUCIDO A 2 MINUTOS (120 segundos)
let intervaloCronometro;

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
        // Al finalizar la simulación: oculta la pantalla de carga y muestra el formulario
        setTimeout(() => {
            pantallaCarga.style.display = 'none';
            contenedorFormulario.style.display = 'block';
            iniciarCronometro();
        }, 1500);
        return;
    }

    const paso = secuencia[index];
    const delay = (index === 0) ? 0 : 2500;

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

            // 4. Aplica la clase para hacerlo visible (efecto de "aparece")
            if (paso.text !== "") {
                simulacionCarga.classList.add('show-text');
            } else {
                 simulacionCarga.classList.remove('show-text');
            }

            // 5. Llama al siguiente paso
            mostrarMensaje(index + 1);
        }, 500); // 500ms de pausa
        
    }, delay);
}

// --- B. CRONÓMETRO Y FUNCIÓN DE ELIMINACIÓN ---

function actualizarCronometro() {
    // Si el tiempo restante es 0, detiene el proceso y elimina los datos.
    if (tiempoRestante <= 0) {
        clearInterval(intervaloCronometro);
        displayCronometro.textContent = "¡ANULACIÓN! ENTIDAD RECLAMÓ TESTIMONIO";
        displayCronometro.classList.add('timer-expired');
        
        // Elimina el contenido
        areaTexto.value = "";
        inputNombre.value = "";
        guardarBtn.disabled = true;
        
        alert("El portal se cierro. Tu testimonio no fue guardado a tiempo y fue reclamado por las entidades.");
        
        setTimeout(() => window.location.reload(), 1200); 
        return; // Detiene la función
    }

    // Aplica el estilo de advertencia cuando quedan 10 segundos o menos
    if (tiempoRestante <= 10) {
        displayCronometro.classList.add('timer-expired'); 
    }

    // Formatea el tiempo (MM:SS)
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    displayCronometro.textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

    // Decrementa el tiempo
    tiempoRestante--;
}

function iniciarCronometro() {
    // Re-inicializa y comienza el temporizador
    if (intervaloCronometro) clearInterval(intervaloCronometro);
    tiempoRestante = 120; // 2 minutos
    displayCronometro.classList.remove('timer-expired');
    guardarBtn.disabled = false;
    
    // Inicia la cuenta regresiva cada 1000ms (1 segundo)
    intervaloCronometro = setInterval(actualizarCronometro, 1000);
}

// --- C. ENVÍO DE DATOS A SHEETDB ---

formulario.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    // 1. Detiene el cronómetro y desactiva el botón
    clearInterval(intervaloCronometro);
    displayCronometro.textContent = "Guardado con exito...";
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
            displayCronometro.textContent = "TESTIMONIO CARGADO CON ÉXITO";
            alert("Tu historia ha sido transferida y guardada en el portal digital. Gracias por tu contribución.");
            formulario.reset(); 
        } else {
            // Error de API o de datos (Generalmente por la URL, revisar el paso 1 de la respuesta anterior)
            displayCronometro.textContent = "ERROR DE REGISTRO. INTENTA DE NUEVO";
            alert("Fallo al guardar. El portal es inestable o la red anti fantasmal colapsó. Inténtalo de nuevo.");
            guardarBtn.disabled = false;
            iniciarCronometro(); // Reinicia el tiempo para que el usuario pueda reintentar
        }
    })
    .catch(error => {
        // Falla de red (El servidor no pudo ser contactado)
        displayCronometro.textContent = "FALLA EN LA RED FANTASMAL";
        console.error('Error:', error);
        alert("Falla de conexión. Revisa tu internet y activa la limpieza del lugar nuevamente.");
        guardarBtn.disabled = false;
        iniciarCronometro(); // Reinicia el tiempo
    });
});

// Inicia el flujo al cargar la ventana
window.onload = () => mostrarMensaje(0);
