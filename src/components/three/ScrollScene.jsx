import { useEffect, useRef } from "react";
import * as THREE from "three";

// Brand-blue family only, so red / green / amber stay reserved for status.
const NODE_COLORS = [0x3b82f6, 0x0284c7, 0x1e40af]; // provider, solver, organization
const NODE_POSITIONS = [
  [-3.4, -1.8, 0],
  [3.4, -1.8, 0],
  [0, 3.2, 0],
];
const SEGMENTS_PER_EDGE = 60;
const STATIC_PROGRESS = 0.6; // used when the visitor prefers reduced motion

/**
 * Fixed full-screen background. As the page scrolls, the camera orbits and
 * dives toward three glowing nodes (provider, solver, organization) while the
 * lines that connect them are drawn in.
 */
export default function ScrollScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (err) {
      return undefined; // WebGL unavailable: the page works fine without the background
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    const world = new THREE.Group();
    scene.add(world);

    // 1. Particle field the camera flies through
    const COUNT = 1600;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 4 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(
      pointsGeo,
      new THREE.PointsMaterial({
        color: 0x1e40af,
        size: 0.05,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      })
    );
    world.add(points);

    // 2. Orbit ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(5.5, 0.015, 8, 160),
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.35 })
    );
    world.add(ring);

    // 3. The three role nodes
    const nodes = NODE_POSITIONS.map((pos, i) => {
      const node = new THREE.Group();
      node.position.set(...pos);
      node.add(
        new THREE.Mesh(
          new THREE.IcosahedronGeometry(0.75, 1),
          new THREE.MeshBasicMaterial({ color: NODE_COLORS[i], wireframe: true })
        )
      );
      node.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(0.3, 16, 16),
          new THREE.MeshBasicMaterial({ color: NODE_COLORS[i] })
        )
      );
      world.add(node);
      return node;
    });

    // 4. Connection lines, revealed progressively with scroll
    const vectors = NODE_POSITIONS.map((p) => new THREE.Vector3(...p));
    const path = [];
    [[0, 1], [1, 2], [2, 0]].forEach(([a, b]) => {
      for (let i = 0; i <= SEGMENTS_PER_EDGE; i++) {
        path.push(new THREE.Vector3().lerpVectors(vectors[a], vectors[b], i / SEGMENTS_PER_EDGE));
      }
    });
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(path),
      new THREE.LineBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.85 })
    );
    world.add(line);
    const totalPoints = path.length;

    let fit = 1; // pull the camera back on narrow screens
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      fit = camera.aspect < 0.8 ? 1.6 : camera.aspect < 1.2 ? 1.25 : 1;
      camera.updateProjectionMatrix();
    };

    const renderFrame = (p, t) => {
      camera.position.set(Math.sin(p * Math.PI * 1.5) * 4, Math.cos(p * Math.PI) * 1.5, (14 - p * 7) * fit);
      camera.lookAt(0, 0, 0);

      world.rotation.y = p * Math.PI * 2 + t * 0.05;
      world.rotation.x = Math.sin(p * Math.PI) * 0.35;
      points.rotation.y = -p * 1.2 + t * 0.02;
      ring.rotation.x = Math.PI / 2.4 + p * 2.2;
      ring.rotation.z = t * 0.06;

      nodes.forEach((n, i) => {
        n.rotation.x = t * 0.4 + i;
        n.rotation.y = t * 0.3 + i;
        n.scale.setScalar(1 + Math.sin(t * 1.5 + i * 2) * 0.06);
      });

      const reveal = THREE.MathUtils.clamp(p * 1.7, 0, 1);
      line.geometry.setDrawRange(0, Math.floor(reveal * totalPoints));

      renderer.render(scene, camera);
    };

    let target = 0;
    let current = 0;
    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    };

    const onResize = () => {
      resize();
      readScroll();
      if (reduceMotion) renderFrame(STATIC_PROGRESS, 0);
    };

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      current += (target - current) * 0.06; // ease toward the scroll position
      renderFrame(current, clock.getElapsedTime());
      raf = requestAnimationFrame(tick);
    };

    resize();
    readScroll();
    if (reduceMotion) {
      renderFrame(STATIC_PROGRESS, 0);
    } else {
      current = target;
      tick();
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", readScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", readScroll);
      scene.traverse((obj) => {
        obj.geometry?.dispose?.();
        if (obj.material) {
          (Array.isArray(obj.material) ? obj.material : [obj.material]).forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      renderer.forceContextLoss?.();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
