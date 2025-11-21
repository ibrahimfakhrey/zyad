// ==========================================
// THREE.JS ANIMATED BACKGROUND
// ==========================================
function initThreeJS() {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 30;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Particle material with gradient colors
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x9333ea,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create geometric shapes
    const geometries = [];
    const materials = [];
    const meshes = [];
    
    // Add torus
    const torusGeometry = new THREE.TorusGeometry(10, 1, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
        color: 0x6b46c1,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-20, 10, -10);
    scene.add(torus);
    meshes.push(torus);
    
    // Add icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(5, 0);
    const icoMaterial = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(20, -10, -15);
    scene.add(icosahedron);
    meshes.push(icosahedron);
    
    // Add octahedron
    const octaGeometry = new THREE.OctahedronGeometry(4, 0);
    const octaMaterial = new THREE.MeshStandardMaterial({
        color: 0x9333ea,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.set(0, 15, -20);
    scene.add(octahedron);
    meshes.push(octahedron);
    
    // Lighting
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Scroll animation
    let scrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
        
        // Rotate geometric shapes
        meshes.forEach((mesh, index) => {
            mesh.rotation.x += 0.005 + index * 0.001;
            mesh.rotation.y += 0.003 + index * 0.001;
            mesh.rotation.z += 0.002;
        });
        
        // Mouse interaction
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
        
        // Scroll interaction
        camera.position.z = 30 + scrollY * 0.01;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// PROJECT CARD 3D TILT EFFECT
// ==========================================
function init3DTilt() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ==========================================
// ANIMATED COUNTER FOR PROJECTS
// ==========================================
function animateCounter() {
    const projectCards = document.querySelectorAll('.project-card');
    const totalProjects = projectCards.length;
    
    // You can add a counter display if needed
    console.log(`Total Projects: ${totalProjects}`);
}

// ==========================================
// PARALLAX EFFECT ON SCROLL
// ==========================================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ==========================================
// DYNAMIC GRADIENT ANIMATION
// ==========================================
function animateGradients() {
    const gradientElements = document.querySelectorAll('[class*="gradient-bg-"]');
    
    gradientElements.forEach((element, index) => {
        let hue = index * 30;
        
        setInterval(() => {
            hue = (hue + 1) % 360;
            const color1 = `hsl(${hue}, 70%, 60%)`;
            const color2 = `hsl(${(hue + 60) % 360}, 70%, 50%)`;
            element.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
        }, 50);
    });
}

// ==========================================
// LOADING ANIMATION
// ==========================================
function initLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
}

// ==========================================
// CURSOR TRAIL EFFECT (OPTIONAL PREMIUM FEATURE)
// ==========================================
function initCursorTrail() {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.cursor-circle');
    
    // Create cursor circles if they don't exist
    if (circles.length === 0) {
        for (let i = 0; i < 20; i++) {
            const circle = document.createElement('div');
            circle.className = 'cursor-circle';
            circle.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: linear-gradient(135deg, #9333ea, #f59e0b);
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s;
            `;
            document.body.appendChild(circle);
        }
    }
    
    const allCircles = document.querySelectorAll('.cursor-circle');
    
    allCircles.forEach((circle, index) => {
        circle.x = 0;
        circle.y = 0;
    });
    
    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });
    
    function animateCircles() {
        let x = coords.x;
        let y = coords.y;
        
        allCircles.forEach((circle, index) => {
            circle.style.left = x - 5 + 'px';
            circle.style.top = y - 5 + 'px';
            circle.style.opacity = (20 - index) / 20;
            circle.style.transform = `scale(${(20 - index) / 20})`;
            
            circle.x = x;
            circle.y = y;
            
            const nextCircle = allCircles[index + 1] || allCircles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });
        
        requestAnimationFrame(animateCircles);
    }
    
    animateCircles();
}

// ==========================================
// INITIALIZE ALL FEATURES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Core features
    initThreeJS();
    initScrollReveal();
    initSmoothScroll();
    init3DTilt();
    animateCounter();
    
    // Optional premium features
    initParallax();
    // animateGradients(); // Uncomment for dynamic gradient animation
    // initCursorTrail(); // Uncomment for cursor trail effect
    
    console.log('🚀 Premium Portfolio Loaded Successfully!');
    console.log('💼 Showcasing 20 Flask & Python Projects');
    console.log('✨ Built with Three.js, Advanced CSS, and Modern JavaScript');
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations
}, 10));

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ==========================================
// EASTER EGG: KONAMI CODE
// ==========================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        console.log('🎮 Konami Code Activated! You found the secret!');
        document.body.style.animation = 'rainbow 2s infinite';
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});
