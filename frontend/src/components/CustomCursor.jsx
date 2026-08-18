import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState([]);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const trailRef = useRef(null);
  const clickBadgeRef = useRef(null);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      // Show CLICK badge below cursor
      if (clickBadgeRef.current) {
        clickBadgeRef.current.style.opacity = '1';
        clickBadgeRef.current.style.transform = 'translate(-50%, 20px) scale(1)';
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      if (clickBadgeRef.current) {
        clickBadgeRef.current.style.opacity = '0';
        clickBadgeRef.current.style.transform = 'translate(-50%, 20px) scale(0.8)';
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      createRipple(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const createRipple = (x, y) => {
      const id = Date.now();
      const newRipple = {
        id,
        x,
        y,
        size: 0,
        maxSize: 50,
        opacity: 1,
      };
      setRipples(prev => [...prev, newRipple]);

      const interval = setInterval(() => {
        setRipples(prev => 
          prev.map(ripple => {
            if (ripple.id === id) {
              const newSize = ripple.size + 2;
              const newOpacity = 1 - (newSize / ripple.maxSize);
              return {
                ...ripple,
                size: newSize,
                opacity: newOpacity > 0 ? newOpacity : 0,
              };
            }
            return ripple;
          })
        );
      }, 16);

      setTimeout(() => {
        clearInterval(interval);
        setRipples(prev => prev.filter(ripple => ripple.id !== id));
      }, 500);
    };

    document.addEventListener('mousemove', updatePosition);
    
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"], .interactive, [onclick]'
    );
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${position.x - 12}px, ${position.y - 12}px) scale(${isHovering ? 1.8 : 1})`;
      cursorRef.current.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
      cursorRef.current.style.borderColor = isHovering ? 'rgba(245, 158, 11, 1)' : 'rgba(245, 158, 11, 0.8)';
      cursorRef.current.style.boxShadow = isHovering 
        ? '0 0 30px rgba(245, 158, 11, 0.4), 0 0 60px rgba(245, 158, 11, 0.2)' 
        : '0 0 15px rgba(245, 158, 11, 0.2)';
    }
    if (cursorDotRef.current) {
      cursorDotRef.current.style.transform = `translate(${position.x - 3}px, ${position.y - 3}px) scale(${isClicking ? 0.3 : 1})`;
      cursorDotRef.current.style.transition = 'transform 0.1s ease';
    }
    if (trailRef.current) {
      trailRef.current.style.transform = `translate(${position.x - 18}px, ${position.y - 18}px) scale(${isHovering ? 1.5 : 1})`;
      trailRef.current.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      trailRef.current.style.borderColor = isHovering ? 'rgba(245, 158, 11, 0.3)' : 'rgba(245, 158, 11, 0.15)';
    }
    if (clickBadgeRef.current) {
      clickBadgeRef.current.style.left = position.x + 'px';
      clickBadgeRef.current.style.top = position.y + 'px';
    }
  }, [position, isHovering, isClicking]);

  return (
    <>
      {/* Trail Ring */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9998,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(245, 158, 11, 0.15)',
          top: 0,
          left: 0,
          willChange: 'transform',
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease',
        }}
      />

      {/* Main Cursor Ring */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          width: isHovering ? '0px' : '24px',
          height: isHovering ? '0px' : '24px',
          borderRadius: '50%',
          border: isHovering ? '0px' : '2px solid rgba(245, 158, 11, 0.8)',
          top: 0,
          left: 0,
          willChange: 'transform',
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease, box-shadow 0.3s ease, width 0.3s ease, height 0.3s ease, border 0.3s ease',
          boxShadow: isHovering ? 'none' : '0 0 15px rgba(245, 158, 11, 0.2)',
          opacity: isHovering ? 0 : 1,
        }}
      >
        {/* Rotating dash effect */}
        {!isHovering && (
          <>
            <div
              style={{
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
                borderRadius: '50%',
                border: '2px solid transparent',
                borderTopColor: 'rgba(245, 158, 11, 0.9)',
                borderRightColor: 'rgba(245, 158, 11, 0.3)',
                animation: 'spin 2s linear infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '40%',
                height: '40%',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.6), transparent)',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
          </>
        )}
      </div>

      {/* Click Icon - Smaller and subtle on hover */}
      {isHovering && (
        <div
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 9999,
            left: position.x - 10,
            top: position.y - 10,
            fontSize: '18px',
            animation: 'bounceIn 0.3s ease',
            filter: 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.3))',
            transform: 'scale(1)',
            transition: 'transform 0.2s ease',
            opacity: 0.9,
          }}
        >
          
        </div>
      )}

      {/* Inner Dot */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 10000,
          width: isHovering ? '0px' : '6px',
          height: isHovering ? '0px' : '6px',
          borderRadius: '50%',
          background: isHovering ? 'transparent' : 'radial-gradient(circle at 35% 35%, #fcd34d, #f59e0b)',
          top: 0,
          left: 0,
          willChange: 'transform',
          transition: 'transform 0.1s ease, width 0.3s ease, height 0.3s ease, background 0.3s ease',
          boxShadow: isHovering ? 'none' : '0 0 20px rgba(245, 158, 11, 0.6), 0 0 40px rgba(245, 158, 11, 0.2)',
          opacity: isHovering ? 0 : 1,
        }}
      />

      {/* CLICK Badge - Shows below cursor in button style */}
      <div
        ref={clickBadgeRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 10001,
          color: 'black',
          fontSize: '10px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          padding: '3px 10px',
          borderRadius: '16px',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          opacity: 0,
          transform: 'translate(-50%, 20px) scale(0.8)',
          transition: 'opacity 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 15px rgba(245, 158, 11, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
        }}
      >
        
        CLICK
      </div>

      {/* Click Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 9997,
            borderRadius: '50%',
            border: '2px solid rgba(245, 158, 11, 0.5)',
            top: ripple.y - ripple.size / 2,
            left: ripple.x - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            opacity: ripple.opacity,
            transform: 'scale(1)',
            transition: 'none',
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.15)',
          }}
        />
      ))}

      {/* Click Icon Popup */}
      {isClicking && (
        <div
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 10002,
            left: position.x + 20,
            top: position.y - 20,
            fontSize: '16px',
            animation: 'clickPop 0.5s ease forwards',
            filter: 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.4))',
          }}
        >
          ✦
        </div>
      )}

      {/* CSS Animations */}
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 0.4;
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1.5);
            }
          }
          
          @keyframes clickPop {
            0% {
              opacity: 1;
              transform: scale(0.5) rotate(0deg) translateY(0);
            }
            100% {
              opacity: 0;
              transform: scale(1.5) rotate(180deg) translateY(-30px);
            }
          }
          
          @keyframes bounceIn {
            0% {
              transform: scale(0);
            }
            50% {
              transform: scale(1.2);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              transform: scale(1);
            }
          }
          
          /* Hide default cursor */
          * {
            cursor: none !important;
          }
          
          /* Show cursor on mobile/tablet */
          @media (max-width: 768px) {
            * {
              cursor: auto !important;
            }
            div[style*="pointer-events: none"] {
              display: none !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default CustomCursor;