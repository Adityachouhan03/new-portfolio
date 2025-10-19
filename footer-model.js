// 3D Model for the footer section
document.addEventListener('DOMContentLoaded', () => {
    // Create the 3D model in the footer
    createFooterModel();
});

function createFooterModel() {
    // Create container for the 3D model
    const footerModelContainer = document.createElement('div');
    footerModelContainer.id = 'footer-model-container';
    footerModelContainer.style.width = '100%';
    footerModelContainer.style.height = '200px';
    footerModelContainer.style.position = 'relative';
    footerModelContainer.style.marginTop = '30px';
    
    // Insert the container at the beginning of the footer content
    const footerContent = document.querySelector('.footer-content');
    footerContent.parentNode.insertBefore(footerModelContainer, footerContent);
    
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 200, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    // Set renderer size and add to container
    renderer.setSize(window.innerWidth, 200);
    footerModelContainer.appendChild(renderer.domElement);
    
    // Create a group to hold all objects
    const group = new THREE.Group();
    scene.add(group);
    
    // Create multiple 3D objects
    const objects = [];
    const colors = [0x8a2be2, 0x9370db, 0x7b68ee, 0x6a5acd, 0x483d8b];
    
    // Create cubes
    for (let i = 0; i < 15; i++) {
        const geometry = new THREE.BoxGeometry(
            Math.random() * 0.5 + 0.5, 
            Math.random() * 0.5 + 0.5, 
            Math.random() * 0.5 + 0.5
        );
        const material = new THREE.MeshPhongMaterial({ 
            color: colors[Math.floor(Math.random() * colors.length)],
            specular: 0xffffff,
            shininess: 100,
            transparent: true,
            opacity: 0.8
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Position randomly
        cube.position.x = (Math.random() - 0.5) * 20;
        cube.position.y = (Math.random() - 0.5) * 5;
        cube.position.z = (Math.random() - 0.5) * 10;
        
        // Random rotation
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        
        group.add(cube);
        objects.push({
            mesh: cube,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: Math.random() * 0.005 + 0.002
        });
    }
    
    // Add spheres
    for (let i = 0; i < 10; i++) {
        const geometry = new THREE.SphereGeometry(Math.random() * 0.3 + 0.2, 16, 16);
        const material = new THREE.MeshPhongMaterial({ 
            color: colors[Math.floor(Math.random() * colors.length)],
            specular: 0xffffff,
            shininess: 100,
            transparent: true,
            opacity: 0.8
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        
        // Position randomly
        sphere.position.x = (Math.random() - 0.5) * 20;
        sphere.position.y = (Math.random() - 0.5) * 5;
        sphere.position.z = (Math.random() - 0.5) * 10;
        
        group.add(sphere);
        objects.push({
            mesh: sphere,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: Math.random() * 0.005 + 0.002
        });
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add point lights with different colors
    const pointLight1 = new THREE.PointLight(0x8a2be2, 1, 10);
    pointLight1.position.set(5, 2, 2);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x9370db, 1, 10);
    pointLight2.position.set(-5, -2, 2);
    scene.add(pointLight2);
    
    // Position camera
    camera.position.z = 10;
    
    // Handle window resize
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, 200);
        camera.aspect = window.innerWidth / 200;
        camera.updateProjectionMatrix();
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the entire group slowly
        group.rotation.y += 0.002;
        
        // Animate each object individually
        objects.forEach(obj => {
            // Apply rotation
            obj.mesh.rotation.x += obj.rotationSpeed.x;
            obj.mesh.rotation.y += obj.rotationSpeed.y;
            obj.mesh.rotation.z += obj.rotationSpeed.z;
            
            // Apply floating effect
            obj.mesh.position.y += Math.sin(Date.now() * obj.floatSpeed) * 0.005;
        });
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    animate();
}