import React, { useState, useEffect, useRef } from 'react';
import Project from './components/project';
import './styles.css';
import Footer from './components/footer';

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
      <nav id="navbar">
        <div className="nav-container">
          <div className="nav-title">Software Engineer</div>
          <ul className="nav-links">
            <li><button className="nav-link" onClick={() => scrollToSection('service')}>Service</button></li>
            <li><button className="nav-link" onClick={() => scrollToSection('works')}>Works</button></li>
            <li><button className="nav-link" onClick={() => scrollToSection('about')}>About</button></li>
            <li><button className="nav-link" onClick={() => scrollToSection('contact')}>Contact</button></li>
          </ul>
        </div>
      </nav>

      {/* Floating Menu Button */}
      <button
        className={`menu-toggle ${showMenu ? 'visible' : ''} ${isMenuOpen ? 'open' : ''} ${hideMenu && !isMenuOpen ? 'hide' : ''}`}
        onClick={toggleMenu}
      >

        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Floating Menu */}
      <div className={`floating-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="menu-item" onClick={() => scrollToSection('navbar')}>
          <span className="menu-number">01</span>
          <span className="menu-text">Home</span>
          <span className="menu-arrow">→</span>
        </button>
        <button className="menu-item" onClick={() => scrollToSection('service')}>
          <span className="menu-number">02</span>
          <span className="menu-text">Services</span>
          <span className="menu-arrow">→</span>
        </button>
        <button className="menu-item" onClick={() => scrollToSection('works')}>
          <span className="menu-number">03</span>
          <span className="menu-text">Works</span>
          <span className="menu-arrow">→</span>
        </button>
        <button className="menu-item" onClick={() => scrollToSection('about')}>
          <span className="menu-number">04</span>
          <span className="menu-text">About</span>
          <span className="menu-arrow">→</span>
        </button>
        <button className="menu-item" onClick={() => scrollToSection('contact')}>
          <span className="menu-number">05</span>
          <span className="menu-text">Contact</span>
          <span className="menu-arrow">→</span>
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`menu-overlay ${isMenuOpen ? 'visible' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      <section className="home" id="home">
        <section className="hero-section">
          <div className="name-container">
            <span className="firstname">NAYAN</span>
            <span className="lastname">MARTHAK</span>
          </div>
          <div className="home-bottom-left">
            <button className="contact-button" onClick={() => scrollToSection('contact')}>CONTACT</button>
          </div>

          <div className="home-center-image">
            <img src="/nayanmarthak/images/download.jpeg" alt="Profile" className="image-profile" />
          </div>

          <div className="home-bottom-right">
            <span className="availability"></span>
            <span className="availability-date"></span>
          </div>
        </section>
      </section>

      <div className="main-content">
        <section className="services" id="service">
          <span className="section-main-title">WHAT I DO/</span>
          <div className="services-content">
            <span className="service-label">(SERVICES)</span>
            <p className="service-text">
              I specialize in building Java-based applications that are efficient, scalable,
              and user-friendly. With a strong foundation in core and advanced Java technologies,
              I help bring ideas to life — whether it's for a startup, business, or product team.
            </p>
          </div>
          <div className="break-line"></div>
        </section>

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

        <section className="works" id="works">
          <span className="section-main-title-works">SELECTED WORKS/</span>
          <div className="services-content">
            <span className="service-label">(PROJECTS)</span>
            <p className="service-text">
              Thoughtfully crafted digital experiences that blend utility and aesthetics into something
              functional, memorable, and refined.
            </p>
          </div>
          <div className="break-line"></div>
        </section>
        <div className="projects-section">
              <Project />
        </div>

        <section class="about" id="about">
          {/*<span class="section-main-title-works">ABOUT ME/</span>*/}
          <div class="about-me" id="about-me">
            <div class="about-image">
              <img src="/nayanmarthak/images/profile.jpg" alt="About Me"></img>
            </div>
            <div class="about-text">
              <div class="about-details">
                <div class="about-label">
                  <span class="service-label">(ABOUT ME)</span>
                </div>
                <div class="about-content">
                  <p class="about-description">
                    I'm Nayan Marthak — a curious and driven software developer from Rajkot, currently based in Vadodara. I enjoy turning complex problems into simple, reliable solutions and take pride in writing clean, maintainable code.
                  </p> <br />
                  <p class="about-description">
                    "Whatever I do, I do with all my heart and finish it. I believe in curiosity, continuous learning, and giving my best to everything I undertake."
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="skills">
            <div class="about-container">
              <div class="left-section desktop-only">
                <h1 class="main-title">DEVELOPER<br />DESIGNER<br />CREATOR /</h1>
              </div>
              <div class="right-section">
                <h2 class="skills-header">Skills</h2>
                <div class="skills-grid">
                  <div class="skill-column">
                    <div class="skill-category">
                      <h3>Languages & Tools</h3>
                      <div class="skill-list">
                        <div>Java</div>
                        <div>SQL</div>
                        <div>JavaScript</div>
                        <div>Maven</div>
                        <div>Git</div>
                        <div>GitHub</div>
                        <div>Postman</div>
                        <div>PostgreSQL</div>
                        <div>MongoDB</div>
                        <div>Docker</div>
                      </div>
                    </div>
                  </div>
                  <div class="skill-column">
                    <div class="skill-category">
                      <h3>Frameworks & Libraries</h3>
                      <div class="skill-list">
                        <div>Spring Boot</div>
                        <div>Hibernate ORM</div>
                        <div>JPA</div>
                        <div>Spring Security</div>
                        <div>JWT</div>
                        <div>RESTful APIs</div>
                        <div>React</div>
                        <div>Next.js</div>
                        <div>Node.js</div>
                      </div>
                    </div>
                  </div>
                  <div class="skill-column">
                    <div class="skill-category">
                      <h3>Core Concepts</h3>
                      <div class="skill-list">
                        <div>DSA</div>
                        <div>OOP</div>
                        <div>DBMS</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="left-section mobile-only">
                <h1 class="main-title">DEVELOPER<br />DESIGNER<br />CREATOR /</h1>
              </div>
            </div>
          </div>
          <div class="education-section">
            <h2 class="education-title">EDUCATION /</h2>
            <div class="education-list">
              <div class="education-item">
                <div class="education-logo">
                  <img src="/nayanmarthak/images/svit.jpg" alt="SVIT Logo"></img>
                </div>
                <div class="education-details">
                  <h3 class="education-university">Sardar Vallabhbhai Patel Institute of Technology
                    (Affiliated: GTU), Vasad</h3>
                  <p class="education-course">Master of Computer Application</p>
                </div>
                <div class="education-year">2024 - 2026</div>
              </div>

              <div class="education-item">
                <div class="education-logo">
                  <img src="/nayanmarthak/images/atmiya.png" alt="Atmiya Logo"></img>
                </div>
                <div class="education-details">
                  <h3 class="education-university">Atmiya Institute of Technology & Science, Rajkot</h3>
                  <p class="education-course">Bachelor of Computer Application</p>
                </div>
                <div class="education-year">2021 - 2024</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="contact-section" id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default App;