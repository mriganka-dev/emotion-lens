import { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  alpha: number;
}

// 68 anatomical facial landmark topology coordinates normalized to [-1, 1]
const FACIAL_TOPOLOGY_COORDS: readonly [number, number, number][] = [
  // Jawline (0 - 16)
  [-0.75, -0.2, 0.0], [-0.72, -0.4, 0.08], [-0.65, -0.6, 0.15], [-0.55, -0.78, 0.22],
  [-0.42, -0.92, 0.28], [-0.25, -1.02, 0.35], [-0.12, -1.08, 0.4], [0.0, -1.1, 0.42],
  [0.12, -1.08, 0.4], [0.25, -1.02, 0.35], [0.42, -0.92, 0.28], [0.55, -0.78, 0.22],
  [0.65, -0.6, 0.15], [0.72, -0.4, 0.08], [0.75, -0.2, 0.0],
  // Right Eyebrow (17 - 21)
  [-0.58, 0.38, 0.22], [-0.46, 0.48, 0.3], [-0.32, 0.5, 0.35], [-0.18, 0.45, 0.36], [-0.08, 0.36, 0.32],
  // Left Eyebrow (22 - 26)
  [0.08, 0.36, 0.32], [0.18, 0.45, 0.36], [0.32, 0.5, 0.35], [0.46, 0.48, 0.3], [0.58, 0.38, 0.22],
  // Nose Bridge & Tip (27 - 35)
  [0.0, 0.28, 0.38], [0.0, 0.12, 0.44], [0.0, -0.04, 0.52], [0.0, -0.18, 0.62],
  [-0.14, -0.22, 0.5], [-0.07, -0.25, 0.56], [0.0, -0.26, 0.58], [0.07, -0.25, 0.56], [0.14, -0.22, 0.5],
  // Right Eye (36 - 41)
  [-0.48, 0.22, 0.28], [-0.38, 0.28, 0.32], [-0.26, 0.27, 0.34],
  [-0.18, 0.2, 0.32], [-0.26, 0.16, 0.3], [-0.38, 0.16, 0.28],
  // Left Eye (42 - 47)
  [0.18, 0.2, 0.32], [0.26, 0.27, 0.34], [0.38, 0.28, 0.32],
  [0.48, 0.22, 0.28], [0.38, 0.16, 0.28], [0.26, 0.16, 0.3],
  // Outer Lips (48 - 59)
  [-0.32, -0.52, 0.42], [-0.2, -0.45, 0.48], [-0.08, -0.42, 0.52], [0.0, -0.44, 0.53],
  [0.08, -0.42, 0.52], [0.2, -0.45, 0.48], [0.32, -0.52, 0.42], [0.2, -0.62, 0.46],
  [0.08, -0.66, 0.48], [0.0, -0.67, 0.49], [-0.08, -0.66, 0.48], [-0.2, -0.62, 0.46],
  // Inner Lips (60 - 67)
  [-0.24, -0.52, 0.43], [-0.08, -0.5, 0.48], [0.0, -0.5, 0.49], [0.08, -0.5, 0.48],
  [0.24, -0.52, 0.43], [0.08, -0.54, 0.47], [0.0, -0.55, 0.48], [-0.08, -0.54, 0.47],
  // Forehead & Temple Shell
  [-0.5, 0.72, 0.1], [-0.25, 0.82, 0.2], [0.0, 0.86, 0.24], [0.25, 0.82, 0.2], [0.5, 0.72, 0.1],
  [-0.68, 0.1, 0.12], [0.68, 0.1, 0.12], [-0.4, -0.05, 0.28], [0.4, -0.05, 0.28]
];

// Triangulation wires connecting facial landmarks
const CONNECTIONS: readonly [number, number][] = [
  // Jawline
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14],
  // Eyebrows
  [15, 16], [16, 17], [17, 18], [18, 19],
  [20, 21], [21, 22], [22, 23], [23, 24],
  // Nose bridge
  [25, 26], [26, 27], [27, 28],
  [29, 30], [30, 31], [31, 32], [32, 33], [28, 31],
  // Eyes
  [34, 35], [35, 36], [36, 37], [37, 38], [38, 39], [39, 34],
  [40, 41], [41, 42], [42, 43], [43, 44], [44, 45], [45, 40],
  // Mouth
  [46, 47], [47, 48], [48, 49], [49, 50], [50, 51], [51, 52], [52, 53], [53, 54], [54, 55], [55, 56], [56, 57], [57, 46],
  // Structural cross filaments
  [19, 25], [20, 25], [17, 35], [22, 41], [37, 27], [40, 27], [28, 48], [28, 50],
  [3, 46], [11, 51], [68, 69], [69, 70], [70, 71], [71, 72]
];

