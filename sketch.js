//imagenes
let fondo1;
let fondo2;
let fondo3;
let fondo4;
let fondo5;
let Instruccion;
let puesto;
let font;

// Variables para las pantallas
let onPantallaDeInicio = true;
let onSegundaPantalla = false;
let onTerceraPantalla = false;
let onPopup1 = false;
let onPopupScreen = false;
let onScoreScreen = false;
let onInstru = false;

// Variables para los Botones de la pantalla de inicio
var BotonX = 310;
var BotonY = 215;
var BotonW = 180;
var BotonH = 40;

// Variables para los Botones de la segunda pantalla
var BottX = 310;
var BottY = 250;
var BottW = 180;
var BottH = 40;

// Variables para el boton delPopup
var PopX = 300;
var PopY = 320;
var PopW = 190;
var PopH = 50;

// Variables para el semáforo
let InicioTiempo = false;
let MedidaTiempo = false;
let ApagarLuz = false;
let TiempoDeReaccionON;
let TiempoDeReaccion;

var ConteoLuz = 5;
var LaLuz = 0;
var lightDelay = 1000; // Tiempo en milisegundos para cada luz
var InicioLuz;

// Pop Up
var PopupInicio;
var PopupTiempo = 500; // Tiempo en milisegundos para mostrar el popup (1/2 segundo)
var PopupelapsedTime = 0;

//Cubo por aca cubo por alla --------------------------------------------------------------------------
var centerX, centerY;
var cubeSize = 50;
var numCubes = 6;
let cubeX = new Array(numCubes).fill(0); //let[] cubeX = new let[numCubes];
let cubeY = new Array(numCubes).fill(0); //let[] cubeY = new let[numCubes];
let isRed = new Array(numCubes).fill(0); //let[] isRed = new let[numCubes];
let redCubeX, redCubeY;
let redCubeShown = false;
var redCubeIndex = -1;
let timeStarted = false;
let timeStopped = false;
var startTime;
var elapsedTime = 0;
var displayTime = 5000; // Tiempo en milisegundos para cambiar el cubo a rojo (5 segundos)
var popupDisplayTime = 300; // Tiempo en milisegundos para mostrar el popup (1 segundo)
var popupStartTime;


// Variables globales adicionales
let onReactionScreen = false; // Nueva pantalla para mostrar el tiempo de reacción
let onSecondTrialScreen = false; // Pantalla para iniciar la segunda prueba

// Variables de pantalla final
let showScoreScreen = false;
let scores
//-----------------------------------------------------------------------------------------------------------
function setup() {
  createCanvas(800, 500);
  centerX = width / 2;
  centerY = height / 2;
  initializeCubes();
  startTime = millis();
  timeStarted = true;
  // --- fondos ---
  fondo1 = loadImage("fondito1.jpg");
  fondo2 = loadImage("image1.jpg");
  fondo3 = loadImage("image3.jpg");
  fondo4 = loadImage("image4.jpg");
  fondo5 = loadImage("image5.jpg");
  Instruccion = loadImage("instrucciones.jpg");
  puesto = loadImage("Posicion.jpg");
  font = createFont("Poppins-Bold.ttf", 32);
  textFont(font); // Establece la fuente para el texto

}

function draw() {
  if (onInstru) {
    drawInstru();
  }
  if (onPantallaDeInicio) {
    drawPantallaDeInicio();
  } else if (onSegundaPantalla) {
    drawSegundaPantalla();


    // --- Mostrar el popup ---
    if (MedidaTiempo) {
      drawPopup1();
    } else if (onTerceraPantalla) {
      drawTerceraPantalla();
    }
  }
  if (onTerceraPantalla) {
    drawTerceraPantalla();
  } else if (onPopupScreen) {
    drawPopupScreen();
  } else if (onScoreScreen) {
    drawScoreScreen();
  }
}

function drawPantallaDeInicio() {

  image(fondo1, 0, 0, width, height); // Carga la imagen

  textAlign(CENTER, CENTER);
  textSize(25);
  text("Bienvenida/o a la prueba preliminar para novatos", width / 2, 155);

  // --- Botón de Iniciar la Práctica ---
 fill('#ED7404');
  stroke(0);
  rect(BotonX, BotonY, BotonW, BotonH, 30);
  fill(255);
  textSize(16);
  text("Iniciar la Prueba", BotonX + BotonW / 2, BotonY + BotonH / 2);

  // --- Botón de Instrucciones ---
  fill('#ED7404');
  stroke(0);
  rect(BotonX, 277, BotonW, 40, 30);
  fill(255);
  textSize(16);
  text("Instrucciones", 310, 288, 180, 20);
}
// --- INSTRUCCIONES ---

