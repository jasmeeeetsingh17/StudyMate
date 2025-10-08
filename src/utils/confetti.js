// src/utils/confetti.js - NEW FILE
// Lightweight confetti animation (no external dependencies)

export const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Create confetti particles
        createConfetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        createConfetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);
};

function createConfetti(options) {
    const {
        particleCount = 50,
        startVelocity = 30,
        spread = 360,
        origin = { x: 0.5, y: 0.5 },
        zIndex = 9999
    } = options;

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    for (let i = 0; i < particleCount; i++) {
        createParticle(origin.x, origin.y, colors[Math.floor(Math.random() * colors.length)], startVelocity, spread, zIndex);
    }
}

function createParticle(x, y, color, velocity, spread, zIndex) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.backgroundColor = color;
    particle.style.left = `${x * window.innerWidth}px`;
    particle.style.top = `${y * window.innerHeight}px`;
    particle.style.zIndex = zIndex;
    particle.style.pointerEvents = 'none';
    particle.style.borderRadius = '50%';

    document.body.appendChild(particle);

    const angle = (spread * Math.random()) * (Math.PI / 180);
    const vx = Math.cos(angle) * velocity * (Math.random() * 0.5 + 0.5);
    const vy = Math.sin(angle) * velocity * (Math.random() * 0.5 + 0.5);

    let posX = parseFloat(particle.style.left);
    let posY = parseFloat(particle.style.top);
    let velocityY = vy;
    let opacity = 1;

    const gravity = 0.5;
    const fadeSpeed = 0.02;

    function animate() {
        velocityY += gravity;
        posX += vx;
        posY += velocityY;
        opacity -= fadeSpeed;

        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.opacity = opacity;

        if (opacity > 0 && posY < window.innerHeight) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }

    animate();
}

// Celebration messages
export const celebrationMessages = [
    "Awesome! 🎉",
    "Well done! 🌟",
    "Great job! 💪",
    "You're on fire! 🔥",
    "Keep it up! ⭐",
    "Fantastic! 🎊",
    "You rock! 🚀",
    "Amazing work! 🏆",
    "Nailed it! 🎯",
    "Brilliant! ✨"
];

export const getRandomCelebration = () => {
    return celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
};