import React, { useEffect, useRef } from "react";

const EnhancedGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Animation variables
    let animationFrameId: number | undefined;
    let gridOffset = 0;
    const gridSize = 40;
    const animationSpeed = 0.2;

    // Grid drawing function
    function drawGrid() {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const bgGradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      bgGradient.addColorStop(0, "#1a0e2e");
      bgGradient.addColorStop(0.5, "#230f40");
      bgGradient.addColorStop(1, "#1a0e2e");

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create distant stars/particles
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        const opacity = Math.random() * 0.5 + 0.1;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }

      // Draw grid lines with perspective effect
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = gridOffset % gridSize; x < canvas.width; x += gridSize) {
        const gradient = ctx.createLinearGradient(x, 0, x, canvas.height);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.01)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.08)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.01)");

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = gradient;
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = gridOffset % gridSize; y < canvas.height; y += gridSize) {
        const gradient = ctx.createLinearGradient(0, y, canvas.width, y);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.01)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.08)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.01)");

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = gradient;
        ctx.stroke();
      }

      // Add subtle glow at intersections
      for (let x = gridOffset % gridSize; x < canvas.width; x += gridSize) {
        for (let y = gridOffset % gridSize; y < canvas.height; y += gridSize) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, 8);
          glow.addColorStop(0, "rgba(180, 120, 255, 0.1)");
          glow.addColorStop(1, "rgba(180, 120, 255, 0)");

          ctx.beginPath();
          ctx.fillStyle = glow;
          ctx.fillRect(x - 8, y - 8, 16, 16);
        }
      }

      // Animate grid movement
      gridOffset += animationSpeed;
      if (gridOffset > gridSize) {
        gridOffset = 0;
      }

      // Continue animation
      animationFrameId = requestAnimationFrame(drawGrid);
    }

    // Set canvas dimensions to match parent container
    function resizeCanvas() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        drawGrid(); // Redraw when resized
      }
    }

    // Initial resize
    resizeCanvas();

    // Add resize listener
    window.addEventListener("resize", resizeCanvas);

    // Start animation
    drawGrid();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: -1 }}
      />
      {/* Add a subtle noise texture overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default EnhancedGridBackground;
