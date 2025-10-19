// 3D Model for the hero section
document.addEventListener('DOMContentLoaded', () => {
    // Create the 3D model in the hero section
    createHeroModel();
});

function createHeroModel() {
    // Create container for the 3D model
    const heroModelContainer = document.createElement('div');
    heroModelContainer.id = 'hero-model-container';
    heroModelContainer.style.width = '100%';
    heroModelContainer.style.height = '300px';
    heroModelContainer.style.position = 'absolute';
    heroModelContainer.style.top = '0';
    heroModelContainer.style.left = '0';
    heroModelContainer.style.zIndex = '-1';
    
    // Insert the container at the beginning of the hero section
    const heroSection = document.getElementById('home');
    heroSection.style.position = 'relative';
    heroSection.style.overflow = 'hidden';
    heroSection.insertBefore(heroModelContainer, heroSection.firstChild);
    
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    // Set renderer size and add to container
    renderer.setSize(window.innerWidth, 300);
    heroModelContainer.appendChild(renderer.domElement);
    
    // Create floating particles
    const particlesGroup = new THREE.Group();
    scene.add(particlesGroup);
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(Math.random() * 0.5 + 0.1, 8, 8);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x4a6cf7,
            transparent: true,
            opacity: Math.random() * 0.5 + 0.2
        });
        
        const particle = new THREE.Mesh(geometry, material);
        
        // Position randomly across the screen
        particle.position.x = (Math.random() - 0.5) * window.innerWidth * 0.8;
        particle.position.y = (Math.random() - 0.5) * 300;
        particle.position.z = (Math.random() - 0.5) * 50;
        
        particlesGroup.add(particle);
        particles.push({
            mesh: particle,
            speed: Math.random() * 0.01 + 0.005,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            }
        });
    }
    
    // Add some geometric shapes
    const shapes = [];
    const shapeCount = 10;
    const shapeTypes = ['cube', 'tetrahedron', 'octahedron'];
    const colors = [0x4a6cf7, 0x6d8dff, 0x3a5bd9];
    
    for (let i = 0; i < shapeCount; i++) {
        let geometry;
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        
        switch(shapeType) {
            case 'cube':
                geometry = new THREE.BoxGeometry(
                    Math.random() * 5 + 3, 
                    Math.random() * 5 + 3, 
                    Math.random() * 5 + 3
                );
                break;
            case 'tetrahedron':
                geometry = new THREE.TetrahedronGeometry(Math.random() * 3 + 2);
                break;
            case 'octahedron':
                geometry = new THREE.OctahedronGeometry(Math.random() * 3 + 2);
                break;
        }
        
        const material = new THREE.MeshPhongMaterial({ 
            color: colors[Math.floor(Math.random() * colors.length)],
            transparent: true,
            opacity: 0.7,
            wireframe: Math.random() > 0.5
        });
        
        const shape = new THREE.Mesh(geometry, material);
        
        // Position at the edges of the screen
        shape.position.x = (Math.random() - 0.5) * window.innerWidth;
        shape.position.y = (Math.random() - 0.5) * 300;
        shape.position.z = -50 - Math.random() * 100;
        
        particlesGroup.add(shape);
        shapes.push({
            mesh: shape,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            }
        });
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Position camera
    camera.position.z = 50;
    
    // Handle window resize
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, 300);
        camera.aspect = window.innerWidth / 300;
        camera.updateProjectionMatrix();
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Animate particles
        particles.forEach(particle => {
            particle.mesh.position.y += Math.sin(Date.now() * particle.speed) * 0.05;
            particle.mesh.rotation.x += particle.rotationSpeed.x;
            particle.mesh.rotation.y += particle.rotationSpeed.y;
            particle.mesh.rotation.z += particle.rotationSpeed.z;
        });
        
        // Animate shapes
        shapes.forEach(shape => {
            shape.mesh.rotation.x += shape.rotationSpeed.x;
            shape.mesh.rotation.y += shape.rotationSpeed.y;
            shape.mesh.rotation.z += shape.rotationSpeed.z;
        });
        
        // Rotate the entire group slowly
        particlesGroup.rotation.y += 0.001;
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    animate();
}