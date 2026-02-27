const Navbar = ({ scrollToSection }) => {
  return (
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
  );
};

export default Navbar;
