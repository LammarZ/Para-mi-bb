const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let tronco = {
  x: canvas.width / 2,
  y: canvas.height - 120,
  altura: 0,
  maxAltura: 220,
  anchoBase: 14,
  segmentos: []
};

let ramas = [];

function crecerTronco() {
  if (tronco.altura < tronco.maxAltura) {
    tronco.altura += 1;
    let p = tronco.altura / tronco.maxAltura;

    tronco.segmentos.push({
      x: tronco.x + Math.sin(p * 3) * 5,
      y: tronco.y - tronco.altura,
      ancho: tronco.anchoBase * (1 - p)
    });
  }
}
function dibujarTronco() {
  tronco.segmentos.forEach(s => {
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x, s.y + 4);
    ctx.strokeStyle = "#4a2f1b";
    ctx.lineWidth = s.ancho;
    ctx.stroke();
  });
}
function generarRamas() {
  if (tronco.altura > 40 && Math.random() < 0.05) {
    let u = tronco.segmentos[tronco.segmentos.length - 1];

    ramas.push({
      x: u.x,
      y: u.y,
      angulo: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.6 + 0.4),
      largo: 0,
      maxLargo: Math.random() * 60 + 40,
      hojas: []
    });
  }
}
function dibujarRamas() {
  ramas.forEach(r => {
    if (r.largo < r.maxLargo) r.largo += 0.6;

    ctx.save();
    ctx.translate(r.x, r.y);
    ctx.rotate(r.angulo);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -r.largo);
    ctx.strokeStyle = "#4a2f1b";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  });
}
function dibujarCorazon(x, y, s) {
  ctx.fillStyle = `hsl(${Math.random() * 360},80%,70%)`;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - s, y - s, x - s * 2, y + s / 2, x, y + s);
  ctx.bezierCurveTo(x + s * 2, y + s / 2, x + s, y - s, x, y);
  ctx.fill();
}
function generarHojas() {
  ramas.forEach(r => {
    if (r.largo >= r.maxLargo && r.hojas.length < 12 && Math.random() < 0.1) {
      r.hojas.push({
        offset: Math.random() * r.maxLargo,
        size: Math.random() * 6 + 6
      });
    }
  });
}
function dibujarHojas() {
  ramas.forEach(r => {
    r.hojas.forEach(h => {
      let x = r.x + Math.sin(r.angulo) * h.offset;
      let y = r.y - Math.cos(r.angulo) * h.offset;
      dibujarCorazon(x, y, h.size);
    });
  });
}
function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  crecerTronco();
  dibujarTronco();

  generarRamas();
  dibujarRamas();

  generarHojas();
  dibujarHojas();

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
