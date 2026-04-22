document.addEventListener('DOMContentLoaded', () => {

    /* --- Mobile Navigation --- */
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : 'auto';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    });

    /* --- Scroll Interactions --- */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(7, 9, 18, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(7, 9, 18, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    /* --- Reveal Animations on Scroll --- */
    function reveal() {
        var reveals = document.querySelectorAll('.reveal');
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Trigger on load

    /* --- Neural Network Canvas Animation --- */
    const canvas = document.getElementById('neural-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        const properties = {
            bgColor: '#070912',
            particleColor: 'rgba(16, 185, 129, 0.7)',
            particleRadius: 3,
            count: 70,
            lineColor: 'rgba(16, 185, 129, 0.15)',
            lineWidth: 1,
            lineLength: 150,
            speed: 0.5
        };

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * properties.speed;
                this.vy = (Math.random() - 0.5) * properties.speed;
                this.radius = Math.random() * properties.particleRadius + 1;
            }

            position() {
                this.x + this.vx > width && this.vx > 0 || this.x + this.vx < 0 && this.vx < 0 ? this.vx *= -1 : this.vx;
                this.y + this.vy > height && this.vy > 0 || this.y + this.vy < 0 && this.vy < 0 ? this.vy *= -1 : this.vy;
                this.x += this.vx;
                this.y += this.vy;
            }

            reDraw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = properties.particleColor;
                ctx.fill();
            }
        }

        function init() {
            resize();
            particles = [];
            for (let i = 0 ; i < properties.count ; i++) {
                particles.push(new Particle);
            }
        }

        function drawLines() {
            let x1, y1, x2, y2, length, opacity;
            for (let i in particles) {
                for (let j in particles) {
                    x1 = particles[i].x;
                    y1 = particles[i].y;
                    x2 = particles[j].x;
                    y2 = particles[j].y;
                    length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    
                    if (length < properties.lineLength) {
                        opacity = 1 - length / properties.lineLength;
                        ctx.lineWidth = properties.lineWidth;
                        ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.2})`; // Primary color with varying opacity
                        if (opacity > 0) {
                            ctx.beginPath();
                            ctx.moveTo(x1, y1);
                            ctx.lineTo(x2, y2);
                            ctx.closePath();
                            ctx.stroke();
                        }
                    }
                }
            }
        }

        function loop() {
            ctx.clearRect(0, 0, width, height);
            for (let i in particles) {
                particles[i].position();
                particles[i].reDraw();
            }
            drawLines();
            requestAnimationFrame(loop);
        }

        window.addEventListener('resize', () => {
            resize();
            particles = [];
            init();
        });

        init();
        loop();
    }
});
