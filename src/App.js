import React, { useState, useEffect, useRef } from 'react';
import Project from './components/project';
import './styles.css';
import Footer from './components/footer';
import About from './components/About';
import Hero from './components/Hero';
import FloatingMenu from './components/FloatingMenu';
import Services from './components/Services';
import Works from './components/Works';
import Navbar from './components/NavBar';

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState([0]);
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  let scrollTimer = useRef(null);

  const containerRef = useRef(null);

  const services = [
    {
      id: 1,
      number: "(01)",
      title: "Java Software Development",
      description: "Building robust backend systems and APIs using Java and related technologies. I focus on creating scalable, maintainable, and efficient solutions that meet business needs and drive innovation.",
      details: [
        "Spring Boot, Hibernate & JPA",
        "Spring Security & JWT Authentication",
        "RESTful APIs"
      ]
    },
    {
      id: 2,
      number: "(02)",
      title: "Full-Stack Development",
      description: "From frontend interfaces to backend services, I craft end-to-end solutions that deliver seamless user experiences. I leverage modern frameworks and best practices to build responsive, high-performance web applications.",
      details: [
        "React.js, Node.js & Express.js",
        "Next.js, JavaScript",
        "Git & GitHub, CI/CD"
      ]
    },
    {
      id: 3,
      number: "(03)",
      title: "Optimization",
      description: "Beyond handling data, I'm driven by the challenge of turning complex raw inputs into reliable, usable systems. I enjoy designing pipelines that power insights and apply core CS principles to build for scale, speed, and stability.",
      details: [
        "Data Structures & Algorithms",
        "DBMS, OOP, OS Fundamentals",
        "System Design Principles"
      ]
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const servicesSection = document.getElementById('servicesSection');
      const homeSection = document.getElementById('home');
      const footerSection = document.getElementById('contact');

      if (!servicesSection || !homeSection) return;

      const scrollTop = container.scrollTop;
      const homeHeight = homeSection.offsetHeight;

      // Show menu after scrolling past 80% of home section
      if (scrollTop > homeHeight * 0.8) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }

      if (scrollTop + container.clientHeight >= footerSection.offsetTop) {
        setShowMenu(false);
      }

      // ---- MODIFIED CODE: Don't hide menu when it's open ----
      if (!isMenuOpen) {
        setHideMenu(false);
        if (scrollTimer.current) clearTimeout(scrollTimer.current);
        scrollTimer.current = setTimeout(() => {
          setHideMenu(true);
        }, 2500);
      }
      // ------------------------


      const sectionTop = servicesSection.offsetTop;
      const sectionHeight = servicesSection.offsetHeight;
      const viewportHeight = container.clientHeight;

      const scrollIntoSection = scrollTop - sectionTop + viewportHeight / 2;
      const sectionProgress = Math.max(0, Math.min(1, scrollIntoSection / sectionHeight));

      const totalSections = services.length;
      const itemProgress = sectionProgress * totalSections;

      const currentActive = Math.min(
        Math.floor(itemProgress),
        totalSections - 1
      );

      const numVisible = Math.min(
        Math.ceil(itemProgress) || 1,
        totalSections
      );

      if (activeIndex !== currentActive) {
        setActiveIndex(currentActive);
      }

      const newVisibleItems = Array.from({ length: numVisible }, (_, i) => i);
      if (JSON.stringify(visibleItems) !== JSON.stringify(newVisibleItems)) {
        setVisibleItems(newVisibleItems);
      }
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, visibleItems, services.length, isMenuOpen]); // Added isMenuOpen dependency

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element && containerRef.current) {
      const container = containerRef.current;
      const elementTop = element.offsetTop;
      container.scrollTo({
        top: elementTop - 80,
        behavior: 'smooth'
      });
    }
    // Auto close menu after clicking
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Keep menu button visible when menu is open
    if (!isMenuOpen) {
      setHideMenu(false);
    }
  };

  return (

    <div className="container" ref={containerRef}>
      {/* Navbar */}
      <Navbar scrollToSection={scrollToSection} />


      {/* Floating Menu */}
      <FloatingMenu scrollToSection={scrollToSection} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} showMenu={showMenu} hideMenu={hideMenu} toggleMenu={toggleMenu} />

      {/* Hero Section */}
      <Hero  scrollToSection={scrollToSection}/>

      <div className="main-content">
        {/* Services */}
        <Services />

        {/* Services Details Section */}
        <div className="services-section" id="servicesSection">
          <div className="services-sticky">
            <div className="services-container">
              {services.map((service, index) => {
                const isActive = index === activeIndex;
                const isPast = index < activeIndex;
                const isVisible = visibleItems.includes(index);

                return (
                  <div key={service.id} className={`service-item ${isVisible ? 'visible' : ''}`}>
                    <div className="service-header">
                      <div className={`service-number ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}>
                        {service.number}
                      </div>
                      <div className="service-title-wrapper">
                        <h2 className={`service-title ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}>
                          {service.title}
                        </h2>
                      </div>
                      <div className={`check-icon ${isPast ? 'visible' : ''}`}>
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className={`service-content ${isActive ? 'active' : ''}`}>
                      <div className="service-content-inner">
                        <p className="service-description">{service.description}</p>
                        <div className="service-details">
                          {service.details.map((detail, i) => (
                            <div key={i} className={`detail-item ${isActive ? 'visible' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                              <span className="detail-number">0{i + 1}</span>
                              <span className="detail-text">{detail}</span>
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
        </div>


        {/* Works Section */}
        <Works />


        {/* Projects Section */}
        <div className="projects-section">
              <Project />
        </div>

        {/* About Section */}
        <div>
          <About />
        </div>
        
      </div>

      {/* Contact Section */}
      <div className="contact-section" id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default App;