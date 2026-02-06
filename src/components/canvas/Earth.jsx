import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import gsap from 'gsap';

// --- Shaders ---
const atmosphereVertexShader = `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const atmosphereFragmentShader = `
varying vec3 vNormal;
void main() {
  float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
  gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
}
`;

// --- Utils ---
// Convert Lat/Lon to Vector3
// Lat: -90 (S) to 90 (N)
// Lon: -180 (W) to 180 (E)
const calcPosFromLatLonRad = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    return [x, y, z];
};

// --- Constants ---
const MARKERS = [
    { id: 1, lat: 37.7749, lon: -122.4194, label: "Projects", desc: "San Francisco" }, // SF
    { id: 2, lat: 40.7128, lon: -74.0060, label: "Tech Stack", desc: "New York" },   // NY
    { id: 3, lat: 51.5074, lon: -0.1278, label: "Experience", desc: "London" },     // London
    { id: 4, lat: 35.6762, lon: 139.6503, label: "About Me", desc: "Tokyo" },       // Tokyo
    { id: 5, lat: -33.8688, lon: 151.2093, label: "Contact", desc: "Sydney" },      // Sydney
];

export function Earth(props) {
    const earthRef = useRef();
    const cloudsRef = useRef();
    const groupRef = useRef();

    // Camera & Interaction State
    const { camera, gl, scene } = useThree();
    const [isDragging, setIsDragging] = useState(false);
    const [hoveredMarker, setHoveredMarker] = useState(null);
    const [focusedMarker, setFocusedMarker] = useState(null);

    // Physics State
    const velocity = useRef(0);
    const lastMouseX = useRef(0);
    const rotationY = useRef(0);

    // Load Textures
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [
        'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
        'https://unpkg.com/three-globe/example/img/earth-topology.png',
        'https://unpkg.com/three-globe/example/img/earth-water.png',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
    ]);

    // --- Handlers ---

    const handlePointerDown = (e) => {
        if (focusedMarker) return; // Disable drag when focused
        setIsDragging(true);
        lastMouseX.current = e.clientX;
        velocity.current = 0; // Reset velocity on grab
        e.stopPropagation(); // Prevent canvas orbit controls if any
        document.body.style.cursor = 'grabbing';
    };

    const handlePointerUp = () => {
        setIsDragging(false);
        document.body.style.cursor = 'default';
    };

    const handlePointerMove = (e) => {
        if (isDragging) {
            const deltaX = e.clientX - lastMouseX.current;
            lastMouseX.current = e.clientX;

            // Direct rotation tracking
            rotationY.current += deltaX * 0.005;
            velocity.current = deltaX * 0.005; // Track velocity for inertia
        }
    };

    const navigate = useNavigate();
    const { triggerBlackout } = useNavigation();

    const handleMarkerClick = (marker, position) => {
        if (focusedMarker === marker.id) return;

        setFocusedMarker(marker.id);

        // Animate Camera/Earth logic... keeping it simple for now
        // Zoom in effect
        gsap.to(camera.position, {
            z: 2.5,
            x: 0,
            duration: 1.5,
            ease: "power3.inOut",
            onComplete: () => {
                // Navigate after zoom via Cinematic Transition
                let route = '/';
                if (marker.label === 'Projects') route = '/projects';
                if (marker.label === 'Tech Stack') route = '/tech';
                if (marker.label === 'Experience') route = '/experience';
                if (marker.label === 'About Me') route = '/about';
                if (marker.label === 'Contact') route = '/contact';

                triggerBlackout(route);
            }
        });

        velocity.current = 0;
    };

    // --- Frame Loop ---
    useFrame(({ clock }) => {
        if (!earthRef.current || !groupRef.current) return;

        if (!isDragging && !focusedMarker) {
            // Apply Inertia
            rotationY.current += velocity.current;
            velocity.current *= 0.95; // Decay

            // Auto-rotation if velocity is low
            if (Math.abs(velocity.current) < 0.0001) {
                rotationY.current += 0.0005; // Slow drift
            }
        }

        // Sync ref rotation
        groupRef.current.rotation.y = rotationY.current;

        // Clouds Parallax
        cloudsRef.current.rotation.y += 0.0002;
    });

    return (
        <>
            {/* Capture Events on a wrapper or the earth itself */}
            <group ref={groupRef} {...props}>
                <group
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerMove={handlePointerMove}
                    onPointerLeave={handlePointerUp}
                >
                    {/* Earth Sphere */}
                    <mesh ref={earthRef} receiveShadow castShadow>
                        <sphereGeometry args={[1, 64, 64]} />
                        <meshPhongMaterial
                            map={colorMap}
                            normalMap={normalMap}
                            specularMap={specularMap}
                            shininess={10}
                        />
                    </mesh>

                    {/* Clouds Layer */}
                    <mesh ref={cloudsRef} scale={[1.01, 1.01, 1.01]}>
                        <sphereGeometry args={[1, 64, 64]} />
                        <meshStandardMaterial
                            map={cloudsMap}
                            transparent
                            opacity={0.8}
                            blending={THREE.AdditiveBlending}
                            side={THREE.DoubleSide}
                        />
                    </mesh>

                    {/* Atmosphere Glow */}
                    <mesh scale={[1.15, 1.15, 1.15]}>
                        <sphereGeometry args={[1, 64, 64]} />
                        <shaderMaterial
                            vertexShader={atmosphereVertexShader}
                            fragmentShader={atmosphereFragmentShader}
                            blending={THREE.AdditiveBlending}
                            side={THREE.BackSide}
                            transparent
                        />
                    </mesh>
                </group>

                {/* Interactive Markers */}
                {MARKERS.map((marker) => {
                    const pos = calcPosFromLatLonRad(marker.lat, marker.lon, 1.02);
                    return (
                        <group position={pos} key={marker.id}>
                            {/* Marker Dot */}
                            <mesh
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log("Clicked Marker", marker.label);
                                    handleMarkerClick(marker, pos);
                                }}
                                onPointerOver={() => {
                                    document.body.style.cursor = 'pointer';
                                    setHoveredMarker(marker.id);
                                }}
                                onPointerOut={() => {
                                    document.body.style.cursor = (isDragging ? 'grabbing' : 'default');
                                    setHoveredMarker(null);
                                }}
                            >
                                <sphereGeometry args={[0.02, 16, 16]} />
                                <meshBasicMaterial color={hoveredMarker === marker.id ? "cyan" : "white"} toneMapped={false} />
                            </mesh>

                            {/* Pulsing Ring */}
                            <mesh scale={[1, 1, 1]}>
                                <ringGeometry args={[0.03, 0.04, 32]} />
                                <meshBasicMaterial color="cyan" transparent opacity={0.5} side={THREE.DoubleSide} />
                            </mesh>

                            {/* Label */}
                            <Html
                                position={[0.05, 0.05, 0]}
                                occlude={[earthRef]}
                                style={{
                                    transition: 'all 0.2s',
                                    opacity: hoveredMarker === marker.id ? 1 : 0,
                                    transform: `scale(${hoveredMarker === marker.id ? 1 : 0.5}) translate3d(0,0,0)`,
                                    pointerEvents: 'none'
                                }}
                            >
                                <div className="bg-black/80 backdrop-blur-md border border-cyan-500/50 px-3 py-1 rounded text-xs text-cyan-400 font-bold whitespace-nowrap">
                                    {marker.label}
                                </div>
                            </Html>
                        </group>
                    );
                })}

                {/* Close Button UI */}
                {focusedMarker && (
                    <Html position={[0, 0, 0]} fullscreen style={{ pointerEvents: 'none' }}>
                        <div className="absolute top-10 right-10 pointer-events-auto">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFocusedMarker(null);
                                    // Animate back to default position
                                    gsap.to(camera.position, {
                                        z: 4,
                                        x: 0,
                                        y: 0,
                                        duration: 1.5,
                                        ease: "power3.inOut"
                                    });
                                    velocity.current = 0.002; // Give it a little spin push
                                }}
                                className="bg-black/80 hover:bg-cyan-500/20 text-white border border-white/20 hover:border-cyan-500 px-6 py-2 rounded-full backdrop-blur-md transition-all duration-300 font-bold tracking-wider"
                            >
                                CLOSE ✕
                            </button>
                        </div>
                    </Html>
                )}
            </group>
        </>
    );
}
