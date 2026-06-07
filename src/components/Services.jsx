import { useEffect, useRef, useState } from 'react';
import TitleBlock from './TitleBlock';

const servicesData = [
  {
    id: 1,
    number: '01',
    title: 'Software Development',
    description: 'Architecting high-performance backend systems and enterprise APIs using the Java ecosystem. I focus on delivering scalable, secure, and maintainable architectures tailored to drive business logic and operational efficiency.',
    details: ['Spring Boot, Hibernate & JPA', 'Spring Security & JWT Authentication', 'RESTful APIs'],
  },
  {
    id: 2,
    number: '02',
    title: 'Full-Stack Development',
    description: 'Engineering end-to-end applications that bridge intuitive frontend interfaces with powerful backend services. I leverage modern frameworks to deliver seamless, responsive, and highly optimized user experiences.',
    details: ['React.js, Node.js & Express.js', 'Next.js, JavaScript', 'Git & GitHub, CI/CD'],
  },
  {
    id: 3,
    number: '03',
    title: 'Optimization & System Design',
    description: 'Applying core computer science principles to design resilient system architectures and optimize complex data pipelines. Dedicated to solving bottlenecks and ensuring systems operate with maximum scale, speed, and stability.',
    details: ['Data Structures & Algorithms', 'DBMS, OOP, OS Fundamentals', 'System Design Principles'],
  },
];

const Services = () => {
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [visibleRows, setVisibleRows] = useState([]);
  const [borderVisible, setBorderVisible] = useState(false);
  const ref = useRef(null);
  const hasTriggered = useRef(false);

  const timeoutsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          timeoutsRef.current.push(setTimeout(() => setBorderVisible(true), 300));

          if (!hasTriggered.current) {
            hasTriggered.current = true;
            servicesData.forEach((_, i) => {
              timeoutsRef.current.push(
                setTimeout(() => {
                  setVisibleRows((prev) => {
                    if (!prev.includes(i)) return [...prev, i];
                    return prev;
                  });
                }, i * 150)
              );
            });
          }
        } else if (entries[0].boundingClientRect.top > 0) {
          setVisible(false);
          setBorderVisible(false);
          hasTriggered.current = false;
          setVisibleRows([]);
          timeoutsRef.current.forEach(clearTimeout);
          timeoutsRef.current = [];
        }
      },
      { threshold: 0, rootMargin: '0px 0px -100px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <TitleBlock
        id="service"
        label="Services"
        heading="WHAT I DO/"
        description="I specialize in building Java-based applications — efficient, scalable, and user-friendly. Helping bring ideas to life for startups, businesses, and product teams."
      />

      <section ref={ref} className="w-full bg-transparent px-4 sm:px-8 lg:px-12 pt-4 pb-20 sm:pb-32">
        <div className="max-w-[1500px] mx-auto">
          {/* Top border */}
          <div className="w-full h-px bg-[#f5f0e8]/20" />

          {/* Services Rows (Project Style) */}
          <div className="flex flex-col">
            {servicesData.map((service, i) => {
              const isOpen = openIndex === i;
              const isVisibleRow = visibleRows.includes(i);

              return (
                <div
                  key={service.id}
                  className={`relative border-b border-[#f5f0e8]/20 transition-all duration-1000 ease-out
                    ${isVisibleRow ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-95 blur-sm'}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Watermark number */}
                  <span
                    className={`absolute right-0 top-1/2 -translate-y-1/2 font-extrabold leading-none select-none pointer-events-none transition-all duration-700 hidden sm:block
                      text-[80px] sm:text-[120px] lg:text-[160px]
                      ${isOpen
                        ? 'text-[#f5f0e8]/10 opacity-100 translate-x-0 scale-100'
                        : 'opacity-0 translate-x-4 scale-95'
                      }`}
                    style={{
                      maxWidth: '40%',
                      overflow: 'hidden',
                      WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
                      maskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
                    }}
                  >
                    {service.number}
                  </span>

                  {/* Row header */}
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center gap-3 sm:gap-6 py-5 sm:py-8 group text-left relative z-10"
                  >
                    {/* Number */}
                    <span
                      className={`text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-bold min-w-[28px] sm:min-w-[32px] transition-all duration-300
                        ${isOpen ? 'opacity-0 scale-95' : 'opacity-100 text-[#f5f0e8]/50 group-hover:text-[#f5f0e8]'}`}
                    >
                      {service.number}
                    </span>

                    {/* Title */}
                    <h3
                      className={`flex-1 font-extrabold tracking-tighter leading-tight transition-all duration-500
                        text-[clamp(18px,3.5vw,48px)]
                        ${isOpen ? 'text-[#f5f0e8]' : 'text-[#f5f0e8]/50'} group-hover:text-[#f5f0e8]`}
                    >
                      {service.title}
                    </h3>

                    {/* Circle toggle */}
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500
                        ${isOpen
                          ? 'border-[#f5f0e8] bg-[#f5f0e8] rotate-45'
                          : 'border-[#c5bdb2] bg-transparent'
                        } group-hover:border-[#f5f0e8]`}
                    >
                      <span
                        className={`text-base sm:text-xl font-light leading-none pb-0.5 transition-colors duration-300
                          ${isOpen ? 'text-[#0f172a]' : 'text-[#f5f0e8]/50 group-hover:text-[#f5f0e8]'}`}
                      >
                        +
                      </span>
                    </div>
                  </button>

                  {/* Expandable Content */}
                  <div
                    className={`overflow-hidden transition-all duration-700 ease-in-out
                      ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="pb-8 sm:pb-12 pl-8 sm:pl-14 pr-2 sm:pr-4 flex flex-col md:flex-row gap-8 sm:gap-12 items-start">

                      <p className="text-[#f5f0e8]/80 text-sm sm:text-base leading-relaxed flex-1 max-w-[480px]">
                        {service.description}
                      </p>

                      <div className="flex flex-col gap-3 flex-1">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-[#f5f0e8]/40 font-bold mb-2">Capabilities</span>
                        {service.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f5f0e8]/20 shrink-0" />
                            <span className="text-[#f5f0e8] text-sm font-medium tracking-wide">{detail}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};

export default Services;