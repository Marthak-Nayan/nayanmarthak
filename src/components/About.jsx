import React from 'react'

const About = () => {
  return (
    <div>
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
        <div class="experience-section">
          <h2 class="experience-title">EXPERIENCE /</h2>
          <div class="experience-list">
            <div class="experience-item">
              <div class="experience-logo">
                <img src="/nayanmarthak/images/logo.png" alt="Nomos Insights Logo" />
              </div>
              <div class="experience-details">
                <div class="experience-header">
                  <h3 class="experience-university">Nomos Insights</h3>
                  <div class="experience-year">FEB'26 - Present</div>
                </div>
                <p class="experience-course">Software Engineer Intern</p>
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
  )
}

export default About