function drawInstru() {
  background(255);
  image(Instruccion, 0, 0, width, height); // Muestra la imagen a pantalla completa

  // --- BOTON ---
  fill(255, 0, 0, 150); // Color rojo semi-transparente
  rect(BotonX, 300, BotonW, 40, 30);
}


function drawSegundaPantalla() {

  image(fondo2, 0, 0, width, height); // Carga la imagen

  fill('#ED7404');
  stroke(0);
  rect(BottX, BottY, BottW, BottH, 30);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Iniciar/Pausar", BottX + BottW / 2, BottY + BottH / 2);


  // --- Dibuja el semáforo horizontal ---
  drawSemaforo();

  // Actualiza el semáforo
  if (InicioTiempo) {
    if (millis() - InicioLuz >= lightDelay) {
      LaLuz++;
      InicioLuz = millis();
      if (LaLuz >= ConteoLuz) {
        // Cuando todas las luces se apagaron
        ApagarLuz = true;
        TiempoDeReaccionON = millis(); // Comienza el temporizador de reacción
        InicioTiempo = false;
      }
    }
  }
}

// --- Semaforo ---

function drawSemaforo() {
  let LuzW = 50;
  let LuzH = 50;
  let LuzX = width / 2 - LuzW * ConteoLuz / 2 - 10 * (ConteoLuz - 1) / 2;
  let LuzY = 150;
  let EspaciadoL = 10; // Espaciado entre luces

  fill(0);
  rect(LuzX - 30, LuzY - 10, LuzW * ConteoLuz + EspaciadoL * (ConteoLuz - 1) + 20, LuzH + 20); // Caja del semáforo

  for (let i = 0; i < ConteoLuz; i++) {
    if (i < ConteoLuz - LaLuz) {
      fill(255, 0, 0); // Luz encendida
    } else {
      fill(50); // Luz apagada
    }
    ellipse(LuzX + i * (LuzW + EspaciadoL), LuzY + LuzH / 2, LuzW, LuzH);
  }
}

// --- POP Up ---

function drawPopup1() {

  textSize(20);
  if (MedidaTiempo) {
    image(fondo3, 0, 0, width, height); // Carga la imagen
    fill(21, 71, 68, 76);
    stroke(10);
    rect(100, 200, 600, 200);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Tiempo de reaccion: " + nf(TiempoDeReaccion / 1000.0, 0, 2) + " s", width / 2, 250);

    // Dibuja el botón siguiente

 fill('#ED7404');
    textAlign(CENTER, CENTER);
    rect(PopX, PopY, PopW, PopH, 30);
    fill(255);
    textSize(16);
    text("Siguiente Prueba", PopX + PopW / 2, PopY + PopH / 2);
  }
}

// --- Tercera Pantalla ---

function drawTerceraPantalla() {
  image(fondo4, 0, 0, width, height); // Carga la imagen

  // --- cubos ---

  for (let i = 0; i < numCubes; i++) {
    if (isRed[i]) {
      fill(255, 0, 0);
    } else {
      fill(0);
    }
    rect(cubeX[i], cubeY[i], cubeSize, cubeSize);
  }
  // --- tiempo ---

  if (timeStarted && !timeStopped) {
    elapsedTime = millis() - startTime;
    let remainingTime = max(0, (let)(displayTime - elapsedTime));
  }
  if (elapsedTime >= 10000 && !redCubeShown) {
    showRedCube();
    redCubeShown = true;
  }
}
// --- SegundoPopUp ---
function drawPopupScreen() {

  if (millis() - 5000 >= 500) {
    image(fondo5, 0, 0, width, height); // Carga la imagen
    fill(21, 71, 68, 76);
    //rect(100, 200, 600, 300);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(22);
    text("¡La prueba ha finalizado, gracias por participar!", width /2, 150 );
    text("¡Tiempo: " + (elapsedTime / 1000.0) + " segundos!", width / 2, 250);

    // Dibuja el botón "Ir a tabla de puestos"
   fill('#ED7404');
    rect(200, 300, 400, 50, 30);
    fill(255);
    textSize(16);
    text("Hace click para ver la tabla de posiciones", width / 2, 325);
  }
}
function drawScoreScreen() {
  /*background(255);
   fill(0);
   textAlign(CENTER, CENTER);
   textSize(24);
   text("Tabla de Puestos", width / 2, 50);
   
   // Mostrar tiempos en la tabla
   let yOffset = 100;
   for (let i = 0; i < scores.size(); i++) {
   text("Puesto " + (i + 1) + ": " + scores.get(i) / 1000.0 + " s", width / 2, yOffset);
   yOffset += 30;
   }*/
  image(puesto, 0, 0, width, height); // Muestra la imagen
}

