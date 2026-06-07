import { useEffect, useRef, useState } from 'react';

const TitleBlock = ({ id, label, heading, description, bg = 'bg-transparent' }) => {
  const [visible, setVisible] = useState(false);
  const [borderVisible, setBorderVisible] = useState(false);
  const ref = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          timeoutRef.current = setTimeout(() => setBorderVisible(true), 300);
        } else if (entries[0].boundingClientRect.top > 0) {
          setVisible(false);
          setBorderVisible(false);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -100px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section ref={ref} id={id} className={`w-full relative ${bg} ${id ? 'scroll-mt-20' : ''}`}>
      {/* Left strip */}
      <div className="absolute top-[15%] left-0 h-[70%] flex pointer-events-none z-0">
        <div className={`w-3 sm:w-6 ${bg} h-full`} />
        <div
          className="w-[2px] bg-gradient-to-b from-transparent via-[#818356] to-transparent transition-all duration-1000 ease-out"
          style={{
            opacity: borderVisible ? 1 : 0,
            transform: borderVisible ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top',
          }}
        />
      </div>

      {/* Right strip */}
      <div className="absolute top-[15%] right-0 h-[70%] flex pointer-events-none z-0">
        <div
          className="w-[2px] bg-gradient-to-b from-transparent via-[#818356] to-transparent transition-all duration-1000 ease-out"
          style={{
            opacity: borderVisible ? 1 : 0,
            transform: borderVisible ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top',
            transitionDelay: '150ms',
          }}
        />
        <div className={`w-3 sm:w-6 ${bg} h-full`} />
      </div>

      {/* Content padding standardized */}
      <div className="px-8 sm:px-16 lg:px-20 pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-16 relative z-10">
        <div className="max-w-[1500px] mx-auto">
          
          {/* Label */}
          <div
            className={`flex items-center gap-3 mb-8 sm:mb-12 transition-all duration-700 ease-out
              ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
          >
            <div
              className="h-px bg-[#818356] transition-all duration-700 ease-out"
              style={{ width: visible ? '24px' : '0px', transitionDelay: '200ms' }}
            />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#818356] font-semibold">
              {label}
            </span>
          </div>

          {/* Heading */}
          <div className="overflow-hidden mb-6 sm:mb-8">
            <h2
              className={`text-[clamp(40px,8vw,100px)] font-extrabold leading-none tracking-tighter text-[#f5f0e8] transition-all duration-1000 ease-out
                ${visible ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-95 blur-sm'}`}
              style={{ transitionDelay: '100ms' }}
            >
              {heading}
            </h2>
          </div>

          {/* Divider */}
          <div
            className={`flex items-center gap-4 mb-8 sm:mb-10 transition-all duration-1000 ease-out
              ${visible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
            style={{ transformOrigin: 'left', transitionDelay: '200ms' }}
          >
            <div className="w-2 h-2 rounded-full bg-[#818356] shrink-0" />
            <div className="flex-1 h-px bg-[#818356]/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#818356]/40 shrink-0" />
            <div className="w-1 h-1 rounded-full bg-[#818356]/20 shrink-0" />
          </div>

          {/* Description (Optional) */}
          {description && (
            <div
              className={`flex justify-end transition-all duration-700 ease-out
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <p className="text-[#f5f0e8]/80 text-sm sm:text-base leading-relaxed max-w-[280px] sm:max-w-[400px] text-right">
                {description}
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default TitleBlock;
