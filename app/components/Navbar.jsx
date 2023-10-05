"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaSearch, FaTimes, FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <nav className="nav" ref={navRef}>
        <Link href="/" className="logo_link">
          <div className="logo">
            <Image src="/Logo.svg" width={40} height={40} />
            <h1>FilmNet</h1>
          </div>
        </Link>

        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <li onClick={closeMenu}>
            <Link href="/" className={pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li onClick={closeMenu}>
            <Link
              href="/movie"
              className={pathname === "/movie" ? "active" : ""}
            >
              Movies
            </Link>
          </li>
          <li onClick={closeMenu}>
            <Link
              href="/tvshow"
              className={pathname === "/tvshow" ? "active" : ""}
            >
              Tv-Show
            </Link>
          </li>
        </ul>
        <div className="search">
          <Link href="/search">
            <FaSearch />
          </Link>
        </div>

        <div
          className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
