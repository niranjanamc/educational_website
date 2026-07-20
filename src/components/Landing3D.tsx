import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, GraduationCap, ChevronRight } from 'lucide-react';

interface Landing3DProps {
  onSelectSubject: (subjectId: string) => void;
}

interface Node3D {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  label: string;
  id: string;
  active: boolean;
  color: string;
}

export const Landing3D: React.FC<Landing3DProps> = ({ onSelectSubject }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // Star/Node definitions in a 3D orbital space
  const nodes: Node3D[] = [
    { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, label: 'Class 9 Portal', id: 'center', active: false, color: '#c084fc' },
    { x: -180, y: -60, z: 50, rx: 0, ry: 0, rz: 0, label: 'First Language Kannada', id: 'kannada', active: true, color: '#66fcf1' },
    { x: 180, y: 60, z: -50, rx: 0, ry: 0, rz: 0, label: 'Mathematics (Soon)', id: 'math', active: false, color: '#ff5e7e' },
    { x: -80, y: 150, z: -100, rx: 0, ry: 0, rz: 0, label: 'Science (Soon)', id: 'science', active: false, color: '#88ef9e' },
    { x: 80, y: -150, z: 100, rx: 0, ry: 0, rz: 0, label: 'Social Science (Soon)', id: 'social', active: false, color: '#ffd56b' },
    { x: -120, y: -120, z: -150, rx: 0, ry: 0, rz: 0, label: 'English (Soon)', id: 'english', active: false, color: '#45f3ff' },
    { x: 120, y: 120, z: 150, rx: 0, ry: 0, rz: 0, label: 'Hindi (Soon)', id: 'hindi', active: false, color: '#ffaa6b' },
  ];

  const rotationRef = useRef({ x: 0.003, y: 0.004 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 550);

    // Initialize node state positions
    const activeNodes = nodes.map(n => ({ ...n }));

    // Generate random background stars
    const backgroundStars = Array.from({ length: 150 }, () => ({
      x: (Math.random() - 0.5) * 1000,
      y: (Math.random() - 0.5) * 1000,
      z: Math.random() * 1000,
      size: Math.random() * 1.5 + 0.5,
    }));

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = 550;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;
      mouseRef.current = { x: mouseX, y: mouseY };
      
      // Check if mouse is hovering over a node
      let foundHover: string | null = null;
      for (const node of activeNodes) {
        if (node.id === 'center') continue;
        const dx = node.rx - mouseX;
        const dy = node.ry - mouseY;
        // Check hover distance based on perspective z-size
        const radius = Math.max(30, 40 * (400 / (400 + node.rz)));
        if (dx * dx + dx * dx + dy * dy < radius * radius) {
          foundHover = node.id;
          break;
        }
      }
      setHoveredNode(foundHover);
    };

    const handleCanvasClick = () => {
      if (hoveredNode) {
        const selectedNode = activeNodes.find(n => n.id === hoveredNode);
        if (selectedNode && selectedNode.active) {
          onSelectSubject(hoveredNode);
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleCanvasClick);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotate space slowly, influenced by mouse position
      const targetRotX = mouseRef.current.y * 0.00002;
      const targetRotY = mouseRef.current.x * 0.00002;
      rotationRef.current.x += (targetRotX - rotationRef.current.x) * 0.1;
      rotationRef.current.y += (targetRotY - rotationRef.current.y) * 0.1;

      const angleX = rotationRef.current.x;
      const angleY = rotationRef.current.y;

      const sinX = Math.sin(angleX), cosX = Math.cos(angleX);
      const sinY = Math.sin(angleY), cosY = Math.cos(angleY);

      // Draw background stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      backgroundStars.forEach(star => {
        // Rotate star coordinates
        let { x, y, z } = star;
        // Y-axis rotation
        let x1 = x * cosY - z * sinY;
        let z1 = z * cosY + x * sinY;
        // X-axis rotation
        let y2 = y * cosX - z1 * sinX;
        let z2 = z1 * cosX + y * sinX;

        // Apply constant spin to keep them moving
        star.x = x1;
        star.y = y2;
        star.z = z2;

        const fov = 400;
        const scale = fov / (fov + z2);
        const px = x1 * scale + width / 2;
        const py = y2 * scale + height / 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.arc(px, py, star.size * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Update and rotate Subject nodes
      activeNodes.forEach(node => {
        let { x, y, z } = node;

        // Spin around Y axis
        let x1 = x * cosY - z * sinY;
        let z1 = z * cosY + x * sinY;

        // Spin around X axis
        let y2 = y * cosX - z1 * sinX;
        let z2 = z1 * cosX + y * sinX;

        node.rx = x1;
        node.ry = y2;
        node.rz = z2;

        // Apply tiny continuous spin to coordinates for organic motion
        const speed = 0.005;
        node.x = x * Math.cos(speed) - z * Math.sin(speed);
        node.z = z * Math.cos(speed) + x * Math.sin(speed);
      });

      // Draw constellation link lines (connecting active subject to center)
      const centerNode = activeNodes.find(n => n.id === 'center');
      if (centerNode) {
        const centerFov = 400;
        const centerScale = centerFov / (centerFov + centerNode.rz);
        const cx = centerNode.rx * centerScale + width / 2;
        const cy = centerNode.ry * centerScale + height / 2;

        activeNodes.forEach(node => {
          if (node.id === 'center') return;
          const fov = 400;
          const scale = fov / (fov + node.rz);
          const px = node.rx * scale + width / 2;
          const py = node.ry * scale + height / 2;

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          
          const gradient = ctx.createLinearGradient(cx, cy, px, py);
          gradient.addColorStop(0, 'rgba(192, 132, 252, 0.1)');
          gradient.addColorStop(1, `${node.color}33`); // 33 is 20% opacity in hex
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = node.active ? 2 : 1;
          ctx.setLineDash(node.active ? [] : [4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        });
      }

      // Sort nodes by depth (z-index) so rendering overlays correctly (Painters algorithm)
      const sortedNodes = [...activeNodes].sort((a, b) => b.rz - a.rz);

      // Render actual 3D Node Spheres & Text Labels
      sortedNodes.forEach(node => {
        const fov = 400;
        const scale = fov / (fov + node.rz);
        const px = node.rx * scale + width / 2;
        const py = node.ry * scale + height / 2;
        const isHovered = hoveredNode === node.id;
        
        const baseRadius = node.id === 'center' ? 18 : 12;
        const radius = baseRadius * scale * (isHovered ? 1.4 : 1);

        // Bloom Glow Effect for Active Nodes
        if (node.active || node.id === 'center') {
          const glowGrad = ctx.createRadialGradient(px, py, radius, px, py, radius * 3);
          glowGrad.addColorStop(0, `${node.color}33`);
          glowGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(px, py, radius * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw Sphere Core
        const sphereGrad = ctx.createRadialGradient(
          px - radius * 0.3,
          py - radius * 0.3,
          radius * 0.1,
          px,
          py,
          radius
        );
        sphereGrad.addColorStop(0, '#ffffff');
        sphereGrad.addColorStop(0.3, node.color);
        sphereGrad.addColorStop(1, '#080810');

        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();

        // Node Label
        ctx.fillStyle = isHovered ? '#ffffff' : (node.active ? '#e5e7eb' : '#9ca3af');
        ctx.font = `${isHovered ? 'bold' : 'normal'} ${Math.max(10, Math.round(13 * scale))}px Outfit`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Glass label backdrop
        const textY = py + radius + 10;
        const textWidth = ctx.measureText(node.label).width + 16;
        const textHeight = 22;

        ctx.fillStyle = 'rgba(31, 40, 51, 0.7)';
        ctx.strokeStyle = isHovered ? node.color : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(px - textWidth / 2, textY - 4, textWidth, textHeight, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isHovered ? '#ffffff' : (node.active ? '#66fcf1' : '#c5c6c7');
        ctx.fillText(node.label, px, textY);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredNode, onSelectSubject]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 select-none relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--accent-purple)_0%,_transparent_70%)] opacity-[0.03]" />
      
      {/* Title Header */}
      <div className="text-center max-w-2xl z-10 space-y-4 mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(102,252,241,0.08)] border border-[rgba(102,252,241,0.2)] text-accent-cyan text-sm font-medium animate-pulse">
          <GraduationCap size={16} />
          NCERT Class 9 Learning Platform
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Immersive <span className="text-[#66fcf1] bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">3D Study Room</span>
        </h1>
        <p className="text-text-secondary text-sm md:text-base">
          Click on any active subject node in the constellation galaxy to access full audiobooks and solved exercises.
        </p>
      </div>

      {/* 3D Constellation Space */}
      <div className="w-full max-w-4xl relative aspect-[16/10] min-h-[400px] max-h-[550px] rounded-2xl glass-panel overflow-hidden border border-white/5 my-6 flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-pointer" />
        
        {/* Help tips overlay */}
        <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex justify-between text-xs text-text-secondary">
          <span>🌌 Hover to explore orbital nodes</span>
          <span className="text-accent-cyan font-medium animate-pulse">🔵 Active: First Language Kannada</span>
        </div>
      </div>

      {/* Course Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl z-10 mt-6">
        <div className="glass-panel p-5 space-y-2 text-left">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-accent-cyan">
            <BookOpen size={20} />
          </div>
          <h3 className="font-semibold text-white">Interactive Audiobooks</h3>
          <p className="text-text-secondary text-xs">Full chapter readings, beautifully recorded with proper Kannada accentuation and pauses.</p>
        </div>

        <div className="glass-panel p-5 space-y-2 text-left">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#c084fc]">
            <GraduationCap size={20} />
          </div>
          <h3 className="font-semibold text-white">Solved Q&A Audio</h3>
          <p className="text-text-secondary text-xs">Hear every textbook question solved step-by-step with synchronized text highlights.</p>
        </div>

        <div className="glass-panel p-5 space-y-2 text-left group cursor-pointer hover:border-cyan-500/30" onClick={() => onSelectSubject('kannada')}>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-semibold text-white">Quick Start Kannada</h3>
          <p className="text-text-secondary text-xs">Dive directly into the 11 completed Kannada chapters of Prose, Poetry, and Supplementary.</p>
        </div>
      </div>
    </div>
  );
};
