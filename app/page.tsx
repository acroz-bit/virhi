"use client";

import { useEffect, useRef, useState } from "react";

const links = ["Home", "Products", "About Us", "Get in Touch"];

export default function Home() {
  const track = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [behind, setBehind] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = track.current;
      const element = scene.current;
      if (!section || !element) return;
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = reducedMotion.matches ? 1 : Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance));
      element.style.setProperty("--progress", progress.toFixed(4));
      setBehind((previous) => progress > 0.45 ? true : progress < 0.38 ? false : previous);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reducedMotion.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reducedMotion.removeEventListener("change", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }), { threshold: 0.18 });
    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const nav = <>{links.map((label) => <a href={label === "Home" ? "#home" : `#${label.toLowerCase().replaceAll(" ", "-")}`} key={label} onClick={() => setMenuOpen(false)}>{label}</a>)}</>;

  return <main>
    <section className="hero-track" id="home" ref={track}>
      <div className="hero-scene" ref={scene}>
        <div className="hero-background" aria-hidden="true" />
        <div className="hero-warmth" aria-hidden="true" />
        <header className="navbar">
          <a className="wordmark" href="#home" aria-label="Vrihi home">VRIHI<span>.</span></a>
          <nav className="desktop-nav" aria-label="Primary navigation">{nav}</nav>
          <button className={`menu-button ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}><i /><i /></button>
          <nav className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation">{nav}</nav>
        </header>

        <div className={`hero-logo-wrap ${behind ? "is-behind" : ""}`} aria-label="Vrihi">
          <div className="hero-logo">VRIHI</div>
        </div>
        <div className="plant-layer plant-layer--front" aria-hidden="true" />
        <p className={`hero-slogan ${behind ? "is-visible" : ""}`}>farming without compromise..</p>
        <div className="scroll-cue" aria-hidden="true"><span>Scroll to explore</span><i /></div>
      </div>
    </section>

    <section className="vrihi-intro" id="about-us">
      <div className="intro-copy" data-reveal>
        <p className="section-index">01 / THE VRIHI WAY</p>
        <h1>Vrihi sits where <em>agriculture</em> and waste management meet.</h1>
        <p>We take resources that are usually discarded and often burned and turn them into something a farm can actually use. Every product we make starts from the same question: how do we support a good harvest without asking the environment to foot the bill.</p>
      </div>
      <div className="intro-image" data-reveal aria-label="Rice straw collected for reuse"><div className="intro-image__plant" /></div>
      <div className="intro-note" data-reveal>That question is what pushes us toward newer agricultural practices — ones built around reducing waste&apos;s impact on the environment, not just managing it after the fact.</div>
      <p className="belief" data-reveal>Because we believe <em>“a good harvest shouldn&apos;t come at earth&apos;s expense.”</em></p>
    </section>

    <section className="product-section" id="products">
      <div className="product-heading" data-reveal><p className="section-index">OUR FIRST PRODUCT</p><h2>Straw mulch does the job plastic does — <em>and gives more back.</em></h2></div>
      <div className="product-feature" data-reveal>
        <div className="product-photo"><div className="product-photo__straw" /><span>From rice straw<br />to living soil</span></div>
        <div className="product-copy"><p>Plastic mulch has been agriculture&apos;s default for decades. It solves one problem on the surface while creating several others underneath. We collect rice straw that would otherwise be burned, process it into clean, weed-free mulch, and return it to farms — locking moisture in, keeping weeds down, and feeding the soil as it breaks down.</p><a href="#how-it-works">Discover the material <b>↘</b></a></div>
      </div>
      <div className="advantages">{[["01", "Holds soil moisture", "Cuts watering frequency during dry spells"], ["02", "Suppresses weeds naturally", "No herbicide needed in the first growth cycle"], ["03", "Breaks down into nutrients", "Returns organic matter the field lost at harvest"], ["04", "Costs less than synthetic mulch", "Sourced locally, priced for smallholders"]].map(([number, title, text], index) => <article data-reveal style={{ transitionDelay: `${index * 90}ms` }} key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="process-section" id="how-it-works">
      <div className="process-top" data-reveal><p className="section-index">03 / HOW IT WORKS</p><h2>Cut, soaked, pulped, pressed — <em>then back to the field.</em></h2><p>Six steps turn raw straw into field-ready mulch. Nothing here is invented — it&apos;s the same basic papermaking process, adapted for what a farm actually needs.</p></div>
      <ol className="process-list">{[["Cut", "Rice straw is collected and prepared."], ["Soaked", "The straw is softened and prepared for processing."], ["Pulped", "The material is broken down into usable pulp."], ["Pressed", "The pulp is formed into mulch."], ["Prepared", "The mulch is cleaned and made field-ready."], ["Back to the field", "The finished mulch returns to farms."]].map(([title, text], index) => <li data-reveal style={{ transitionDelay: `${index * 80}ms` }} key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
      <div className="process-closing" id="get-in-touch" data-reveal><p>From what the field leaves behind<br />to what the next harvest needs.</p><a href="#home">Back to the beginning <b>↑</b></a></div>
    </section>
  </main>;
}
