import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { BookOpen, Award, Compass, GraduationCap, ChevronRight, Globe, Layers } from 'lucide-react';

interface Landing3DProps {
  onSelectSubject: (subjectId: string) => void;
}

interface SubjectConfig {
  id: string;
  name: string;
  subName: string;
  color: string;
  emissive: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  active: boolean;
  desc: string;
}

export const Landing3D: React.FC<Landing3DProps> = ({ onSelectSubject }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedSub, setSelectedSub] = useState<SubjectConfig | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const callbackRef = useRef(onSelectSubject);
  const clickedSubjectId = useRef<string | null>(null);

  useEffect(() => {
    callbackRef.current = onSelectSubject;
  }, [onSelectSubject]);

  // Subject Configurations
  const subjects: SubjectConfig[] = [
    {
      id: 'kannada',
      name: 'Kannada (FL)',
      subName: 'ಪ್ರಥಮ ಭಾಷೆ ಕನ್ನಡ',
      color: '#00f2fe',
      emissive: '#006677',
      size: 4.5,
      orbitRadius: 28,
      orbitSpeed: 0.15,
      active: true,
      desc: '11 Digitized Chapters, High-Fidelity Audiobooks, and Solved Exercise Tracks.'
    },
    {
      id: 'math',
      name: 'Mathematics',
      subName: 'ಗಣಿತ',
      color: '#ff007f',
      emissive: '#7f003f',
      size: 3.5,
      orbitRadius: 38,
      orbitSpeed: 0.1,
      active: false,
      desc: 'Interactive 3D Geometry, Solved Theorems, and Dynamic Formula Calculators (Coming Soon).'
    },
    {
      id: 'science',
      name: 'Science',
      subName: 'ವಿಜ್ಞಾನ',
      color: '#39ff14',
      emissive: '#1c7f0a',
      size: 4.0,
      orbitRadius: 48,
      orbitSpeed: 0.08,
      active: false,
      desc: 'Virtual Lab Simulations, Interactive 3D Cell Models, and Solved Q&A (Coming Soon).'
    },
    {
      id: 'social',
      name: 'Social Science',
      subName: 'ಸಮಾಜ ವಿಜ್ಞಾನ',
      color: '#ffb300',
      emissive: '#7f5900',
      size: 3.8,
      orbitRadius: 58,
      orbitSpeed: 0.06,
      active: false,
      desc: 'Immersive Historical Timelines, Solved Q&A, and Interactive Atlas (Coming Soon).'
    },
    {
      id: 'english',
      name: 'English (Soon)',
      subName: 'ದ್ವಿತೀಯ ಭಾಷೆ ಇಂಗ್ಲಿಷ್',
      color: '#e0aaff',
      emissive: '#5a189a',
      size: 3.2,
      orbitRadius: 66,
      orbitSpeed: 0.05,
      active: false,
      desc: 'High-Fidelity Audiobooks, Grammar Checklists, and Speaking Drills (Coming Soon).'
    }
  ];

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // PREVENT STRICT MODE DOUBLE-CANVAS DUPLICATION
    mount.innerHTML = '';

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#07080f', 0.008);

    // CAMERA SETUP
    const width = mount.clientWidth;
    const height = mount.clientHeight || 550;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 35, 75);
    camera.lookAt(0, 0, 0);

    // RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight('#0a0c14', 1.5);
    scene.add(ambientLight);

    // Point Light from Center Star (Sun)
    const centralLight = new THREE.PointLight('#c084fc', 8, 150, 0.5);
    centralLight.position.set(0, 0, 0);
    scene.add(centralLight);

    // Directional rim lighting
    const dirLight = new THREE.DirectionalLight('#66fcf1', 1.5);
    dirLight.position.set(30, 50, 20);
    scene.add(dirLight);

    // CENTRAL STAR (Class 9 Portal)
    const coreGeometry = new THREE.SphereGeometry(6, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: '#c084fc',
      transparent: true,
      opacity: 0.9
    });
    const centralStar = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(centralStar);

    // Create background starfield (2000 particles)
    const starCount = 2000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      // Distribute stars spherically
      const r = 150 + Math.random() * 300;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = r * Math.cos(phi);

      // Varying colors (cyan, magenta, purple, white)
      const colorType = Math.random();
      if (colorType < 0.25) {
        starColors[i] = 0.4; starColors[i + 1] = 0.9; starColors[i + 2] = 1.0; // cyan
      } else if (colorType < 0.5) {
        starColors[i] = 1.0; starColors[i + 1] = 0.3; starColors[i + 2] = 0.8; // pink
      } else {
        starColors[i] = 1.0; starColors[i + 1] = 1.0; starColors[i + 2] = 1.0; // white
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Custom circular texture mapping for stars
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 16;
    starCanvas.height = 16;
    const starCtx = starCanvas.getContext('2d');
    if (starCtx) {
      const grad = starCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      starCtx.fillStyle = grad;
      starCtx.fillRect(0, 0, 16, 16);
    }
    const starTexture = new THREE.CanvasTexture(starCanvas);

    const starMaterial = new THREE.PointsMaterial({
      size: 1.5,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);

    // PLANETARY MESH CREATION
    interface PlanetMesh {
      mesh: THREE.Mesh;
      config: SubjectConfig;
      angle: number;
    }

    const planets: PlanetMesh[] = [];

    subjects.forEach((subj) => {
      // 1. Draw Orbit Guide ring
      const orbitGeom = new THREE.RingGeometry(subj.orbitRadius - 0.05, subj.orbitRadius + 0.05, 64);
      orbitGeom.rotateX(Math.PI / 2);
      const orbitRing = new THREE.Mesh(orbitGeom, new THREE.MeshBasicMaterial({
        color: subj.color,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide
      }));
      scene.add(orbitRing);

      // 2. Create Planet Sphere
      const sphereGeom = new THREE.SphereGeometry(subj.size, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: subj.color,
        roughness: 0.1,
        metalness: 0.8,
        emissive: subj.emissive,
        emissiveIntensity: 0.6
      });
      const planet = new THREE.Mesh(sphereGeom, sphereMat);

      // Optional rings for key subject
      if (subj.id === 'kannada') {
        const ringGeom = new THREE.RingGeometry(subj.size + 1.5, subj.size + 4, 32);
        ringGeom.rotateX(Math.PI / 2.3);
        const ringMat = new THREE.MeshStandardMaterial({
          color: '#66fcf1',
          transparent: true,
          opacity: 0.35,
          side: THREE.DoubleSide
        });
        const rings = new THREE.Mesh(ringGeom, ringMat);
        planet.add(rings);
      }

      // Initial angle distribution
      const angle = Math.random() * Math.PI * 2;
      planet.position.set(
        subj.orbitRadius * Math.cos(angle),
        0,
        subj.orbitRadius * Math.sin(angle)
      );

      scene.add(planet);
      planets.push({ mesh: planet, config: subj, angle });
    });

    // RAYCASTING (HOVER/CLICK SELECTION)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let currentHover: PlanetMesh | null = null;
    let targetZoom: THREE.Vector3 | null = null;
    let zoomTargetMesh: THREE.Mesh | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const matchingPlanet = planets.find(p => p.mesh === hitMesh);
        if (matchingPlanet) {
          if (currentHover !== matchingPlanet) {
            currentHover = matchingPlanet;
            setSelectedSub(matchingPlanet.config);
            document.body.style.cursor = matchingPlanet.config.active ? 'pointer' : 'not-allowed';
            
            // Subtle pulse on hover
            hitMesh.scale.setScalar(1.25);
          }
        }
      } else {
        if (currentHover) {
          currentHover.mesh.scale.setScalar(1.0);
          currentHover = null;
          setSelectedSub(null);
          document.body.style.cursor = 'default';
        }
      }
    };

    const handleCanvasClick = () => {
      if (currentHover && currentHover.config.active && !isZooming) {
        // Initiate dramatic camera zoom
        setIsZooming(true);
        zoomTargetMesh = currentHover.mesh;
        targetZoom = new THREE.Vector3().copy(currentHover.mesh.position);
        clickedSubjectId.current = currentHover.config.id;
      }
    };

    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('click', handleCanvasClick);

    // RESIZE LISTENERS
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Spin central star
      centralStar.rotation.y += 0.2 * delta;
      centralStar.rotation.x += 0.1 * delta;

      // Orbit planets
      planets.forEach((p) => {
        if (!isZooming || zoomTargetMesh !== p.mesh) {
          p.angle += p.config.orbitSpeed * delta;
          p.mesh.position.set(
            p.config.orbitRadius * Math.cos(p.angle),
            Math.sin(time * 2 + p.config.orbitRadius) * 0.8, // subtle waving amplitude
            p.config.orbitRadius * Math.sin(p.angle)
          );
        }
        p.mesh.rotation.y += 0.8 * delta;
      });

      // Slowly rotate background starfield
      starfield.rotation.y = time * 0.005;

      // Camera ZOOM transition LERP
      if (isZooming && targetZoom && zoomTargetMesh) {
        // Keep targetZoom locked to the moving planet
        targetZoom.copy(zoomTargetMesh.position);

        const zoomCamPos = new THREE.Vector3()
          .copy(targetZoom)
          .add(new THREE.Vector3(0, 5, 12)); // Offset above and behind planet

        camera.position.lerp(zoomCamPos, 0.06);
        camera.lookAt(targetZoom);

        if (camera.position.distanceTo(zoomCamPos) < 0.25) {
          cancelAnimationFrame(animationFrameId);
          setIsZooming(false);
          document.body.style.cursor = 'default';
          // Trigger callbacks safely
          if (callbackRef.current && clickedSubjectId.current) {
            callbackRef.current(clickedSubjectId.current);
          }
          return;
        }
      } else {
        // Floating camera effect in normal view
        camera.position.x = Math.sin(time * 0.1) * 6;
        camera.position.y = 35 + Math.cos(time * 0.15) * 3;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('mousemove', handleMouseMove);
        renderer.domElement.removeEventListener('click', handleCanvasClick);
      }
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [isZooming]);

  return (
    <div className="flex-1 flex flex-col items-center justify-start min-h-[90vh] py-6 px-4 select-none relative overflow-hidden bg-[#07080f]">
      
      {/* Abstract Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.01)_1px,_transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,_black,_transparent_80%)]" />

      {/* Main Container */}
      <div className="w-full max-w-5xl z-10 space-y-6 flex flex-col items-center">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl space-y-3 mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#c084fc] text-xs font-semibold uppercase tracking-wider animate-pulse">
            <GraduationCap size={14} />
            National Curriculum Framework (NCERT)
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Nirvik <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Interactive Room</span>
          </h1>
          <p className="text-text-secondary text-sm md:text-base max-w-xl mx-auto">
            Hover over the 3D planetary subject orbits and click to enter the specialized audiobook repository.
          </p>
        </div>

        {/* 3D WebGL Canvas Stage */}
        <div className="w-full relative aspect-[16/9] min-h-[420px] max-h-[580px] rounded-2xl border border-white/5 bg-[#0b0c15]/50 backdrop-blur-md overflow-hidden shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)]">
          <div ref={mountRef} className="absolute inset-0 w-full h-full" />
          
          {/* Orbital floating instructions */}
          <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/5 text-[11px] text-text-secondary">
            <Layers size={12} className="text-cyan-400" />
            <span>Volumetric WebGL Space System v2.0</span>
          </div>

          {/* Interactive Info Display Panel (Bottom-Left) */}
          <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex flex-col sm:flex-row justify-between items-end gap-4">
            
            {/* Dynamic Glass card updated by Three.js Hover Raycaster */}
            <div className={`p-5 rounded-xl border border-white/10 bg-black/75 backdrop-blur-lg w-full sm:max-w-md text-left transition-all duration-300 transform ${
              selectedSub ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
            }`}>
              {selectedSub && (
                <div className="space-y-2 pointer-events-auto">
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-xs font-bold uppercase px-2 py-0.5 rounded"
                      style={{ backgroundColor: `${selectedSub.color}22`, color: selectedSub.color }}
                    >
                      {selectedSub.name}
                    </span>
                    <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                      {selectedSub.active ? '🔵 SELECT SUBJECT' : '🔒 COMING SOON'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-wide">{selectedSub.subName}</h3>
                  <p className="text-text-secondary text-xs leading-relaxed">{selectedSub.desc}</p>
                  {selectedSub.active && (
                    <button 
                      onClick={() => onSelectSubject(selectedSub.id)}
                      className="mt-3 w-full flex items-center justify-center gap-1 py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-xs hover:from-cyan-300 hover:to-blue-400 transition-all shadow-[0_0_15px_rgba(102,252,241,0.3)] cursor-pointer"
                    >
                      Enter Chapter Library <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Standard directions overlay (Right) */}
            <div className="hidden sm:flex flex-col items-end gap-1.5 text-right font-mono text-[10px] text-text-secondary bg-black/40 backdrop-blur-sm p-3 rounded-lg border border-white/5">
              <span className="flex items-center gap-1"><Globe size={11} className="text-cyan-400" /> Use Mouse to scan stars</span>
              <span>Click highlighted spheres to navigate</span>
            </div>
          </div>
        </div>

        {/* Feature Index */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
          <div className="glass-panel p-6 space-y-2 text-left relative overflow-hidden group hover:border-[#66fcf1]/30">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all" />
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-accent-cyan">
              <BookOpen size={20} />
            </div>
            <h3 className="font-bold text-white text-sm">Full Kannada Syllabus</h3>
            <p className="text-text-secondary text-xs leading-relaxed">Contains all 11 Prose, Poetry, and Supplementary chapters compiled directly from Part 1 PDF source text.</p>
          </div>

          <div className="glass-panel p-6 space-y-2 text-left relative overflow-hidden group hover:border-purple-500/30">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all" />
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#c084fc]">
              <Award size={20} />
            </div>
            <h3 className="font-bold text-white text-sm">Solved Q&A Dictations</h3>
            <p className="text-text-secondary text-xs leading-relaxed">Integrated audio tracks playing correct readings of exercises, questions, and answers to reinforce listening retention.</p>
          </div>

          <div className="glass-panel p-6 space-y-2 text-left relative overflow-hidden group hover:border-amber-500/30">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all" />
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Compass size={20} />
            </div>
            <h3 className="font-bold text-white text-sm">Future Expandable</h3>
            <p className="text-text-secondary text-xs leading-relaxed">The WebGL planet orbit structure allows seamless future extensions for Mathematics, Science, and other class groups.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
