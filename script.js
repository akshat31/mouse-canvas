const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let particleArray;
const numberOfParticles = 200;

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

setInterval(() => {
    mouse.x = undefined;
    mouse.y = undefined;
}, 200)

function Particle(x, y, size, color, weight) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.weight = weight;
}

Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
}

Particle.prototype.update = function() {
    this.size -= 0.05;
    if (this.size < 0) {
        this.x = (mouse.x + (Math.random() * 20) - 10);
        this.y = (mouse.y + (Math.random() * 20) - 10);
        this.size = (Math.random() * 10) + 2;
        this.weight = (Math.random() * 2) - 0.5;
    }

    this.y += this.weight;
    this.weight += 0.2;

    if (this.y > canvas.height - this.size) {
        this.weight *= -1;
    }
}

function init () {
    particleArray = [];
    for (let i=0; i<numberOfParticles; i++) {
        let size = (Math.random() * 5) + 2;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let colorArray = ['white', 'red', 'blue', 'green', 'pink', 'purple', 'yellow', 'black']
        let color = colorArray[Math.floor(Math.random() * colorArray.length)];
        let weight = 1;

        particleArray.push(new Particle(x, y, size, color, weight));
    }
}

function animate () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i=0;i<particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})
