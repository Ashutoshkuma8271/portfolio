import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeGoldAccentProps {
  className?: string;
  size?: number;
  interactive?: boolean;
}

export const ThreeGoldAccent: React.FC<ThreeGoldAccentProps> = ({
  className = '',
  size = 140,
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    // Create 3D Gold Ingot / Medallion
    const geometry = new THREE.BoxGeometry(1.6, 0.9, 0.35);
    
    // Luxurious Physical Gold Material
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#D4AF37'),
      emissive: new THREE.Color('#3A2A05'),
      metalness: 0.95,
      roughness: 0.18,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 1.0,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = 0.35;
    mesh.rotation.y = -0.45;
    scene.add(mesh);

    // Dynamic Lights for Gold Sheen
    const keyLight = new THREE.DirectionalLight(0xfff4d0, 3.5);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc59f3d, 2.5);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xfffae6, 1.2);
    scene.add(ambientLight);

    // Mouse Tracking for Interactive Parallax
    let targetRotX = 0.35;
    let targetRotY = -0.45;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.8;
      targetRotX = -y * 0.6 + 0.2;
    };

    const handleMouseEnter = () => { isHovering = true; };
    const handleMouseLeave = () => {
      isHovering = false;
      targetRotX = 0.35;
      targetRotY = -0.45;
    };

    if (interactive) {
      mount.addEventListener('mousemove', handleMouseMove);
      mount.addEventListener('mouseenter', handleMouseEnter);
      mount.addEventListener('mouseleave', handleMouseLeave);
    }

    // Visibility observer to halt rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(mount);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion && !isHovering) {
        // Subtle ambient floating rotation
        mesh.rotation.y += delta * 0.45;
        mesh.position.y = Math.sin(elapsed * 1.5) * 0.08;
      } else {
        // Smooth lerp to mouse position
        mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.08;
        mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      if (interactive) {
        mount.removeEventListener('mousemove', handleMouseMove);
        mount.removeEventListener('mouseenter', handleMouseEnter);
        mount.removeEventListener('mouseleave', handleMouseLeave);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [size, interactive]);

  return (
    <div
      ref={mountRef}
      className={`relative cursor-pointer transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      title="Interactive 3D Physical Bullion Specimen"
      aria-label="3D Gold Ingot Specimen"
    />
  );
};
export default ThreeGoldAccent;
