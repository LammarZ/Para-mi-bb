const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let semilla = {
  x: canvas.width / 2,
  y: -20,
  radio: 6,
  velocidad: 2,
  llego: false
};

function dibujarSemilla() {
  ctx.beginPath();
  ctx.arc(semilla.x, semilla.y, semilla.radio, 0, Math.PI * 2);
  ctx.fillStyle = "#6b4f2a";
  ctx.fill();
}

function animarSemilla() {
  if (!semilla.llego) {
    semilla.y += semilla.velocidad;

    if (semilla.y >= canvas.height - 120) {
      semilla.llego = true;
    }
  }
}
let troncoAltura = 0;
let troncoMax = 180;

function dibujarTronco() {
  if (semilla.llego && troncoAltura < troncoMax) {
    troncoAltura += 1;
  }

  ctx.beginPath();
  ctx.moveTo(semilla.x, canvas.height - 120);
  ctx.lineTo(semilla.x, canvas.height - 120 - troncoAltura);
  ctx.strokeStyle = "#4a2f1b";
  ctx.lineWidth = 8;
  ctx.stroke();
}
function dibujarRama(x, y, angulo, largo) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angulo);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -largo);
  ctx.stroke();
  ctx.restore();
}
function dibujarCorazon(x, y, size) {
  ctx.fillStyle = `hsl(${Math.random()*360},80%,70%)`;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size, y - size, x - size*2, y + size/2, x, y + size);
  ctx.bezierCurveTo(x + size*2, y + size/2, x + size, y - size, x, y);
  ctx.fill();
}
function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dibujarSemilla();
  animarSemilla();
  dibujarTronco();

  requestAnimationFrame(animar);
}

animar();
const inicio = new Date("2023-06-08T00:00:00");

function actualizarTiempo() {
  const ahora = new Date();
  let diff = Math.floor((ahora - inicio) / 1000);

  const dias = Math.floor(diff / 86400);
  diff %= 86400;
  const horas = Math.floor(diff / 3600);
  diff %= 3600;
  const minutos = Math.floor(diff / 60);
  const segundos = diff % 60;

  document.getElementById("tiempo").textContent =
    `${dias} días ${horas} horas ${minutos} minutos ${segundos} segundos`;
}

setInterval(actualizarTiempo, 1000);
actualizarTiempo();
