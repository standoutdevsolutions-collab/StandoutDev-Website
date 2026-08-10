// hooks/useMousePosition.js
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [normalized, setNormalized] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const latestEvent = useRef({ x: 0, y: 0 });
  const isUpdating = useRef(false);

  const updatePosition = useCallback(() => {
    const { x, y } = latestEvent.current;
    setPosition({ x, y });
    setNormalized({
      x: (x / window.innerWidth) * 2 - 1,
      y: -(y / window.innerHeight) * 2 + 1,
    });
    isUpdating.current = false;
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      latestEvent.current = { x: e.clientX, y: e.clientY };
      if (!isUpdating.current) {
        isUpdating.current = true;
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updatePosition]);

  return { position, normalized };
}