const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

// Taille canvas ******************************************************************************

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 50;

// Réajuster taille canvas à chaque resize de la page *****************************************

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 50;
})

let particleArray = [];
let hue = 0;

// objet contenant coordonnée x,y

const mouse = {
    x: null,
    y: null,
}

// Fonctions et class ********************************************************************************************

class Particle {
    constructor() {
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)'
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) {
            this.size -= 0.1
        }

    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.fill();
        ctx.stroke();
    }
}

// execute pour chaque particules update et draw 


function handleParticle() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();

        if (particleArray[i].size <= 0.3) {
            particleArray.splice(i, 1);
            i--;
        }

    }
}


function anim() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    requestAnimationFrame(anim);

}

anim();

canvas.addEventListener("mousemove", (e) => {

    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    hue += 10;
    for (let i = 0; i < 10; i++) {
        particleArray.push(new Particle());
    }

})