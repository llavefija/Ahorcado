// Variables globales
let palabraSecreta = '';
let palabraOculta = '';
let intentos = 6;
let letrasFalladas = [];
let juegoTerminado = false;

// Lista de palabras
const palabras = ["javascript", "html", "css", "programacion", "ahorcado"];

// Función para comenzar una nueva partida
function iniciarJuego() {
    // Seleccionamos una palabra aleatoria
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    palabraOculta = '_'.repeat(palabraSecreta.length);
    intentos = 6;
    letrasFalladas = [];
    juegoTerminado = false;

    // Actualizamos la interfaz
    document.getElementById('palabraOculta').textContent = palabraOculta.split('').join(' '); // Espacios entre las letras
    document.getElementById('intentos').textContent = `Intentos restantes: ${intentos}`;
    document.getElementById('letrasFalladas').textContent = 'Letras falladas: -';
    document.getElementById('mensaje').textContent = '';
    document.getElementById('imagenAhorcado').src = 'ahorcado0.png';  // Reiniciamos la imagen

    // Habilitamos el botón de "Probar Letra"
    document.querySelector("button").disabled = false;
}

// Función para procesar el intento del jugador
function probarLetra() {
    if (juegoTerminado) return;

    const letra = document.getElementById("letra").value.toLowerCase();
    if (letra && letra.length === 1 && !letrasFalladas.includes(letra)) {
        if (palabraSecreta.includes(letra)) {
            // Si la letra está en la palabra, la mostramos
            let palabraActualizada = '';
            for (let i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i] === letra) {
                    palabraActualizada += letra;
                } else {
                    palabraActualizada += palabraOculta[i];
                }
            }
            palabraOculta = palabraActualizada;
            document.getElementById('palabraOculta').textContent = palabraOculta.split('').join(' '); // Actualizar con espacios

            // Comprobamos si el jugador ha ganado
            if (palabraOculta === palabraSecreta) {
                document.getElementById('mensaje').textContent = '¡Ganaste!';
                juegoTerminado = true;
            }
        } else {
            // Si la letra no está en la palabra, restamos un intento
            intentos--;
            letrasFalladas.push(letra);
            document.getElementById('letrasFalladas').textContent = 'Letras falladas: ' + letrasFalladas.join(', ');

            // Actualizamos la imagen del ahorcado
            document.getElementById('imagenAhorcado').src = `ahorcado${6 - intentos}.png`;

            // Comprobamos si el jugador ha perdido
            if (intentos === 0) {
                document.getElementById('mensaje').textContent = '¡Perdiste! La palabra era: ' + palabraSecreta;
                juegoTerminado = true;
            }
        }
    }

    // Actualizamos los intentos restantes
    document.getElementById('intentos').textContent = `Intentos restantes: ${intentos}`;

    // Deshabilitamos el botón si el juego ha terminado
    if (juegoTerminado) {
        document.querySelector("button").disabled = true;
    }

    // Limpiamos el campo de texto
    document.getElementById("letra").value = '';
}

// Función para reiniciar el juego
function reiniciarPartida() {
    iniciarJuego();
}

// Llamamos a iniciarJuego al cargar la página
window.onload = iniciarJuego;

// Event listener para la tecla Enter
document.getElementById("letra").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        probarLetra(); // Llamamos a la función de probar letra si se presiona Enter
    }
});
