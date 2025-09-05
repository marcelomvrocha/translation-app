import React, { useRef, useEffect, useState } from 'react';

interface ResizablePanelProps {
  children: React.ReactNode;
  direction: 'left' | 'right';
  onResize: (width: number) => void;
  initialWidth: number;
  minWidth?: number;
  maxWidth?: number;
  className?: string;
}

export default function ResizablePanel({ 
  children, 
  direction, 
  onResize, 
  initialWidth, 
  minWidth = 200, 
  maxWidth = 500,
  className = ''
}: ResizablePanelProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(initialWidth);
  const panelRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  useEffect(() => {
    setWidth(initialWidth);
  }, [initialWidth]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = direction === 'left' ? 'w-resize' : 'e-resize';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    
    const deltaX = e.clientX - startXRef.current;
    const newWidth = direction === 'left' 
      ? startWidthRef.current + deltaX
      : startWidthRef.current - deltaX;
    
    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
    setWidth(clampedWidth);
    onResize(clampedWidth);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, []);

  return (
    <div 
      ref={panelRef}
      className={`relative group ${className}`}
      style={{ width: `${width}px` }}
    >
      {children}
      
      {/* Resize handle */}
      <div
        className={`absolute top-0 bottom-0 w-1 cursor-${direction === 'left' ? 'w' : 'e'}-resize hover:bg-accent-blue/50 transition-all duration-200 ${
          direction === 'left' ? 'right-0' : 'left-0'
        } ${isResizing ? 'bg-accent-blue animate-resize-glow' : 'bg-transparent hover:bg-accent-blue/30'}`}
        onMouseDown={handleMouseDown}
      />
      
      {/* Resize indicator */}
      {isResizing && (
        <div className={`absolute top-0 bottom-0 w-0.5 bg-accent-blue ${
          direction === 'left' ? 'right-0' : 'left-0'
        } animate-pulse`} />
      )}
      
      {/* Hover indicator */}
      <div className={`absolute top-0 bottom-0 w-0.5 bg-accent-blue/0 group-hover:bg-accent-blue/20 transition-all duration-200 ${
        direction === 'left' ? 'right-0' : 'left-0'
      }`} />
    </div>
  );
}
