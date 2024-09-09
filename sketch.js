// Variables globales
let fondo1, fondo2, fondo3, fondo4, fondo5, Instruccion, puesto;
let font;
let onPantallaDeInicio = true;
let onSegundaPantalla = false;
let onTerceraPantalla = false;
let onInstru = false;

let BotonX = 310, BotonY = 215, BotonW = 180, BotonH = 40;
let BottX = 310, BottY = 250, BottW = 180, BottH = 40;

let InicioTiempo = false;
let MedidaTiempo = false;
let ApagarLuz = false;
let TiempoDeReaccionON;
let TiempoDeReaccion;

let ConteoLuz = 5;
let LaLuz = 0;
let lightDelay = 1000; 
let InicioLuz;

let centerX, centerY;
let cubeSize = 50;
let numCubes = 6;
let cubeX = [];
let cubeY = [];
let isRed = [];
let redCubeIndex = -1;
let timeStarted = false;
let timeStopped = false;
let startTime;
let elapsedTime = 0;
let displayTime = 5000;
let scores = [];
let redCubeShown = false;

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
  createCanvas(1500, 600);
  centerX = width/2 ;
  centerY = height;
  initializeCubes();
  startTime = millis();
  timeStarted = true;
  textFont(font);
}

function draw() {
  if (onInstru) {
    drawInstru();
  } else if (onPantallaDeInicio) {
    drawPantallaDeInicio();
  } else if (onSegundaPantalla) {
    drawSegundaPantalla();
    if (MedidaTiempo) {
      drawPopup1();
    }
  } else if (onTerceraPantalla) {
    drawTerceraPantalla();
  }
}

function drawPantallaDeInicio() {
  image(fondo1, 0, 0, width, height);
  textAlign(CENTER, CENTER);
  textSize(25);
  text("Bienvenida/o a la prueba preliminar para novatos", width / 2, 155);
  
  fill(237, 116, 4); // usa RGB
  rect(BotonX, BotonY, BotonW, BotonH, 30);
  fill(255);
  textSize(16);
  text("Iniciar la Prueba", BotonX + BotonW / 2, BotonY + BotonH / 2);
  
  fill(237, 116, 4); // usa RGB
  rect(BotonX, 277, BotonW, 40, 30);
  fill(255);
  textSize(16);
  text("Instrucciones", 310, 288);
}

function drawInstru() {
  background(255);
  image(Instruccion, 0, 0, width, height);
  fill(255, 0, 0, 150);
  rect(BotonX, 300, BotonW, 40, 30);
}

function drawSegundaPantalla() {
  image(fondo2, 0, 0, width, height);
  fill(237, 116, 4); // usa RGB
  rect(BottX, BottY, BottW, BottH, 30);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Iniciar/Pausar", BottX + BottW / 2, BottY + BottH / 2);
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
  if (MedidaTiempo) {
    image(fondo3, 0, 0, width, height);
    fill(21, 71, 68, 76);
    rect(100, 200, 600, 200);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Tiempo de reaccion: " + nf(TiempoDeReaccion / 1000.0, 0, 2) + " s", width / 2, 250);
    
    fill(237, 116, 4); // usa RGB
    rect(300, 320, 190, 50, 30);
    fill(255);
    textSize(16);
    text("Siguiente Prueba", 300 + 95, 320 + 25);
  }
}

function drawTerceraPantalla() {
  image(fondo4, 0, 0, width, height);
  for (let i = 0; i < numCubes; i++) {
    fill(isRed[i] ? 255 : 0);
    rect(cubeX[i], cubeY[i], cubeSize, cubeSize);
  }
  if (timeStarted && !timeStopped) {
    elapsedTime = millis() - startTime;
    if (elapsedTime >= displayTime && !redCubeShown) {
      showRedCube();
      redCubeShown = true;
    }
  }
}

function mousePressed() {
  if (onPantallaDeInicio) {
    if (mouseX > BotonX && mouseX < BotonX + BotonW && mouseY > BotonY && mouseY < BotonY + BotonH) {
      onPantallaDeInicio = false;
      onSegundaPantalla = true;
      LaLuz = 0;
      InicioLuz = millis();
    }
    if (mouseX > BotonX && mouseX < BotonX + BotonW && mouseY > 277 && mouseY < 317) {
      onPantallaDeInicio = false;
      onInstru = true;
    }
  } else if (onInstru) {
    if (mouseX > BotonX && mouseX < BotonX + BotonW && mouseY > 300 && mouseY < 340) {
      onInstru = false;
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
        }
      }
    }
  } else if (onTerceraPantalla) {
    if (redCubeShown && redCubeIndex != -1 && mouseX > cubeX[redCubeIndex] && mouseX < cubeX[redCubeIndex] + cubeSize && mouseY > cubeY[redCubeIndex] && mouseY < cubeY[redCubeIndex] + cubeSize) {
      elapsedTime = millis() - startTime;
      timeStopped = true;
      onTerceraPantalla = false;
      scores.push(elapsedTime);
    }
  }
}

function initializeCubes() {
  for (let i = 0; i < numCubes; i++) {
    let angle = random(TWO_PI);
    let radius = random(230);
    cubeX[i] = centerX + cos(angle) * radius - cubeSize / 2;
    cubeY[i] = centerY + sin(angle) * radius - cubeSize / 2;
    isRed[i] = false;
  }
  redCubeIndex = floor(random(numCubes));
  isRed[redCubeIndex] = true;
}

function showRedCube() {
  redCubeShown = true;
}

function mouseMoved() {
  if (onTerceraPantalla && redCubeShown) {
    for (let i = 0; i < numCubes; i++) {
      if (isRed[i] && mouseX > cubeX[i] && mouseX < cubeX[i] + cubeSize && mouseY > cubeY[i] && mouseY < cubeY[i] + cubeSize) {
        fill(0, 255, 0);
        rect(cubeX[i], cubeY[i], cubeSize, cubeSize);
      } else {
        fill(isRed[i] ? 255 : 0);
        rect(cubeX[i], cubeY[i], cubeSize, cubeSize);
      }
    }
  }
}
