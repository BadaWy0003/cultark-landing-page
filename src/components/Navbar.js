"use client";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";

function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement; // this is the <html> element
    if (theme === "dark") {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme, mounted]);

  if (!mounted) {
    return <button className={styles.themeSwitcher} aria-label="Toggle Dark Mode" disabled style={{opacity:0.5}}>...</button>;
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={styles.themeSwitcher}
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}

export default function Navbar() {
  return (
    <nav className={styles.navbar} >
      <div className={styles.logoArea}>
          {/* Light Mode Logo */}
          <Image
            src="/images/logo-light.png"
            alt="Cultark Logo Light"
            fill
            className={`${styles.logo} ${styles.logoLight}`}
            priority
          />

          {/* Dark Mode Logo */}
          <Image
            src="/images/logo-dark.png"
            alt="Cultark Logo Dark"
            fill
            className={`${styles.logo} ${styles.logoDark}`}
            priority
          />
      </div>
      <div className={styles.linksArea}>
        <a href="#" className={styles.link}>Home</a>
        <a href="#" className={styles.link}>About Us</a>
        <a href="#" className={styles.link}>case studies</a>
        <a href="#" className={styles.link}>services</a>
        <a href="#" className={styles.link}>blog</a>
        <a href="#" className={styles.link}>careers</a>
        </div>
        <div className="nav-theme-switcher-div">
          <ThemeSwitcher />
        </div>
        <div className="nav-contact-div">
          <a href="#contact" className={styles.contactButton}>Contact Us</a>
        </div>
    </nav>
  );
} 