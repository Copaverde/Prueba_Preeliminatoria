// Variables globales
let fondo1, fondo2, fondo3, fondo4, fondo5, Instruccion, puesto;
let font;
let onPantallaDeInicio = true;
let onSegundaPantalla = false;
let onTerceraPantalla = false;
let onPopup1 = false;
let onPopupScreen = false;
let onScoreScreen = false;
let onInstru = false;

let BotonX = 310, BotonY = 215, BotonW = 180, BotonH = 40;
let BottX = 310, BottY = 250, BottW = 180, BottH = 40;
let IntrX = 310, IntrY = 270, IntrW = 180, IntrH = 40;
let PopX = 300, PopY = 320, PopW = 190, PopH = 50;

let InicioTiempo = false;
let MedidaTiempo = false;
let ApagarLuz = false;
let TiempoDeReaccionON;
let TiempoDeReaccion;

let ConteoLuz = 5;
let LaLuz = 0;
let lightDelay = 1000;
let InicioLuz;
// Pop Up
let PopupInicio;
let PopupTiempo = 500; // Tiempo en milisegundos para mostrar el popup (1/2 segundo)
let PopupelapsedTime = 0;

//Cubo por aca cubo por alla -----------------------------------------------------------------
let centerX, centerY;
let cubeSize = 50;
let numCubes = 6;
let cubeX = [];
let cubeY = [];
let isRed = [];
let redCubeX, redCubeY;
let redCubeIndex = -1;
let timeStarted = false;
let timeStopped = false;
let startTime;
let elapsedTime = 0;
let scores = [];
let redCubeShown = false;
let displayTime = 5000;
let popupDisplayTime = 200;
let popupStartTime;

// Variables globales adicionales
let onReactionScreen = false; // Nueva pantalla para mostrar el tiempo de reacción
let onSecondTrialScreen = false; // Pantalla para iniciar la segunda prueba
let showScoreScreen = false;

function preload() {
    fondo1 = loadImage("fondito1.jpg");
    fondo2 = loadImage("image1.jpg");
    fondo3 = loadImage("image3.jpg");
    fondo4 = loadImage("image4.jpg");
    fondo5 = loadImage("image5.jpg");
    Instruccion = loadImage("instrucciones.jpg");
    puesto = loadImage("Posicion.jpg");
    font = loadFont("Poppins-Bold.ttf");
}

function setup() {
    createCanvas(800, 500);
    centerX = width / 2;
    centerY = height / 2;
    initializeCubes();
    startTime = millis();
    timeStarted = true;
    textFont(font);
}

function draw() {
    if (onInstru) {
        drawInstru();
    } if (onPantallaDeInicio) {
        drawPantallaDeInicio();
    } else if (onSegundaPantalla) {
        drawSegundaPantalla();

        if (MedidaTiempo) {
            drawPopup1();
        } else if (onTerceraPantalla) {
            drawTerceraPantalla();
        }
    } if (onTerceraPantalla) {
        drawTerceraPantalla();
    } else if (onPopupScreen) {
        drawPopupScreen();
    } else if (onScoreScreen) {
        drawScoreScreen();
    }
}

function drawPantallaDeInicio() {

    image(fondo1, 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("Bienvenida/o", width / 2, 100);
    text("a la prueba preliminar de Copa Verde", width / 2, 153);

    // --- Botón de Iniciar la Práctica ---
    fill(237, 116, 4); // usa RGB
    rect(BotonX, BotonY, BotonW, BotonH, 30);
    fill(255);
    textSize(16);
    text("Iniciar la Prueba", BotonX + BotonW / 2, BotonY + BotonH / 2);

    // --- Botón de Instrucciones ---
    fill(237, 116, 4); // usa RGB
    rect(IntrX, IntrY, IntrW, IntrH, 30);
    fill(255);
    textSize(16);
    text("Instrucciones", IntrX + IntrW / 2, IntrY + IntrH / 2);
}

// --- INSTRUCCIONES ---
function drawInstru() {
    background(255);
    image(Instruccion, 0, 0, width, height);


}

function drawSegundaPantalla() {
    image(fondo2, 0, 0, width, height);
    fill(237, 116, 4); // usa RGB
    rect(BottX, BottY, BottW, BottH, 30);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("Iniciar/Pausar", BottX + BottW / 2, BottY + BottH / 2);

    // --- Dibuja el semáforo horizontal ---
    drawSemaforo();

    if (InicioTiempo) {
        if (millis() - InicioLuz >= lightDelay) {
            LaLuz++;
            InicioLuz = millis();
            if (LaLuz >= ConteoLuz) {
                ApagarLuz = true;
                TiempoDeReaccionON = millis();
                InicioTiempo = false;
            }
        }
    }
}

function drawSemaforo() {
    let LuzW = 50;
    let LuzH = 50;
    let LuzX = width / 2 - LuzW * ConteoLuz / 2 - 10 * (ConteoLuz - 1) / 2;
    let LuzY = 150;
    let EspaciadoL = 10;

    fill(0);
    rect(LuzX - 30, LuzY - 10, LuzW * ConteoLuz + EspaciadoL * (ConteoLuz - 1) + 20, LuzH + 20);

    for (let i = 0; i < ConteoLuz; i++) {
        if (i < ConteoLuz - LaLuz) {
            fill(255, 0, 0);
        } else {
            fill(50);
        }
        ellipse(LuzX + i * (LuzW + EspaciadoL), LuzY + LuzH / 2, LuzW, LuzH);
    }
}

function drawPopup1() {

    textSize(20);
    if (MedidaTiempo) {
        image(fondo3, 0, 0, width, height);
        fill(21, 71, 68, 76);
        rect(100, 200, 600, 200);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(24);
        text("Tiempo de reaccion: " + nf(TiempoDeReaccion / 1000.0, 0, 2) + " s", width / 2, 250);

        // Dibuja el botón siguiente
        fill(237, 116, 4);
        rect(PopX, PopY, PopW, PopH, 30);
        fill(255);
        textSize(16);
        // text("Siguiente Prueba", 300 + 95, 320 + 25);
        text("Siguiente Prueba", PopX + PopW / 2, PopY + PopH / 2);
    }
}

function drawTerceraPantalla() {
    image(fondo4, 0, 0, width, height);

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
        let remainingTime = max(0, (int)(displayTime - elapsedTime));
        if (elapsedTime >= 10000 && !redCubeShown) {
            showRedCube();
            redCubeShown = true;
        }
    }
}

