import React from 'react'

const FloatingMenu = ({ scrollToSection, setIsMenuOpen, isMenuOpen, showMenu, hideMenu, toggleMenu }) => {
    return (
        <div>
            <button
                className={`menu-toggle ${showMenu ? 'visible' : ''} ${isMenuOpen ? 'open' : ''} ${hideMenu && !isMenuOpen ? 'hide' : ''}`}
                onClick={toggleMenu}
            >

                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>
            
            <div className={`floating-menu ${isMenuOpen ? 'open' : ''}`}>
                <button className="menu-item" onClick={() => scrollToSection('home')}>
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
            <div
                className={`menu-overlay ${isMenuOpen ? 'visible' : ''}`}
                onClick={() => setIsMenuOpen(false)}
            ></div>
        </div>
    )
}

export default FloatingMenu
