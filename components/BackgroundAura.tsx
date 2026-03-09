
'use client';

import React, { useEffect, useRef } from 'react';

const BackgroundAura: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Characters for the matrix - using tech-focused binaries and hex
    const characters = '01 01 01 01 01 01 A B C D E F'.split('');
    const fontSize = 14;
    let columns = width / fontSize;

    // Array of drops - one per column
    // The value is the y-coordinate of the drop
    let drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * height; // Start at random heights to look natural immediately
    }

    const draw = () => {
      // Semi-transparent black to create the 'trail' effect
      ctx.fillStyle = 'rgba(2, 2, 2, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px Inter, monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = characters[Math.floor(Math.random() * characters.length)];

        // Calculate opacity based on depth (some columns are 'further back')
        const depth = (i % 3) === 0 ? 0.3 : (i % 2) === 0 ? 0.6 : 0.9;
        
        // Brand color: Royal Blue #3533cd (rgb: 53, 51, 205) with intermittent bright white heads
        if (Math.random() > 0.95) {
            ctx.fillStyle = `rgba(255, 255, 255, ${depth})`; // White lead
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ffffff';
        } else {
            ctx.fillStyle = `rgba(53, 51, 205, ${depth})`; // Deep royal blue
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#3533cd';
        }

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reset shadow for performance on non-glowing parts
        ctx.shadowBlur = 0;

        // Reset drop to top randomly to keep continuous flow
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    };

    // Animation loop
    let animationFrameId: number;
    // Throttle frame rate for a smoother, slightly slower "cinematic" matrix feel (approx 30fps)
    let lastTime = 0;
    const render = (time: number) => {
      if (time - lastTime > 35) { // ~30 fps
        draw();
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      columns = width / fontSize;
      // Adjust drops array length if resized
      const newDrops = [];
      for (let x = 0; x < columns; x++) {
        newDrops[x] = drops[x] !== undefined ? drops[x] : Math.random() * height;
      }
      drops = newDrops;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none bg-[#020202]">
      {/* Matrix Canvas Component */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-60"
      />
      
      {/* Intense dark vignette to blend the edges deeply into the content */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#000000_100%)] opacity-95" />
      
      {/* Subtle deep blue glow behind the matrix for brand feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-[#3533cd] opacity-[0.03] blur-[120px] mix-blend-screen pointer-events-none" />
    </div>
  );
};

export default BackgroundAura;
