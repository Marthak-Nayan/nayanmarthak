import React, { useState, useEffect } from 'react';
import { Linkedin, Github, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const menuItems = [
    { name: 'Home', id: 'navbar' },
    { name: 'Service', id: 'service' },
    { name: 'Works', id: 'works' },
    { name: 'About', id: 'about' }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/marthaknayan59/',
      color: '#0077b5'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Marthak-Nayan',
      color: '#333'
    },
    {
      name: 'Gmail',
      icon: Mail,
      url: 'mailto:nayankhatri59@gmail.com',
      color: '#EA4335'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/nayanmarthak_/',
      color: '#E4405F'
    }
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Left Section - Menu */}
        <div style={styles.leftSection}>
          <h3 style={styles.menuTitle}>Menu</h3>
          <ul style={styles.menuList}>
            {menuItems.map((item, index) => (
              <li key={index} style={styles.menuItem}>
                <a href={`#${item.id}`} style={styles.menuLink}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section - Social Links and Time */}
        <div style={styles.rightSection}>
          <div style={styles.socialSection}>
            <h3 style={styles.socialTitle}>Social</h3>
            <div style={styles.socialLinks}>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.socialLink}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.color;
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2c2c2c';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Icon size={20} color="#fff" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Date and Time */}
          <div style={styles.timeSection}>
            <div style={styles.timeDisplay}>
              <span style={styles.time}>{formatTime(currentTime)}</span>
              <span style={styles.date}>{formatDate(currentTime)}</span>
              <span style={styles.location}>IST</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar 
      <div style={styles.bottomBar}>
        <p style={styles.copyright}>
          © {currentTime.getFullYear()} Nayan Marthak. All rights reserved.
        </p>
      </div>*/}
    </footer>
  );
}

const styles = {
  footer: {
    color: '#fff',
    padding: '60px 40px 30px',
    width: '100%'
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '60px',
    marginBottom: '40px',
    flexWrap: 'wrap'
  },
  leftSection: {
    flex: '1',
    minWidth: '250px'
  },
  menuTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '25px',
    color: '#494949ff',
    letterSpacing: '1px'
  },
  menuList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  menuItem: {
    margin: 0
  },
  menuLink: {
    color: '#000000ff',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    position: 'relative',
    paddingBottom: '3px'
  },
  rightSection: {
    flex: '1',
    minWidth: '250px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    alignItems: 'flex-end'
  },
  socialSection: {
    textAlign: 'right'
  },
  socialTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '25px',
    color: '#494949ff',
    letterSpacing: '1px'
  },
  socialLinks: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'flex-end',
    flexWrap: 'wrap'
  },
  socialLink: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#2c2c2c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '2px solid #3a3a3a'
  },
  timeSection: {
    textAlign: 'right'
  },
  timeDisplay: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '20px 25px',
    background: '#1a1a1a',
    borderRadius: '15px',
    border: '1px solid #333'
  },
  time: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'monospace',
    letterSpacing: '2px'
  },
  date: {
    fontSize: '16px',
    color: '#888',
    fontWeight: '500'
  },
  location: {
    fontSize: '14px',
    color: '#a1a1a1',
    fontWeight: '600',
    letterSpacing: '1px'
  },
  bottomBar: {
    borderTop: '1px solid #333',
    paddingTop: '25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  copyright: {
    fontSize: '14px',
    color: '#666',
    margin: 0
  },
  madeWith: {
    fontSize: '14px',
    color: '#666',
    margin: 0
  },
  heart: {
    color: '#ff0000',
    fontSize: '16px'
  },
  '@media (maxWidth: 768px)': {
    footer: {
      padding: '40px 20px 20px'
    },
    container: {
      flexDirection: 'column',
      gap: '40px'
    },
    leftSection: {
      minWidth: '100%'
    },
    rightSection: {
      minWidth: '100%',
      alignItems: 'flex-start'
    },
    socialSection: {
      textAlign: 'left'
    },
    socialLinks: {
      justifyContent: 'flex-start'
    },
    timeSection: {
      textAlign: 'left',
      width: '100%'
    },
    bottomBar: {
      flexDirection: 'column',
      textAlign: 'center',
      gap: '10px'
    }
  }
};

// Add responsive styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @media (max-width: 768px) {
    footer {
      padding: 40px 20px 20px !important;
    }
  }
  
  a[style*="menuLink"]:hover {
    color: #fff !important;
    padding-left: 10px;
  }
  
  a[style*="menuLink"]:hover::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #fff;
  }
`;
document.head.appendChild(styleSheet);