export function EvolveBiometricVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Build particle points
    const points: Point3D[] = [];

    // 1. Primary facial landmark nodes
    for (let i = 0; i < FACIAL_TOPOLOGY_COORDS.length; i++) {
      const [x, y, z] = FACIAL_TOPOLOGY_COORDS[i];
      points.push({
        x: x * 180,
        y: -y * 180, // Invert Y for screen space
        z: z * 180,
        baseX: x * 180,
        baseY: -y * 180,
        baseZ: z * 180,
        vx: 0,
        vy: 0,
        vz: 0,
        size: i < 68 ? 2.2 : 1.6,
        color: i < 68 ? "#69beff" : "#8dd8ff",
        alpha: 0.9,
      });
    }

    // 2. Surrounding depth particle halo (Evolve signature particle drift)
    for (let i = 0; i < 90; i++) {
      const radius = 180 + Math.random() * 140;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      const px = radius * Math.cos(phi) * Math.sin(theta);
      const py = radius * Math.sin(phi);
      const pz = radius * Math.cos(phi) * Math.cos(theta);

      points.push({
        x: px,
        y: py,
        z: pz,
        baseX: px,
        baseY: py,
        baseZ: pz,
        vx: 0,
        vy: 0,
        vz: 0,
        size: Math.random() * 1.5 + 0.8,
        color: Math.random() > 0.3 ? "#4c97ff" : "#ff1f4a", // Cyan key with magenta rim accents
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    // Mouse coordinates and rotational inertia
    let targetYaw = 0.18; // Default 3D angle (matching Evolve rotationY: 24deg)
    let targetPitch = 0.0;
    let currentYaw = 0.18;
    let currentPitch = 0.0;
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;
      targetYaw = nx * 0.45;
      targetPitch = -ny * 0.35;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      targetYaw = 0.18;
      targetPitch = 0.0;
      isHovering = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth camera interpolation
      currentYaw += (targetYaw - currentYaw) * 0.06;
      currentPitch += (targetPitch - currentPitch) * 0.06;

      // Clear with pure transparent canvas over black background
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 420;

      // Idle harmonic float
      const floatY = Math.sin(time * 1.2) * 6;

      // Project 3D points to 2D screen coordinates
      const cosY = Math.cos(currentYaw);
      const sinY = Math.sin(currentYaw);
      const cosP = Math.cos(currentPitch);
      const sinP = Math.sin(currentPitch);

      const projected = points.map((p, idx) => {
        // Scatter physics when cursor is near
        if (isHovering && idx < 68) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.vx += (dx / dist) * force * 1.2;
            p.vy += (dy / dist) * force * 1.2;
          }
        }

        // Spring back to base position
        p.vx += (p.baseX - p.x) * 0.06;
        p.vy += (p.baseY - p.y) * 0.06;
        p.vz += (p.baseZ - p.z) * 0.06;
        p.vx *= 0.85;
        p.vy *= 0.85;
        p.vz *= 0.85;

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Rotate Y (Yaw)
        const x1 = p.x * cosY + p.z * sinY;
        const y1 = p.y;
        const z1 = -p.x * sinY + p.z * cosY;

        // Rotate X (Pitch)
        const x2 = x1;
        const y2 = y1 * cosP - z1 * sinP + floatY;
        const z2 = y1 * sinP + z1 * cosP + 480; // Distance offset

        const scale = fov / Math.max(z2, 10);
        const screenX = cx + x2 * scale;
        const screenY = cy + y2 * scale;

        return {
          screenX,
          screenY,
          scale,
          z2,
          color: p.color,
          alpha: p.alpha,
          size: p.size,
        };
      });

      // 1. Draw structural wireframe triangulation filaments
      ctx.lineWidth = 1;
      for (const [startIdx, endIdx] of CONNECTIONS) {
        if (startIdx < projected.length && endIdx < projected.length) {
          const p1 = projected[startIdx];
          const p2 = projected[endIdx];

          // Fade lines based on depth
          const avgZ = (p1.z2 + p2.z2) / 2;
          const lineAlpha = Math.max(0.04, Math.min(0.28, (600 - avgZ) / 500));

          ctx.strokeStyle = `rgba(105, 190, 255, ${lineAlpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.screenX, p1.screenY);
          ctx.lineTo(p2.screenX, p2.screenY);
          ctx.stroke();
        }
      }

      // 2. Draw glowing landmark vertices and particle field
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const r = Math.max(0.6, p.size * p.scale * 0.9);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, r, 0, Math.PI * 2);
        ctx.fill();

        // Extra subtle bloom ring for key facial landmarks
        if (i < 68 && i % 4 === 0) {
          ctx.strokeStyle = "rgba(141, 216, 255, 0.4)";
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, r * 2.2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative size-full pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="block size-full"
        style={{ cursor: "grab" }}
        aria-hidden="true"
      />
    </div>
  );
}
