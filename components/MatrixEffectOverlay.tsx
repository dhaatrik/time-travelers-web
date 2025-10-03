
import React, { useEffect, useRef } from 'react';

interface MatrixEffectOverlayProps {
  onClose: () => void;
  message?: string;
}

const MatrixEffectOverlay: React.FC<MatrixEffectOverlayProps> = ({ onClose, message }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const matrix = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0'; // Green text
      ctx.font = '15pt monospace';

      // Chinese characters, Katakana, numbers - or just use a subset
      const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const columns = Math.floor(canvas.width / 20); // Number of columns for the rain
      const drops: number[] = []; // y-coordinate of the drop in each column

      for (let x = 0; x < columns; x++) {
        drops[x] = 1 + Math.random() * canvas.height; // Random starting y-coordinate
      }

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'; // Slightly trails off
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0'; // Green
        ctx.font = '15px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          ctx.fillText(text, i * 20, drops[i] * 20);

          if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0; // Reset drop to top
          }
          drops[i]++; // Move drop down
        }
        animationFrameId = requestAnimationFrame(draw);
      };
      draw();
    };

    matrix(); // Initial call

    // Handle resize
    const handleResize = () => {
      cancelAnimationFrame(animationFrameId); // Stop previous animation
      matrix(); // Reinitialize with new dimensions
    };
    window.addEventListener('resize', handleResize);
    
    // Set a timeout to auto-close or allow manual close
    const closeTimer = setTimeout(onClose, 15000); // Auto-close after 15 seconds

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div className="matrix-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Matrix effect overlay">
      <canvas ref={canvasRef}></canvas>
      {message && <div className="matrix-message">{message}</div>}
    </div>
  );
};

export default MatrixEffectOverlay;
