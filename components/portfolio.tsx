"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Lenis from "lenis";
import {
  ArrowDown,
  ArrowUpRight,
  Boxes,
  Braces,
  Check,
  ChevronRight,
  CircleDot,
  Cloud,
  Code2,
  Database,
  Download,
  Github,
  Globe2,
  Linkedin,
  Mail,
  Menu,
  Network,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { MouseEvent, useEffect, useRef, useState } from "react";

const navItems = ["about", "experience", "projects", "skills", "contact"];

const projects = [
  {
    index: "01",
    title: "VisionAI",
    eyebrow: "Applied AI / Road Safety",
    description:
      "A production SaaS platform preventing traffic fatalities through real-time, on-device driver monitoring and intelligent alerting.",
    metric: "<50ms",
    metricLabel: "edge inference",
    tags: ["Next.js", "TensorFlow.js", "MediaPipe", "Azure OpenAI", "Supabase"],
    highlights: ["30fps WebGL processing", "RLS multi-tenancy", "99.7% alert reliability"],
    github: "https://github.com/Devansh-Sahu/Vision-AI",
    live: "https://visionai07.vercel.app/",
    color: "silver",
  },
  {
    index: "02",
    title: "Feature Flag Engine",
    eyebrow: "Distributed Infrastructure",
    description:
      "A high-throughput feature-flag control plane with CDC propagation, consistent hashing, and local SDK caching.",
    metric: "43k+",
    metricLabel: "requests / sec",
    tags: ["Go", "PostgreSQL", "Kafka", "Redis", "Docker"],
    highlights: ["<0.5ms evaluation", "<2s propagation", "Kafka CDC architecture"],
    github: "https://github.com/Devansh-Sahu/Distributed-Feature-Flag-Engine",
    live: "",
    color: "graphite",
  },
  {
    index: "03",
    title: "Cache Coherence",
    eyebrow: "AI / Cloud Infrastructure",
    description:
      "An AI-driven distributed monitoring system that detects Redis anomalies and automates root-cause analysis.",
    metric: "99%",
    metricLabel: "faster diagnosis",
    tags: ["Python", "FastAPI", "Redis", "AWS", "Groq LLM"],
    highlights: ["100+ events / min", "PGVector RAG", "Fault-tolerant backend"],
    github: "https://github.com/Devansh-Sahu/Cache-Coherence-Monitoring-System",
    live: "",
    color: "smoke",
  },
];

const experience = [
  {
    date: "Dec 2025 - Jan 2026",
    role: "Open Source Contributor",
    company: "University of Alaska - DREAMS",
    description:
      "Built CI/CD and test infrastructure for a geoscience research workflow, making every commit reproducible and dramatically reducing manual QA.",
    metrics: ["60% less QA effort", "4 validation stages", "100% reproducible"],
  },
  {
    date: "May 2025 - Jul 2025",
    role: "Software Development Engineer Intern",
    company: "Salesforce via SmartBridge",
    description:
      "Engineered CRM modules and process automation across core Salesforce objects, shipping two production releases in a ten-week Agile cycle.",
    metrics: ["40% less manual entry", "2 production releases", "3 CRM objects"],
  },
];

const skillGroups = [
  {
    title: "Systems",
    icon: Network,
    skills: ["Distributed Systems", "System Design", "Concurrency", "Networking"],
  },
  {
    title: "AI Engineering",
    icon: Sparkles,
    skills: ["LLMs", "RAG", "Computer Vision", "Embeddings", "NLP"],
  },
  {
    title: "Backend",
    icon: Database,
    skills: ["Go", "Java", "Python", "FastAPI", "Spring Boot", "PostgreSQL"],
  },
  {
    title: "Cloud & Delivery",
    icon: Cloud,
    skills: ["AWS", "Docker", "Kafka", "Redis", "CI/CD", "GitHub Actions"],
  },
];

const achievements = [
  ["Top 25 / 1,500", "GDG GGC TechSprint 2025", "National grand finalist"],
  ["National Semi-Finalist", "Economic Times AI Hackathon", "Applied AI competition"],
  ["400+", "Coding problems solved", "Across LeetCode and more"],
  ["Ranger Rank", "Salesforce Trailhead", "23 Superbadges and 87+ badges"],
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function SectionHeading({
  index,
  eyebrow,
  title,
  copy,
}: {
  index: string;
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <motion.div
      className="section-heading"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-kicker">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <div className="section-title-row">
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </motion.div>
  );
}

function HeroPortrait({
  position,
  label,
  imageNumber,
  onClick,
}: {
  position: "left" | "center" | "right";
  label: string;
  imageNumber: number;
  onClick: () => void;
}) {
  const portraitSrc =
    imageNumber === 1
      ? "/devansh-portrait-01.png"
      : imageNumber === 3
        ? "/devansh-portrait-03.png"
        : null;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 120,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    stiffness: 120,
    damping: 22,
  });

  const onMove = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.button
      aria-label={`Open ${label} section`}
      className={`hero-portrait hero-portrait-${position}`}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY }}
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 1.1,
        delay: position === "center" ? 0.15 : position === "left" ? 0.35 : 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className={`portrait-surface ${portraitSrc ? "portrait-surface-image" : ""}`}>
        {portraitSrc ? (
          <img
            className="portrait-image"
            src={portraitSrc}
            alt={`Devansh Sahu portrait ${imageNumber}`}
          />
        ) : (
          <>
            <div className="portrait-grid" />
            <div className="portrait-silhouette">
              <span className="portrait-head" />
              <span className="portrait-body" />
            </div>
            <div className="portrait-placeholder">
              <span className="mono">PORTRAIT {String(imageNumber).padStart(2, "0")}</span>
              <strong>Replace with Devansh Image {imageNumber}</strong>
            </div>
          </>
        )}
        <div className="portrait-glare" />
      </div>
      <div className="portrait-action">
        <span>{label}</span>
        <ArrowUpRight size={16} />
      </div>
    </motion.button>
  );
}

