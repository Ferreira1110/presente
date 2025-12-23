document.addEventListener("DOMContentLoaded", () => {

    /* ===== CARROSSEL ===== */
    const slides = document.querySelector(".slides");
    const imgs = document.querySelectorAll(".slides img");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    let index = 0;

    function updateSlide() {
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    next?.addEventListener("click", () => {
        index = (index + 1) % imgs.length;
        updateSlide();
    });

    prev?.addEventListener("click", () => {
        index = (index - 1 + imgs.length) % imgs.length;
        updateSlide();
    });

    /* ===== MÚSICA ===== */
    const music = document.getElementById("music");
    function iniciarMusica() {
        if (!music) return;
        music.volume = 0;
        music.play().catch(() => {});
        let v = 0;
        const fade = setInterval(() => {
            if (v < 0.25) { 
                v += 0.01; 
                music.volume = v; 
            } else clearInterval(fade);
        }, 120);
    }

    /* ===== LOADER + CORAÇÃO ===== */
const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");
const loader = document.getElementById("loader");
const startBtn = document.getElementById("startBtn");

let w = innerWidth;
let h = innerHeight;
let explode = false;

function resizeHeart() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
}
window.addEventListener("resize", resizeHeart);
resizeHeart();

// Função do coração
const heartPos = t => [
    Math.pow(Math.sin(t), 3),
    -(15 * Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t))
];

// Criando partículas do coração
let points = [];
for(let i = 0; i < Math.PI*2; i += 0.08){
    const [x, y] = heartPos(i);
    points.push({
        x: w/2,
        y: h/2,
        tx: x*220 + w/2,
        ty: y*14 + h/2,
        vx: 0,
        vy: 0,
        size: 2
    });
}

// Loop do coração
function loopHeart(){
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,w,h);

    points.forEach(p=>{
        if(!explode){
            // Movimento suave para formar o coração
            p.vx += (p.tx - p.x) * 0.02;
            p.vy += (p.ty - p.y) * 0.02;
        } else {
            // Explosão randomizada
            p.vx += (Math.random()-0.5)*8;
            p.vy += (Math.random()-0.5)*8;
        }

        // Atualiza posição
        p.x += p.vx;
        p.y += p.vy;

        // Diminui velocidade (fricção)
        p.vx *= 0.88;
        p.vy *= 0.88;

        // Desenha
        ctx.fillStyle = "rgba(255,90,130,0.8)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();
    });

    requestAnimationFrame(loopHeart);
}

loopHeart();

// Botão iniciar
startBtn.addEventListener("click", () => {
    // Faz o coração explodir
    explode = true;

    // Tocando música
    if(music){
        music.volume = 0;
        music.play().catch(()=>{});
        let v = 0;
        const fade = setInterval(()=>{
            if(v<0.25){ v+=0.01; music.volume=v; }
            else clearInterval(fade);
        }, 120);
    }

    // Fecha o loader após a explosão
    setTimeout(()=>{
        loader.classList.add("hidden");
    }, 1400);
});

    /* ===== PÉTALAS ===== */
    setInterval(() => {
        const p = document.createElement("div");
        p.className = "petala";
        p.textContent = "🌸";
        p.style.left = Math.random() * 100 + "vw";
        p.style.animationDuration = 6 + Math.random() * 4 + "s";
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 10000);
    }, 900);

    /* ===== CARTAS ===== */
    const cartas = document.querySelectorAll(".carta");
    if (cartas.length) {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.style.opacity = 1;
                    e.target.style.transform = "translateY(0)";
                }
            });
        }, { threshold: 0.2 });

        cartas.forEach(c => {
            c.style.opacity = 0;
            c.style.transform = "translateY(20px)";
            c.style.transition = "0.8s";
            obs.observe(c);
        });
    }

    /* ===== FINAL ===== */
    const finalText = document.querySelector(".final-text");
    if (finalText) {
        const obsFinal = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                finalText.style.opacity = 1;
                finalText.style.transform = "translateY(0)";
            }
        }, { threshold: 0.6 });
        obsFinal.observe(finalText);
    }

});
