import { useEffect, useRef, useState } from 'react';
import { STOPS } from './journeyData.js';
import TitleBlock from './TitleBlock';

const About = () => {
    const [visible, setVisible] = useState(false);
    const [skillsVisible, setSkillsVisible] = useState(false);
    const [journeyVisible, setJourneyVisible] = useState(false);

    const ref = useRef(null);
    const skillsRef = useRef(null);
    const journeyRef = useRef(null);

    useEffect(() => {
        // Reveal animations using IntersectionObserver
        const checkVisibility = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target === ref.current) setVisible(true);
                    if (entry.target === skillsRef.current) setSkillsVisible(true);
                    if (entry.target === journeyRef.current) setJourneyVisible(true);
                } else if (entry.boundingClientRect.top > 0) {
                    if (entry.target === ref.current) setVisible(false);
                    if (entry.target === skillsRef.current) setSkillsVisible(false);
                    if (entry.target === journeyRef.current) setJourneyVisible(false);
                }
            });
        };

        const observer = new IntersectionObserver(checkVisibility, { threshold: 0, rootMargin: '0px 0px -100px 0px' });
        if (ref.current) observer.observe(ref.current);
        if (skillsRef.current) observer.observe(skillsRef.current);
        if (journeyRef.current) observer.observe(journeyRef.current);

        return () => observer.disconnect();
    }, []);



    const skills = [
        {
            category: 'Languages & Databases',
            items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'PostgreSQL', 'MySQL', 'MongoDB'],
        },
        {
            category: 'Frameworks & APIs',
            items: ['Spring Boot & Security', 'Hibernate / JPA', 'FastAPI & REST APIs', 'React.js & Next.js', 'Lit', 'HTML / CSS'],
        },
        {
            category: 'Tools & Concepts',
            items: ['Git & GitHub', 'Azure DevOps', 'Docker & Linux', 'n8n', 'DSA', 'OOPs', 'SOLID Principles', 'JWT Auth & RBAC', 'Multithreading'],
        },
    ];



    return (
        <section id="about">

            {/* ── ABOUT ME ── */}
            <div ref={ref}>
                <TitleBlock label="About Me" heading="WHO I AM/" />
                <div className="w-full px-5 sm:px-10 lg:px-12 pb-16 sm:pb-24 lg:pb-32">
                    <div className="max-w-[1500px] mx-auto">
                        <div
                            className={`grid grid-cols-1 lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr] gap-10 sm:gap-14 lg:gap-20 items-start transition-all duration-1000 ease-out
              ${visible ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-95 blur-sm'}`}
                            style={{ transitionDelay: '200ms' }}
                        >

                            <div className="relative mx-auto lg:mx-0 w-full group" style={{ maxWidth: '400px' }}>

                                <div
                                    className="border border-[#f5f0e8]/25 group-hover:border-[#f5f0e8]/50 
                                transition-all duration-500 overflow-hidden 
                                rounded-t-[20px] rounded-b-none"
                                    style={{
                                        boxShadow: '0 4px 24px rgba(129,131,86,0.08)',
                                    }}
                                >
                                    <img
                                        src="/images/profile.jpg"
                                        alt="Nayan Marthak"
                                        className="w-full h-[300px] sm:h-[360px] lg:h-[440px] 
                                    object-cover block 
                                    grayscale-[20%] group-hover:grayscale-0 
                                    transition-all duration-700 
                                    group-hover:scale-105"
                                    />

                                </div>
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 pt-0 lg:pt-16">
                                <span className="text-[10px] tracking-[0.3em] uppercase text-[#f5f0e8] font-semibold">
                                    (About Me)
                                </span>
                                <div className="flex flex-col gap-5 sm:gap-6">
                                    <p className="text-[#a89f94] text-base sm:text-lg leading-relaxed">
                                        I'm Nayan Marthak — a curious and driven software developer
                                        from Rajkot, currently based in Vadodara. I enjoy turning
                                        complex problems into simple, reliable solutions and take
                                        pride in writing clean, maintainable code.
                                    </p>
                                    <p className="text-[#f5f0e8]/80 text-sm sm:text-base leading-relaxed border-l-2 border-[#f5f0e8] pl-4 sm:pl-5 italic">
                                        "Whatever I do, I do with all my heart and finish it.
                                        I believe in curiosity, continuous learning, and giving
                                        my best to everything I undertake."
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* ── SKILLS ── */}
            <div ref={skillsRef}>
                <TitleBlock label="Skills" heading="WHAT I KNOW/" bg="bg-transparent" />
                <div className="w-full bg-transparent px-5 sm:px-10 lg:px-12 pb-16 sm:pb-24 lg:pb-32">
                    <div className="max-w-[1500px] mx-auto -mt-6 sm:-mt-10 lg:-mt-12">
                        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start">
                            <div
                                className={`transition-all duration-1000 ease-out ${skillsVisible ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-95 blur-sm'}`}
                                style={{ transitionDelay: '150ms' }}
                            >
                                <h4 className="text-[clamp(1.8rem,4vw,3.5rem)] font-extrabold leading-tight tracking-tighter text-[#f5f0e8]">
                                    DEVELOPER<br />DESIGNER<br />CREATOR/
                                </h4>
                            </div>
                            <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-10">
                                {skills.map((cat, ci) => (
                                    <div
                                        key={cat.category}
                                        className={`flex flex-col transition-all duration-1000 ease-out ${skillsVisible ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-95 blur-sm'}`}
                                        style={{ transitionDelay: `${200 + ci * 100}ms` }}
                                    >
                                        <h5 className="text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#f5f0e8] font-semibold mb-3 sm:mb-6 pb-3 sm:pb-4 border-b border-[#f5f0e8]/20 leading-tight">
                                            {cat.category}
                                        </h5>
                                        <div className="flex flex-col">
                                            {cat.items.map((skill, si) => (
                                                <div
                                                    key={skill}
                                                    className={`transition-all duration-1000 ease-out ${skillsVisible ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-95 blur-sm'}`}
                                                    style={{ transitionDelay: `${300 + ci * 100 + si * 40}ms` }}
                                                >
                                                    <div className="text-[11px] sm:text-sm py-2 sm:py-3 border-b border-[#f5f0e8]/20 text-[#f5f0e8]/80 font-medium tracking-wide transition-all duration-300 hover:text-[#f5f0e8] hover:pl-2 sm:hover:pl-3 hover:border-[#f5f0e8] cursor-default">
                                                        {skill}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MY JOURNEY (Vertical Timeline) ── */}
            <div ref={journeyRef}>
                <TitleBlock label="Credentials" heading="WHAT I BRING/" bg="bg-transparent" />
                <div className="w-full bg-transparent px-5 sm:px-10 lg:px-12 pb-20 sm:pb-32 lg:pb-40">
                    <div className="max-w-[1500px] mx-auto relative -mt-6 sm:-mt-10 lg:-mt-12">

                        {/* Vertical Line */}
                        <div className="absolute left-[24px] sm:left-[32px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#f5f0e8]/10 to-transparent -translate-x-1/2" />

                        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-28 relative z-10 pt-2 pb-10">
                            {STOPS.map((s, i) => {
                                const isLeft = i % 2 === 0;

                                return (
                                    <div key={s.id} className={`relative flex flex-col md:flex-row items-start md:items-center w-full group transition-all duration-1000 ease-out ${journeyVisible ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-95 blur-sm'}`} style={{ transitionDelay: `${200 + i * 150}ms` }}>


                                        {/* Content Wrapper */}
                                        <div className={`w-full md:w-1/2 flex flex-col pl-16 sm:pl-24 md:pl-0 ${isLeft ? 'md:pr-16 lg:pr-24 items-start md:items-end text-left md:text-right' : 'md:pl-16 lg:pl-24 items-start text-left md:ml-auto'} pt-1 md:pt-0`}>
                                            <div className="inline-flex items-center gap-3 mb-3 sm:mb-4">
                                                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold px-3 py-1.5 rounded-full border border-[#f5f0e8]/10 bg-[#f5f0e8]/5 text-[#f5f0e8]/70 group-hover:border-[#818356]/40 group-hover:text-[#818356] transition-colors">{s.era}</span>
                                                <span className="text-[#818356] font-mono text-xs sm:text-sm font-bold tracking-widest">{s.yr}</span>
                                            </div>

                                            <div className={`flex items-center gap-4 sm:gap-5 mb-2 ${isLeft ? 'md:flex-row-reverse text-right md:text-right' : 'text-left'} w-full md:w-auto justify-start ${isLeft ? 'md:justify-start' : 'md:justify-start'}`}>
                                                {s.image && (
                                                    <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#151412] border border-[#f5f0e8]/10 overflow-hidden flex items-center justify-center shadow-lg group-hover:border-[#818356]/40 transition-colors">
                                                        <img
                                                            src={s.image}
                                                            alt={s.short}
                                                            className={`group-hover:scale-110 transition-transform duration-500 ${s.image.includes('unsplash') ? 'w-full h-full object-cover' : 'w-[80%] h-[80%] object-contain rounded-lg bg-white/5'}`}
                                                        />
                                                    </div>
                                                )}
                                                <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#f5f0e8] leading-tight group-hover:text-[#818356] transition-colors">{s.label}</h3>
                                            </div>

                                            <h4 className="text-[#f5f0e8]/70 text-sm sm:text-base font-semibold tracking-wide uppercase mb-4 sm:mb-5 mt-1">{s.short} <span className="text-[#f5f0e8]/30 mx-1 sm:mx-2">·</span> {s.loc}</h4>
                                            <p className="text-[#f5f0e8]/50 text-sm sm:text-base leading-relaxed max-w-lg">{s.desc}</p>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default About;