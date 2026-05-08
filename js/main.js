const navLinks = document.querySelectorAll('.nav-pill a');
const root = document.documentElement;

window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth) - 0.5;
    const y = (event.clientY / window.innerHeight) - 0.5;

    root.style.setProperty('--star-x', `${(x * 10).toFixed(2)}px`);
    root.style.setProperty('--star-y', `${(y * 8).toFixed(2)}px`);
    root.style.setProperty('--glow-shift-x', `${(x * 18).toFixed(2)}px`);
    root.style.setProperty('--glow-shift-y', `${(y * 14).toFixed(2)}px`);
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.forEach((item) => item.classList.remove('nav-clicked'));
        link.classList.add('nav-clicked');
    });

});

const aboutImageCard = document.querySelector('.about-image-card');
const imageFlipButton = document.querySelector('.image-flip-card');

if (aboutImageCard && imageFlipButton) {
    imageFlipButton.addEventListener('pointermove', (event) => {
        const rect = imageFlipButton.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const tiltY = (x - 0.5) * 7;
        const tiltX = (0.5 - y) * 5;

        aboutImageCard.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
        aboutImageCard.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
        aboutImageCard.style.setProperty('--glow-x', `${(x * 100).toFixed(1)}%`);
        aboutImageCard.style.setProperty('--glow-y', `${(y * 100).toFixed(1)}%`);
    });

    imageFlipButton.addEventListener('pointerleave', () => {
        aboutImageCard.style.setProperty('--tilt-x', '0deg');
        aboutImageCard.style.setProperty('--tilt-y', '0deg');
        aboutImageCard.style.setProperty('--glow-x', '50%');
        aboutImageCard.style.setProperty('--glow-y', '50%');
    });

    imageFlipButton.addEventListener('click', () => {
        aboutImageCard.classList.remove('is-flipping');
        void aboutImageCard.offsetWidth;
        aboutImageCard.classList.add('is-flipping');

        const isFlipped = aboutImageCard.classList.toggle('is-flipped');

        imageFlipButton.setAttribute('aria-pressed', String(isFlipped));
    });

    imageFlipButton.addEventListener('animationend', (event) => {
        if (event.animationName === 'flipWeight') {
            aboutImageCard.classList.remove('is-flipping');
        }
    });
}
