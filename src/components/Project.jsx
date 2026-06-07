import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLock } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    number: '01',
    title: 'TrackMailBox',
    type: 'Full Stack',
    year: '2026',
    description:
      'A real-time email tracking dashboard monitoring open status and link click events per recipient. Implemented pixel-based open tracking, unique link wrapping, and comprehensive analytics features to visualize per-email engagement accurately.',
    technologies: ['NextJs', 'TypeScript', 'OAuth2', 'TanStack', 'PostgreSQL'],
    link: '#',
    isCompany: true,
  },
  {
    id: 2,
    number: '02',
    title: 'Microsoft Web Components',
    type: 'Frontend',
    year: '2026',
    description:
      'Developed reusable and scalable web components for enterprise applications. Integrated within AEM-based applications for dynamic content rendering, created Storybook documentation, and collaborated through Azure DevOps to ensure cross-browser compatibility and optimized performance.',
    technologies: ['Lit', 'TypeScript', 'AEM', 'Storybook', 'Azure DevOps'],
    link: '#',
    isCompany: true,
  },
  {
    id: 3,
    number: '03',
    title: 'Automation Outreach',
    type: 'Full Stack',
    year: '2026',
    description:
      'A dynamic outreach automation platform with configurable integrations for SMTP, Apollo, ChatGPT, and Google services. Features background task management for bulk email processing, AI-based template generation, and cached Apollo enrichment to optimize API credits.',
    technologies: ['NextJs', 'Python', 'FastAPI', 'PostgreSQL', 'Apollo'],
    link: '#',
    isCompany: true,
  },
  {
    id: 4,
    number: '04',
    title: 'HireOS',
    type: 'Full Stack',
    year: '2026',
    description:
      'A comprehensive hiring automation platform managing the full recruitment workflow. Features a stage-gated pipeline where candidates auto-progress upon clearing tests, alongside multi-tenant RBAC, company-scoped data isolation, and real-time session management.',
    technologies: ['NextJs', 'JavaScript', 'OAuth2', 'TanStack', 'PostgreSQL'],
    link: '#',
  },
  {
    id: 5,
    number: '05',
    title: 'Support Desk',
    type: 'Full Stack',
    year: '2026',
    description:
      'An enterprise-grade ticketing platform designed to streamline customer support operations. Engineered with real-time WebSocket communication and Redis caching to ensure lightning-fast issue resolution and high availability.',
    technologies: ['Java', 'Spring Boot', 'WebSocket', 'Redis', 'Spring Security', 'JWT', 'PostgreSQL', 'React.js'],
    link: 'https://github.com/Marthak-Nayan/Support-Desk',
  },
  {
    id: 6,
    number: '06',
    title: 'TeamSpace',
    type: 'Full Stack',
    year: '2025',
    description:
      'A dynamic workspace designed to unify remote teams. Featuring real-time messaging and live video meetings, it provides a cohesive environment for project management and uninterrupted collaboration.',
    technologies: ['Next.js', 'React', 'MongoDB', 'Node.js', 'Socket.io', 'Tailwind CSS', 'GetStream.io'],
    link: 'https://github.com/Marthak-Nayan/TeamSpace',
  },
];

const Project = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [visibleRows, setVisibleRows] = useState([]);
  const ref = useRef(null);
  const hasTriggered = useRef(false);

  const timeoutsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!hasTriggered.current) {
            hasTriggered.current = true;
            projects.forEach((_, i) => {
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
    <section
      ref={ref}
      id="project"
      className="w-full bg-transparent px-4 sm:px-8 lg:px-12 pt-4 pb-20 sm:pb-32 scroll-mt-20"
    >
      <div className="max-w-[1500px] mx-auto">

        {/* Label */}
        <div
          className={`flex items-center gap-3 mb-10 sm:mb-16 transition-all duration-1000 ease-out
            ${visibleRows.length > 0 ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-8 scale-95 blur-sm'}`}
        >
          <div className="w-6 h-px bg-[#818356]" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#818356] font-semibold">
            Selected Projects
          </span>
        </div>

        {/* Top border */}
        <div className="w-full h-px bg-[#f5f0e8]/20" />

        {/* Project rows */}
        <div className="flex flex-col">
          {projects.map((project, i) => {
            const isOpen = openIndex === i;
            const isVisible = visibleRows.includes(i);

            return (
              <div
                key={project.id}
                className={`relative border-b border-[#f5f0e8]/20 transition-all duration-1000 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-95 blur-md'}`}
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
                  {project.number}
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
                    {project.number}
                  </span>

                  {/* Title */}
                  <h3
                    className={`flex-1 font-extrabold tracking-tighter leading-tight transition-all duration-500
                      text-[clamp(18px,3.5vw,48px)]
                      ${isOpen ? 'text-[#f5f0e8]' : 'text-[#f5f0e8]/50'} group-hover:text-[#f5f0e8]`}
                  >
                    {project.title}
                  </h3>

                  {/* Type + Year — hidden on small, shown md+ */}
                  <div className="hidden md:flex items-center gap-6 lg:gap-10">
                    <span
                      className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-300
                        ${isOpen ? 'text-[#f5f0e8]' : 'text-[#f5f0e8]/50'} group-hover:text-[#f5f0e8]/80`}
                    >
                      {project.type}
                    </span>
                    <span
                      className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-300
                        ${isOpen ? 'text-[#f5f0e8]/80' : 'text-[#f5f0e8]/50'} group-hover:text-[#f5f0e8]/80`}
                    >
                      {project.year}
                    </span>
                  </div>

                  {/* Type only on small screens */}
                  <span
                    className={`md:hidden text-[9px] tracking-[0.15em] uppercase font-medium transition-colors duration-300 shrink-0
                      ${isOpen ? 'text-[#f5f0e8]' : 'text-[#f5f0e8]/50'}`}
                  >
                    {project.type}
                  </span>

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

                {/* Expandable content */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out
                    ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="pb-8 sm:pb-12 pl-8 sm:pl-14 pr-2 sm:pr-4 flex flex-col md:flex-row gap-8 sm:gap-12 items-start">

                    {/* Description */}
                    <p className="text-[#f5f0e8]/80 text-sm sm:text-base leading-relaxed flex-1 max-w-[480px]">
                      {project.description}
                    </p>

                    {/* Right — tags + github */}
                    <div className="flex flex-col gap-4 sm:gap-6 w-full md:min-w-[220px] md:w-auto">

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 sm:px-3 py-1 border border-[#f5f0e8]/20 text-[#a89f94] text-[9px] sm:text-[10px] tracking-[0.15em] uppercase font-medium hover:border-[#f5f0e8] hover:text-[#f5f0e8] transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      {project.isCompany ? (
                        <div
                          className="inline-flex items-center gap-2 sm:gap-3 self-start px-4 sm:px-6 py-2.5 sm:py-3 border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 text-[#f5f0e8]/40 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold rounded-sm cursor-default"
                        >
                          <FaLock size={12} />
                          <span>Proprietary</span>
                        </div>
                      ) : (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn inline-flex items-center gap-2 sm:gap-3 self-start px-4 sm:px-6 py-2.5 sm:py-3 border border-[#f5f0e8] text-[#f5f0e8] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold overflow-hidden relative transition-all duration-300 hover:text-[#f5f0e8]"
                        >
                          <span className="absolute inset-0 bg-[#f5f0e8] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                          <FaGithub size={12} className="relative z-10" />
                          <span className="relative z-10">View Source</span>
                          <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                        </a>
                      )}

                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Project;