// --- Funciones de leteracción con el Usuario ---

function mousePressed() {

  if (onPantallaDeInicio) {
    if (mouseX > 315 && mouseX < 491 && mouseY > 280 && mouseY < 340) {
      // Cambia a la pantalla de imagen
      onPantallaDeInicio = false;
      onTerceraPantalla = false;
      onInstru = true;
    }
  } else if (onInstru) {
 
    if (mouseX > 330 && mouseX < 470 && mouseY > 420 && mouseY < 470) {
      onInstru = false;
      onTerceraPantalla = false;
      onPantallaDeInicio = true;
    }
  }

  if (onPantallaDeInicio) {
    if (mouseX > BotonX && mouseX < BotonX + BotonW && mouseY > BotonY && mouseY < BotonY + BotonH) {
      // Iniciar la práctica
      onPantallaDeInicio = false;
      onTerceraPantalla = false;
      onSegundaPantalla = true;
      LaLuz = 0;
      InicioLuz = millis();
    }
  } else if (onSegundaPantalla) {
    if (mouseX > BottX && mouseX < BottX + BottW && mouseY > BottY && mouseY < BottY + BottH) {
      if (ApagarLuz) {
        // Medir el tiempo de reacción solo si todas las luces se apagaron
        TiempoDeReaccion = millis() - TiempoDeReaccionON;
        MedidaTiempo = true;
        ApagarLuz = false; 
      } else {
        if (!InicioTiempo) {
          // Iniciar el semáforo
          InicioLuz = millis();
          InicioTiempo = true;
          MedidaTiempo = false;
          ApagarLuz = false;
        }
      }
    }
  }
  if (mouseX > PopX && mouseX < PopX + PopW && mouseY > PopY && mouseY < PopY + BotonH) {
    // Cambiar a la tercera pantalla
    onSegundaPantalla = false;
    onPopup1 = false;
    onTerceraPantalla = true;
  }
  if (onTerceraPantalla) {
    if (redCubeShown && redCubeIndex != -1 && mouseX > cubeX[redCubeIndex] && mouseX < cubeX[redCubeIndex] + cubeSize && mouseY > cubeY[redCubeIndex] && mouseY < cubeY[redCubeIndex] + cubeSize) {
      // Cubo rojo clickeado
      elapsedTime = millis() - startTime;
      timeStopped = true;
      popupStartTime = millis();
      onTerceraPantalla = false;
      onPopupScreen = true;
     scores.push(elapsedTime); // scores.add((let)elapsedTime);
    }
  }
  if (onPopupScreen) {
    if (mouseX > 300 && mouseX < 510 && mouseY > 290 && mouseY < 360) {
      
      onTerceraPantalla = false;
      onPopupScreen = true;
    }
  }
  if (onPopupScreen) {
    if (mouseX > 300 && mouseX < 510 && mouseY > 290 && mouseY < 360) {
      
      onPopupScreen = false;
      onScoreScreen = true;
    }
  }
}

function initializeCubes() {
  for (let i = 0; i < numCubes; i++) {
    let angle = random(TWO_PI);
    let radius = random(230);
    cubeX[i] = centerX + cos(angle) * radius - cubeSize / 100;
    cubeY[i] = centerY + sin(angle) * radius - cubeSize / 100;
    isRed[i] = false;
  }
}
function showRedCube() {
  redCubeIndex = Math.floor(random(numCubes)); //redCubeIndex = (let)random(numCubes);
  isRed[redCubeIndex] = true;
}