function drawPopupScreen() {

    if (millis() - 5000 >= 500) {
        image(fondo5, 0, 0, width, height);
        fill(21, 71, 68, 76);
        //rect(100, 200, 600, 300);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(22);
        text("¡La prueba ha finalizado, gracias por participar!", width / 2, 150);
        text("¡Tiempo: " + (elapsedTime / 1000.0) + " segundos!", width / 2, 250);

        // Dibuja el botón "Ir a tabla de puestos"
        fill(237, 116, 4);
        rect(200, 300, 400, 50, 30);
        fill(255);
        textSize(16);
        text("Hace click para ver la tabla de posiciones", width / 2, 325);
    }
}
function drawScoreScreen() {

    image(puesto, 0, 0, width, height); // Muestra la imagen

}

function mousePressed() {

    if (onPantallaDeInicio) {
        if (mouseX > BotonX && mouseX < BotonX + BotonW && mouseY > BotonY && mouseY < BotonY + BotonH) {
            onPantallaDeInicio = false;
            onTerceraPantalla = false;
            onSegundaPantalla = true;
            //------------
            onPopup1 = false;
            onPopupScreen = false;
            onScoreScreen = false;
            onInstru = false;
            LaLuz = 0;
            InicioLuz = millis();
        }
        if (mouseX > 315 && mouseX < 491 && mouseY > 265 && mouseY < 310) {
            onPantallaDeInicio = false;
            onTerceraPantalla = false;
            onScoreScreen = false;
            onInstru = true;
            //--------------
            onPopup1 = false;
            onPopupScreen = false;
        }
    } else if (onInstru) {
        if (mouseX > 330 && mouseX < 470 && mouseY > 420 && mouseY < 470) {
            onPantallaDeInicio = false;
            onInstru = false;
            onPopup1 = false;
            onPopupScreen = false;
            onTerceraPantalla = false;
            onPantallaDeInicio = true;
        }
    } else if (onSegundaPantalla) {
        if (mouseX > BottX && mouseX < BottX + BottW && mouseY > BottY && mouseY < BottY + BottH) {
            if (ApagarLuz) {
                TiempoDeReaccion = millis() - TiempoDeReaccionON;
                MedidaTiempo = true;
                ApagarLuz = false;

            } else {
                if (!InicioTiempo) {
                    InicioLuz = millis();
                    InicioTiempo = true;
                    MedidaTiempo = false;
                    ApagarLuz = false;
                    onPopup1 = true;
                }
            }
        } if (onPopup1) {
            if (mouseX > 290 && mouseX < 490 + PopW && mouseY > 320 && mouseY < 370 + BotonH) {
                // Cambiar a la tercera pantalla
                onSegundaPantalla = false;
                onPopup1 = false;
                onTerceraPantalla = true;
                //--------------------
                onPantallaDeInicio = false;
                onPopupScreen = false;
                onScoreScreen = false;
                onInstru = false;
            }
        }
    } if (onTerceraPantalla) {
        if (redCubeShown && redCubeIndex != -1 && mouseX > cubeX[redCubeIndex] && mouseX < cubeX[redCubeIndex] + cubeSize && mouseY > cubeY[redCubeIndex] && mouseY < cubeY[redCubeIndex] + cubeSize) {
            elapsedTime = millis() - startTime;
            timeStopped = true;
            popupStartTime = millis();
            onTerceraPantalla = false;
            onPopupScreen = true;
            scores.push(elapsedTime);
        }
    } if (onPopupScreen) {
        if (mouseX > 300 && mouseX < 510 && mouseY > 290 && mouseY < 360) {

            onTerceraPantalla = false;
            onScoreScreen = false;
            onPopupScreen = true;
        }
    }
    if (onPopupScreen) {
        if (mouseX > 300 && mouseX < 510 && mouseY > 290 && mouseY < 360) {
            onTerceraPantalla = false;
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
    redCubeIndex = floor(random(numCubes));
    isRed[redCubeIndex] = true;
}
