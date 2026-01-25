import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface GlobeProps {
  width?: number;
  height?: number;
}

export function Globe({ width = 600, height = 600 }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Intersection Observer for lazy initialization
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!containerRef.current || !isVisible) return;

    // Scene setup with optimizations
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Disable antialiasing for performance
      alpha: true,
      powerPreference: 'low-power', // Prefer integrated GPU for battery/performance
      precision: 'lowp', // Lower precision for better performance
    });
    
    // Set pixel ratio to max 1.5 for better performance on high-DPI screens
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create Earth sphere with LOWER polygon count (32 instead of 64)
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    
    // Load ONLY the main texture - skip bump and specular for performance
    const earthTexture = textureLoader.load(
      'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg',
      undefined,
      undefined,
      () => {
        // Fallback to a simple colored material if texture fails
        earth.material = new THREE.MeshPhongMaterial({
          color: 0x2d3142,
          shininess: 5
        });
      }
    );
    
    // Simpler material without bump/specular maps
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 5
    });

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Position camera
    camera.position.z = 15;

    // Add points for major cities
    const cities = [
      { lat: 51.5074, lng: -0.1278, name: 'London' },
      { lat: 6.5244, lng: 3.3792, name: 'Lagos' },
      { lat: -1.2921, lng: 36.8219, name: 'Nairobi' },
      { lat: 5.6037, lng: -0.1870, name: 'Accra' },
      { lat: 9.0820, lng: 8.6753, name: 'Nigeria' },
      { lat: -26.2041, lng: 28.0473, name: 'Johannesburg' },
      { lat: 8.9806, lng: 38.7578, name: 'Addis Ababa' },
      { lat: 30.0444, lng: 31.2357, name: 'Cairo' }
    ];

    // Convert lat/long to 3D coordinates
    function latLongToVector3(lat: number, lng: number, radius: number) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    }

    // Create points group
    const pointsGroup = new THREE.Group();
    const arcsGroup = new THREE.Group();
    scene.add(pointsGroup);
    scene.add(arcsGroup);

    // Add points with pulsing animation
    const pointGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const pointMaterial = new THREE.MeshBasicMaterial({
      color: 0xF6B100,
      transparent: true,
      opacity: 0.8
    });

    cities.forEach(city => {
      const point = new THREE.Mesh(pointGeometry, pointMaterial.clone());
      const position = latLongToVector3(city.lat, city.lng, 5.1);
      point.position.copy(position);
      pointsGroup.add(point);

      // Add pulsing effect
      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 16, 16),
        new THREE.MeshBasicMaterial({
          color: 0xF6B100,
          transparent: true,
          opacity: 0.4
        })
      );
      pulse.position.copy(position);
      pointsGroup.add(pulse);
    });

    // Create animated arcs between London and other cities
    const londonPos = latLongToVector3(51.5074, -0.1278, 5.1);
    const arcMaterial = new THREE.LineBasicMaterial({
      color: 0xF6B100,
      linewidth: 2,
      transparent: true,
      opacity: 0.6
    });

    cities.slice(1).forEach((city, index) => {
      const destPos = latLongToVector3(city.lat, city.lng, 5.1);
      
      const midHeight = 2 + (index * 0.5);
      const curve = new THREE.QuadraticBezierCurve3(
        londonPos,
        new THREE.Vector3(
          (londonPos.x + destPos.x) * 0.5,
          (londonPos.y + destPos.y) * 0.5 + midHeight,
          (londonPos.z + destPos.z) * 0.5
        ),
        destPos
      );

      const points = curve.getPoints(50);
      const arcGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const arc = new THREE.Line(arcGeometry, arcMaterial.clone());
      arcsGroup.add(arc);
    });

    // Animation variables
    let rotationSpeed = 0.001;
    let targetRotationSpeed = 0.001;
    let time = 0;
    let animationFrameId: number;
    let lastFrame = 0;
    const targetFPS = 30; // Limit to 30 FPS for better performance
    const frameInterval = 1000 / targetFPS;
    
    // Handle hover interactions
    const handleMouseEnter = () => {
      targetRotationSpeed = 0.003;
    };
    
    const handleMouseLeave = () => {
      targetRotationSpeed = 0.001;
    };
    
    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop with FPS limiting
    function animate(currentTime: number) {
      animationFrameId = requestAnimationFrame(animate);
      
      // Limit FPS
      const delta = currentTime - lastFrame;
      if (delta < frameInterval) return;
      lastFrame = currentTime - (delta % frameInterval);
      
      time += 0.02; // Adjusted for 30fps
      
      rotationSpeed += (targetRotationSpeed - rotationSpeed) * 0.1;
      earth.rotation.y += rotationSpeed;
      pointsGroup.rotation.y += rotationSpeed;
      arcsGroup.rotation.y += rotationSpeed;

      // Simplified animations - update every other frame
      if (Math.floor(time * 10) % 2 === 0) {
        pointsGroup.children.forEach((child, index) => {
          if (index % 2 === 1 && child instanceof THREE.Mesh) {
            child.scale.setScalar(1 + Math.sin(time + index) * 0.3);
            if (child.material instanceof THREE.MeshBasicMaterial) {
              child.material.opacity = 0.4 * (1 + Math.sin(time + index)) / 2;
            }
          }
        });

        arcsGroup.children.forEach((arc, index) => {
          if (arc instanceof THREE.Line && arc.material instanceof THREE.LineBasicMaterial) {
            arc.material.opacity = 0.6 * (0.5 + Math.sin(time + index) * 0.5);
          }
        });
      }
      
      renderer.render(scene, camera);
    }
    animate(0);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Store ref value for cleanup
    const container = containerRef.current;

    // Cleanup
    return () => {
      // Cancel animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Remove event listeners
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      window.removeEventListener('resize', handleResize);

      // Dispose of Three.js resources
      geometry.dispose();
      material.dispose();
      earthTexture.dispose();
      pointGeometry.dispose();
      pointMaterial.dispose();
      
      // Dispose of all materials and geometries in groups
      pointsGroup.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });

      arcsGroup.traverse((object) => {
        if (object instanceof THREE.Line) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });

      // Clear scene
      scene.clear();
      
      // Dispose of renderer
      renderer.dispose();
      
      // Force context loss for cleanup
      try {
        renderer.forceContextLoss();
      } catch {
        // Ignore errors during cleanup
      }
    };
  }, [width, height, isVisible]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ 
        maxWidth: width,
        maxHeight: height
      }}
    >
      {/* Placeholder while loading */}
      {!isVisible && (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-supporting/5 rounded-full">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}