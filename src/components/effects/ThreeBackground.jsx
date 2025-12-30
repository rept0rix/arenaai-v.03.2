import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const frameIdRef = useRef(null);
  const cleanedUpRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current || cleanedUpRef.current === false) {
      cleanedUpRef.current = false;
    }

    const container = mountRef.current;
    if (!container) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Clear container and append canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x0ea5e9, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Torus Knot
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      metalness: 0.7,
      roughness: 0.2,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.6,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      if (cleanedUpRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      torusKnot.rotation.x = elapsedTime * 0.3 + mouseY * 0.5;
      torusKnot.rotation.y = elapsedTime * 0.5 + mouseX * 0.5;

      particlesMesh.rotation.y = elapsedTime * 0.1;

      pointLight1.position.x = Math.sin(elapsedTime) * 3;
      pointLight1.position.z = Math.cos(elapsedTime) * 3;
      
      pointLight2.position.x = Math.cos(elapsedTime) * 3;
      pointLight2.position.z = Math.sin(elapsedTime) * 3;

      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cleanedUpRef.current = true;

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }

      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      
      if (renderer) {
        renderer.dispose();
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20"
      style={{ zIndex: 0, mixBlendMode: 'screen' }}
    />
  );
}