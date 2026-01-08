import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursor = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      );
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateCursor);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-[#E11D48] rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px) scale(${isPointer ? 1.5 : 1})`,
        }}
      />
      {/* Cursor ring */}
      <div
        className="fixed top-0 left-0 w-8 h-8 border border-[#E11D48] rounded-full pointer-events-none z-[9998] mix-blend-difference transition-all duration-300"
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isPointer ? 1.5 : 1})`,
        }}
      />
    </>
  );
}
