import React, { useState, useEffect } from "react";
import { Linkedin, Github, Mail, Instagram } from "lucide-react";
import "../Footer.css";

export default function Footer({ scrollToSection }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const menuItems = [
    { name: "Home", id: "navbar" },
    { name: "Service", id: "service" },
    { name: "Works", id: "works" },
    { name: "About", id: "about" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/marthaknayan59/",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/Marthak-Nayan",
    },
    {
      name: "Gmail",
      icon: Mail,
      url: "mailto:nayankhatri59@gmail.com",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/nayanmarthak_/",
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">
          <h3 className="footer-title">Menu</h3>
          <ul className="footer-menu">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className="menu-link"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <div>
            <h3 className="footer-title">Social</h3>
            <div className="social-links">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Time Section */}
          <div className="time-box">
            <span className="time">{formatTime(currentTime)}</span>
            <span className="date">{formatDate(currentTime)}</span>
            <span className="location">IST</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {currentTime.getFullYear()} Nayan Marthak. All rights reserved.
      </div>
    </footer>
  );
}