import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLocalContext } from '../../context/LocalContext';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { webinfo } = useLocalContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className={`clean-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <div className="logo" onClick={() => handleNavigate('/')}>
          <strong>{webinfo.name || 'DM Agency'}</strong>
        </div>

        <nav className="nav-links">
          {['/', '/services', '/our-strategies','/blogs','/about', '/contact'].map((path, i) => (
            <span
              key={path}
              className={location.pathname === path ? 'active' : ''}
              onClick={() => handleNavigate(path)}
            >
              {['Home', 'Services', 'Our Strategies','Blogs', 'About', 'Contact Us'][i]}
            </span>
          ))}
        </nav>

        <div className="right-actions">
          <button
            className="call-now-btn"
            onClick={() => window.location.href = `tel:${webinfo.phonecall}`}
          >
            <FaPhoneAlt />
            <span>{webinfo.phone}</span>
          </button>
          <div className="menu-toggle" onClick={() => setMenuOpen(true)}>
            <FaBars />
          </div>
        </div>
      </div>

      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <strong>{webinfo.name || 'DM Agency'}</strong>
          <FaTimes className="close-icon" onClick={() => setMenuOpen(false)} />
        </div>
        <div className="drawer-links">
          {['Home', 'Services', 'Our Strategies', 'Contact Us'].map((text, i) => (
            <span key={i} onClick={() => handleNavigate(['/', '/services', '/our-strategies', '/contact'][i])}>
              {text}
            </span>
          ))}
          <button
            className="drawer-call-btn"
            onClick={() => window.location.href = `tel:${webinfo.phonecall}`}
          >
            <FaPhoneAlt />
            <span>{webinfo.phone}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
