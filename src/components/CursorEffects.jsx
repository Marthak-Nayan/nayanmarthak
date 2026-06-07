import { useEffect, useRef, useState } from 'react';

const CursorEffects = () => {
  const overlayRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    setIsDesktop(isFine);
    if (!isFine) return;
    
    const mouse = { x: window.innerWidth / 2, y: -100 };
    const dotPos = { x: window.innerWidth / 2, y: -100 };
    let requestRef;
    let isHovering = false;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.opacity = '1';
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = '1';
      }
      if (overlayRef.current) {
        overlayRef.current.style.background = `radial-gradient(800px circle at ${e.clientX}px ${e.clientY}px, rgba(129,131,86,0.06), transparent 40%)`;
      }
      
      const target = e.target;
      if (
        target?.tagName?.toLowerCase() === 'a' || 
        target?.tagName?.toLowerCase() === 'button' || 
        target?.closest?.('a') || 
        target?.closest?.('button') ||
        target?.classList?.contains('clickable')
      ) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      if (overlayRef.current) overlayRef.current.style.background = 'none';
    };

    const animate = () => {
      dotPos.x += (mouse.x - dotPos.x) * 0.15;
      dotPos.y += (mouse.y - dotPos.y) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) scale(${isHovering ? 1.5 : 1})`;
        ringRef.current.style.backgroundColor = isHovering ? 'rgba(129,131,86,0.1)' : 'transparent';
        if (isHovering) {
            ringRef.current.style.borderColor = 'transparent';
        } else {
            ringRef.current.style.borderColor = '#818356';
        }
      }
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;
      }
      
      requestRef = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    requestRef = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef) cancelAnimationFrame(requestRef);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      {/* Spotlight Overlay */}
      <div 
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[40] transition-opacity duration-300"
      />
      
      {/* Cursor Ring */}
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-[#818356] pointer-events-none z-[9999] opacity-0"
        style={{ 
            mixBlendMode: 'difference', 
            transition: 'opacity 0.3s ease, background-color 0.2s ease, border-color 0.2s ease' 
        }}
      />
      
      {/* Cursor Dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#818356] pointer-events-none z-[10000] opacity-0"
        style={{ 
            mixBlendMode: 'difference', 
            transition: 'opacity 0.3s ease' 
        }}
      />
      
      <style>{`
        @media (pointer: fine) {
          body * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CursorEffects;
