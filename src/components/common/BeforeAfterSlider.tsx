import React, { useState, useRef, useCallback, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Hiện trạng (Before)',
  afterLabel = 'AI Render (After)',
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const beforeLayerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const positionRef = useRef(50);
  const isDraggingRef = useRef(false);
  const rectRef = useRef<DOMRect | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pendingClientXRef = useRef<number | null>(null);

  const applyPosition = useCallback((pos: number) => {
    const clamped = Math.max(1, Math.min(99, pos));
    positionRef.current = clamped;

    if (beforeLayerRef.current) {
      beforeLayerRef.current.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    }
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${clamped}%, 0, 0)`;
    }
    if (containerRef.current) {
      containerRef.current.setAttribute('aria-valuenow', String(Math.round(clamped)));
    }
  }, []);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = rectRef.current || container.getBoundingClientRect();
      rectRef.current = rect;
      if (rect.width <= 0) return;

      const pct = ((clientX - rect.left) / rect.width) * 100;
      applyPosition(pct);
    },
    [applyPosition]
  );

  const scheduleUpdate = useCallback(
    (clientX: number) => {
      pendingClientXRef.current = clientX;
      if (rafIdRef.current !== null) return;

      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;
        if (pendingClientXRef.current !== null) {
          updateFromClientX(pendingClientXRef.current);
        }
      });
    },
    [updateFromClientX]
  );

  useEffect(() => {
    applyPosition(50);

    const handleResize = () => {
      rectRef.current = null;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [applyPosition]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    const container = containerRef.current;
    if (!container) return;

    rectRef.current = container.getBoundingClientRect();
    isDraggingRef.current = true;
    setIsDragging(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture is unavailable
    }

    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    scheduleUpdate(e.clientX);
  };

  const stopDragging = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (rafIdRef.current !== null) {
      window.cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (pendingClientXRef.current !== null) {
      updateFromClientX(pendingClientXRef.current);
      pendingClientXRef.current = null;
    }

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      applyPosition(positionRef.current - 3);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      applyPosition(positionRef.current + 3);
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label="So sánh trước và sau"
      aria-valuemin={1}
      aria-valuemax={99}
      aria-valuenow={50}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onKeyDown={handleKeyDown}
      onDragStart={(e) => e.preventDefault()}
      className={`relative w-full aspect-16/9 sm:aspect-16/10 rounded-2xl overflow-hidden select-none touch-none cursor-ew-resize border shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#D9C9A3] ${
        className.includes('border-') ? '' : 'border-[#302839]'
      } ${className.includes('bg-') ? '' : 'bg-black'} ${className}`}
    >
      {/* After image (full width behind) */}
      <img
        src={afterImage}
        alt="After AI Render"
        draggable={false}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        referrerPolicy="no-referrer"
      />

      {/* Before image (GPU-clipped with clip-path, zero layout reflow) */}
      <div
        ref={beforeLayerRef}
        className="absolute inset-0 pointer-events-none will-change-[clip-path]"
        style={{ clipPath: 'inset(0 50% 0 0)' }}
      >
        <img
          src={beforeImage}
          alt="Before Original"
          draggable={false}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-white text-[11px] font-bold tracking-wide uppercase border border-white/20">
          {beforeLabel}
        </div>
      </div>

      {/* After Label */}
      <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-md bg-[#0E1726]/85 backdrop-blur-md text-[#F1ECE2] text-[11px] font-bold tracking-wide uppercase border border-[#D9C9A3]/35 pointer-events-none">
        {afterLabel}
      </div>

      {/* GPU-translated vertical divider & handle track */}
      <div
        ref={trackRef}
        className="absolute inset-0 pointer-events-none z-20 will-change-transform"
        style={{ transform: 'translate3d(50%, 0, 0)' }}
      >
        <div className="absolute top-0 bottom-0 left-0 -translate-x-1/2 w-[2px] bg-white/95 shadow-[0_0_12px_rgba(0,0,0,0.45)]" />
        <div
          className={`absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.35)] border border-[#D9C9A3]/60 flex items-center justify-center text-[#0E1726] transition-transform duration-150 ${
            isDragging ? 'scale-110 ring-4 ring-[#D9C9A3]/35' : 'scale-100'
          }`}
        >
          <svg
            className="w-4 h-4 text-[#0E1726]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 3 12 9 6" />
          </svg>
        </div>
      </div>
    </div>
  );
};