function MagneticLink({
  href,
  children,
  className = "",
  download,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  download?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 15 });
  const springY = useSpring(y, { stiffness: 180, damping: 15 });

  return (
    <motion.a
      href={href}
      className={className}
      download={download}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.12);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 130]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.13], [1, 0.2]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const sections = ["hero", ...navItems, "achievements"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <header className="site-header">
        <button className="wordmark" onClick={() => scrollToId("hero")} aria-label="Back to top">
          DS<span>.</span>
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToId(item)}
              className={activeSection === item ? "active" : ""}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="header-status">
          <span className="status-dot" />
          Available for select roles
        </div>
        <button
          className="menu-button"
          aria-label="Open navigation"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={20} />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation">
              <X size={22} />
            </button>
            <span className="mono">NAVIGATION</span>
            {navItems.map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setMenuOpen(false);
                  scrollToId(item);
                }}
              >
                <span>0{index + 1}</span>
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <section className="hero section-shell" id="hero" ref={heroRef}>
        <div className="silk silk-one" />
        <div className="silk silk-two" />
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />

        <motion.div className="hero-copy" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            className="hero-kicker"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <span>AI / SYSTEMS / PRODUCT</span>
            <span>Bhopal, India</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            DEVANSH
            <br />
            <span>SAHU</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            AI-focused software engineer building distributed systems,
            intelligent products, and cloud-native infrastructure.
          </motion.p>
        </motion.div>

        <div className="hero-gallery">
          <HeroPortrait position="left" label="Selected projects" imageNumber={1} onClick={() => scrollToId("projects")} />
          <HeroPortrait position="center" label="Start a conversation" imageNumber={2} onClick={() => scrollToId("contact")} />
          <HeroPortrait position="right" label="Experience" imageNumber={3} onClick={() => scrollToId("experience")} />
        </div>

        <div className="hero-footer">
          <button onClick={() => scrollToId("about")} className="scroll-cue">
            <ArrowDown size={15} />
            Scroll to explore
          </button>
          <span className="hero-footer-note">ENGINEERING FOR CONSEQUENCE</span>
          <span className="mono">2026 / PORTFOLIO</span>
        </div>
      </section>

      <section className="about section-shell" id="about">
        <SectionHeading
          index="01"
          eyebrow="Profile"
          title="Building useful intelligence at systems scale."
          copy="I work where applied AI, resilient infrastructure, and thoughtful product engineering meet."
        />
        <div className="about-grid">
          <motion.div
            className="about-statement"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <p>
              I design and build software that has to be <em>fast</em>,{" "}
              <em>reliable</em>, and genuinely useful.
            </p>
            <div className="about-availability">
              <span className="status-dot" />
              Open to AI engineering and backend systems opportunities
            </div>
          </motion.div>
          <div className="principles-grid">
            {[
              ["01", "AI Engineer", "Turning models into dependable product experiences."],
              ["02", "Systems Builder", "Designing for throughput, latency, and graceful failure."],
              ["03", "Product Mindset", "Shipping the right thing, not merely an impressive thing."],
              ["04", "Open Source", "Contributing automation and reliability to research tooling."],
            ].map(([number, title, text], index) => (
              <motion.article
                key={title}
                className="principle-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
              >
                <span className="mono">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <ArrowUpRight size={17} />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="experience section-shell" id="experience">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title="Production-minded from day one."
          copy="A track record of removing manual work, strengthening pipelines, and shipping with measurable outcomes."
        />
        <div className="timeline">
          {experience.map((item, index) => (
            <motion.article
              className="timeline-item"
              key={item.company}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
            >
              <div className="timeline-marker">
                <CircleDot size={18} />
                <span />
              </div>
              <span className="timeline-date mono">{item.date}</span>
              <div className="timeline-content">
                <p>{item.company}</p>
                <h3>{item.role}</h3>
                <div className="timeline-description">{item.description}</div>
              </div>
              <div className="timeline-metrics">
                {item.metrics.map((metric) => (
                  <span key={metric}>{metric}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="projects section-shell" id="projects">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title="Systems built to move fast and hold up."
          copy="Three projects across applied AI, distributed infrastructure, and cloud-native observability."
        />
        <div className="project-list">
          {projects.map((project, index) => (
            <motion.article
              className={`project-card project-${project.color}`}
              key={project.title}
              initial={{ opacity: 0, y: 55 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.06 }}
            >
              <div className="project-topline">
                <span className="mono">{project.index} / 03</span>
                <span>{project.eyebrow}</span>
              </div>
              <div className="project-main">
                <div className="project-copy">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-actions">
                    <MagneticLink href={project.github} className="button-primary">
                      <Github size={17} />
                      View repository
                      <ArrowUpRight size={16} />
                    </MagneticLink>
                    {project.live ? (
                      <MagneticLink href={project.live} className="button-ghost">
                        <Globe2 size={17} />
                        Live product
                      </MagneticLink>
                    ) : (
                      <span className="private-demo">Technical case study</span>
                    )}
                  </div>
                </div>
                <div className="project-viz" aria-hidden="true">
                  <div className="viz-ring ring-one" />
                  <div className="viz-ring ring-two" />
                  <div className="viz-ring ring-three" />
                  <div className="viz-core">
                    {index === 0 ? <Sparkles size={30} /> : index === 1 ? <Network size={30} /> : <Database size={30} />}
                  </div>
                  <span className="viz-label label-one">{project.tags[0]}</span>
                  <span className="viz-label label-two">{project.tags[1]}</span>
                  <span className="viz-label label-three">{project.tags[2]}</span>
                </div>
                <div className="project-metric">
                  <strong>{project.metric}</strong>
                  <span>{project.metricLabel}</span>
                </div>
              </div>
              <div className="project-footer">
                <div className="tag-list">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <ul>
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>
                      <Check size={14} />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="skills section-shell" id="skills">
        <SectionHeading
          index="04"
          eyebrow="Capabilities"
          title="A practical stack for intelligent systems."
          copy="From model integration to distributed data flow, with enough product judgment to know what belongs in production."
        />
        <div className="skills-layout">
          <motion.div
            className="skills-core"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <div className="core-ring ring-a" />
            <div className="core-ring ring-b" />
            <div className="core-ring ring-c" />
            <div className="core-center">
              <Terminal size={27} />
              <span>BUILD</span>
              <small>measure / learn</small>
            </div>
            <span className="orbit-item orbit-a"><Braces size={17} /> Code</span>
            <span className="orbit-item orbit-b"><Boxes size={17} /> Systems</span>
            <span className="orbit-item orbit-c"><Zap size={17} /> AI</span>
          </motion.div>
          <div className="skill-groups">
            {skillGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <motion.article
                  className="skill-group"
                  key={group.title}
                  initial={{ opacity: 0, x: 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.07, duration: 0.55 }}
                >
                  <div>
                    <Icon size={19} />
                    <h3>{group.title}</h3>
                  </div>
                  <div className="skill-pills">
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="achievements section-shell" id="achievements">
        <SectionHeading
          index="05"
          eyebrow="Signals"
          title="Recognition earned through the work."
        />
        <div className="achievement-grid">
          {achievements.map(([metric, title, description], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
            >
              <div className="achievement-number">0{index + 1}</div>
              <strong>{metric}</strong>
              <h3>{title}</h3>
              <p>{description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <div className="contact-glow" />
        <motion.div
          className="contact-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-kicker">
            <span>06</span>
            <span>Contact</span>
          </div>
          <span className="contact-status"><span className="status-dot" /> Available for meaningful work</span>
          <h2>Let&apos;s build something that deserves to exist.</h2>
          <p>
            I&apos;m interested in AI engineering, backend systems, and ambitious product teams
            solving difficult problems with care.
          </p>
          <MagneticLink href="mailto:devanshstar7@gmail.com" className="contact-email">
            devanshstar7@gmail.com
            <ArrowUpRight size={24} />
          </MagneticLink>
          <div className="contact-links">
            <MagneticLink href="https://www.linkedin.com/in/devansh-sahu-a9b188265">
              <Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} />
            </MagneticLink>
            <MagneticLink href="https://github.com/Devansh-Sahu">
              <Github size={17} /> GitHub <ArrowUpRight size={14} />
            </MagneticLink>
            <MagneticLink href="/Devansh-Sahu-Resume.pdf" download>
              <Download size={17} /> Resume <ArrowUpRight size={14} />
            </MagneticLink>
            <MagneticLink href="mailto:devanshstar7@gmail.com">
              <Mail size={17} /> Email <ArrowUpRight size={14} />
            </MagneticLink>
          </div>
        </motion.div>
        <footer>
          <button className="wordmark" onClick={() => scrollToId("hero")}>DS<span>.</span></button>
          <span>Designed and engineered by Devansh Sahu</span>
          <button onClick={() => scrollToId("hero")}>Back to top <ArrowDown className="arrow-up" size={14} /></button>
        </footer>
      </section>
    </main>
  );
}
