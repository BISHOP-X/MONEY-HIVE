import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from './theme-provider';

interface GlobeProps {
  width?: number;
  height?: number;
}

export function Globe({ width = 600, height = 600 }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'default', // Add explicit power preference
      preserveDrawingBuffer: true // Help with context preservation
    });
    
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create Earth sphere
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    
    // Load textures
    const earthTexture = textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg');
    const bumpTexture = textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/elev_bump_4k.jpg');
    const specularTexture = textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/water_4k.png');
    
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.1,
      specularMap: specularTexture,
      specular: new THREE.Color('grey'),
      shininess: 10
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
    
    // Handle hover interactions
    const handleMouseEnter = () => {
      targetRotationSpeed = 0.003;
    };
    
    const handleMouseLeave = () => {
      targetRotationSpeed = 0.001;
    };
    
    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;
      
      rotationSpeed += (targetRotationSpeed - rotationSpeed) * 0.1;
      earth.rotation.y += rotationSpeed;
      pointsGroup.rotation.y += rotationSpeed;
      arcsGroup.rotation.y += rotationSpeed;

      pointsGroup.children.forEach((child, index) => {
        if (index % 2 === 1) {
          child.scale.setScalar(1 + Math.sin(time + index) * 0.3);
          (child.material as THREE.MeshBasicMaterial).opacity = 
            0.4 * (1 + Math.sin(time + index)) / 2;
        }
      });

      arcsGroup.children.forEach((arc, index) => {
        (arc.material as THREE.LineBasicMaterial).opacity = 
          0.6 * (0.5 + Math.sin(time + index) * 0.5);
      });
      
      renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      // Cancel animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Remove event listeners
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);

      // Dispose of Three.js resources
      geometry.dispose();
      material.dispose();
      earthTexture.dispose();
      bumpTexture.dispose();
      specularTexture.dispose();
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
      
      // Force garbage collection
      renderer.forceContextLoss();
      renderer.context = null;
      renderer.domElement = null;
    };
  }, [width, height]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ 
        maxWidth: width,
        maxHeight: height
      }}
    />
  );
}