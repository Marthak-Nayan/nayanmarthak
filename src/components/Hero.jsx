const Hero = ({ scrollToSection }) => {
  return (
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
            <span className="availability">Software Engineer <br/> Intern  at Nomos Insights</span>
            <span className="availability-date">FEB'26</span>
          </div>
        </section>
      </section>
  );
};

export default Hero;
