import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import About from './components/About';
import Hero from './components/Hero';
import Services from './components/Services';
import Works from './components/Works';
import Navbar from './components/Navbar';
import Project from './components/Project';
import FloatingMenu from './components/FloatingMenu';
import GitHub from './components/Github';
import CursorEffects from './components/CursorEffects';
import Footer from './components/Footer';

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const scrollTimer = useRef(null);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  // ✅ Instantly restore scroll position on refresh without visible jumping
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Prevent browser from doing its own jumpy scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      container.scrollTop = parseInt(savedPosition, 10);
    }

    const savePosition = () => {
      sessionStorage.setItem('scrollPosition', container.scrollTop);
    };

    container.addEventListener('scroll', savePosition, { passive: true });
    return () => container.removeEventListener('scroll', savePosition);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      const footerSection = document.getElementById('contact');
      if (!homeSection) return;

      const scrollTop = container.scrollTop;
      const homeHeight = homeSection.offsetHeight;

      setShowMenu(scrollTop > homeHeight * 0.8);
      if (footerSection && scrollTop + container.clientHeight >= footerSection.offsetTop) {
        setShowMenu(false);
      }

      if (!isMenuOpen) {
        setHideMenu(false);
        if (scrollTimer.current) clearTimeout(scrollTimer.current);
        scrollTimer.current = setTimeout(() => setHideMenu(true), 2500);
      }


    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const scrollToSection = (sectionId) => {
    const container = containerRef.current;
    const element = document.getElementById(sectionId);
    if (!container || !element) return;
    setIsMenuOpen(false);
    const targetPosition = element.offsetTop - 80;
    const startPosition = container.scrollTop;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime = null;
    const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const animate = (now) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollTop = startPosition + distance * ease(progress);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setHideMenu(false);
  };

  return (
    <div
      ref={containerRef}
      className="scroll-container h-screen w-full overflow-y-scroll bg-[#f5f0e8] scroll-smooth"
    >
      <CursorEffects />
      <Navbar scrollToSection={scrollToSection} />
      <FloatingMenu scrollToSection={scrollToSection} showMenu={showMenu} />

      <Hero scrollToSection={scrollToSection} />

      <div
        ref={wrapperRef}
        className="rounded-t-[40px] sm:rounded-t-[60px] text-[#f5f0e8] transition-colors duration-1000 ease-out bg-[#0f172a]"
      >

        <Services />

        <Works />

        <Project />

        <About />
        <GitHub />
      </div>

      <div id="contact">
        <Footer scrollToSection={scrollToSection} />
      </div>

    </div>
  );
};

export default App;