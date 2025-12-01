'use client';


import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Database,
  Layout,
  Server,
  Terminal,
  Cpu,
  Menu,
  X,
  ChevronDown,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Calendar,
  MapPin,
  FileDown
} from 'lucide-react';

// const RESUME_LINK = "YOUR_GOOGLE_DRIVE_RESUME_LINK_HERE";
const RESUME_LINK = "https://drive.google.com/drive/folders/1zFwDk-Uasz2jaCu5L1Ue3cdBciR0P2y5?usp=drive_link";
export function calculateExperienceFromPeriod(periodStr) {
  const [startStr, endStr] = periodStr.split(" - ");

  const start = new Date(startStr + " 1");
  const end =
    endStr.toLowerCase() === "present"
      ? new Date()
      : new Date(endStr + " 1");

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  months += 1;

  if (months >= 12) {
    years += Math.floor(months / 12);
    months = months % 12;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);

  return parts.length ? parts.join(" ") : "0 months";
}



// --- Assets & Data ---
// Using placeholders since direct asset access is blocked, but data is real based on search results.

const PERSONAL_INFO = {
  name: "Sharoof Khan",
  role: "React,React Native, Next js, Full Stack Web Developer(MERN)",
  bio: "Frontend developer with three years of hands-on experience building React applications, dashboards, and mobile experiences. I specialize in creating intuitive interfaces that handle complexity gracefully whether that means managing large datasets, optimizing render cycles, or structuring components for long-term maintainability. My work centers on performance, clarity, and shipping features that teams and users actually rely on",
  email: "sharoofskhan10@gmail.com", // Found in public records
  github: "https://github.com/Sharoof-Khan",
  linkedin: "https://www.linkedin.com/in/sharoof-khan-0703" // Assumed based on naming convention
};

const SKILLS = [
  { name: "React.js", icon: <Code2 size={20} />, category: "Frontend" },
  { name: "React Native", icon: <Code2 size={20} />, category: "Mobile Frontend " },
  { name: "Next.js", icon: <Code2 size={20} />, category: "Frontend " },
  { name: "Redux", icon: <Cpu size={20} />, category: "Frontend" },
  { name: "JavaScript (ES6+)", icon: <Terminal size={20} />, category: "Language" },
  { name: "HTML5 & CSS3", icon: <Layout size={20} />, category: "Frontend" },
  { name: "Node.js", icon: <Server size={20} />, category: "Backend" },
  { name: "Express.js", icon: <Server size={20} />, category: "Backend" },
  { name: "Postgresql", icon: <Database size={20} />, category: "Database" },
  { name: "MongoDB", icon: <Database size={20} />, category: "Database" },
  { name: "SQL", icon: <Database size={20} />, category: "Database" },
  { name: "Tailwind CSS", icon: <Layout size={20} />, category: "Frontend" },
];

const PROJECTS = [
  {
    title: "BollywoodMDB — Mobile App",
    description: "Entertainment app featuring Bollywood news, movie details, trailers, and box-office tracking. Built the core navigation flow and screen layouts, implemented Excel export functionality for offline data access, and ensured smooth transitions across all features. Focused on delivering a polished user experience with quick load times and reliable data fetching",
    tech: ["React Native", "Redux Toolkit", "CSS", "JavaScript"],
    github: "https://github.com/Sharoof-Khan10/",
    live: "https://github.com/Sharoof-Khan10/",
    color: "from-blue-500 to-sky-400"
  },
  {
    title: "One Nation One Product",
    description: "Data-heavy dashboard supporting advanced filtering, charting, and bulk export capabilities. Optimized component structure to handle thousands of rows without performance degradation. Implemented form validation using React Hook Form and added subtle animations with Framer Motion to enhance usability. Built the system to scale as data volume increases",
    tech: ["React", "Tailwind CSS", "Redux Toolkit", "RTK Query", "React Hook Form", "Framer Motion"],
    github: "https://github.com/Sharoof-Khan-Torero",
    live: "https://www.liveapp.in/",
    color: "from-orange-500 to-red-400"
  },
  // {
  //   title: "Weather App",
  //   description: "A real-time weather forecasting application providing detailed climate data, forecasts, and location-based weather updates using external APIs.",
  //   tech: ["JavaScript", "HTML", "CSS", "Weather API"],
  //   github: "#",
  //   live: "#",
  //   color: "from-emerald-500 to-teal-400"
  // }
];

const EXPERIENCE = [
  {
    role: "Web Developer",
    company: "Torero Softwares Limited",
    type: "Full-time",
    period: "Mar 2024 - Present",
    duration: "1 yr 9 mos",
    location: "Mumbai, Maharashtra, India",
    description: "Working on scalable web solutions and frontend architecture using modern React ecosystems.",
    skills: ["React.js", "Redux Toolkit"]
  },
  {
    role: "Full Stack Developer",
    company: "Don Bosco - Nerul",
    type: "Full-time",
    period: "May 2023 - Jan 2024",
    duration: "9 mos",
    location: "Navi Mumbai, Maharashtra, India",
    description: "Created the Don Bosco School website frontend from scratch using React and Tailwind CSS. Played a pivotal role in enhancing the school's online presence, making information readily accessible to students and parents.",
    skills: ["React.js", "Redux Toolkit", "Tailwind CSS"]
  },
  {
    role: "Software Developer",
    company: "Boppo Technologies",
    type: "Full-time",
    period: "Aug 2022 - May 2023",
    duration: "10 mos",
    location: "Mumbai, Maharashtra, India",
    description: "Developed software solutions with a focus on component reusability and cross-platform compatibility.",
    skills: ["React.js", "React Native"]
  }
];
// --- Components ---

const SectionHeading = ({ children, subtitle }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-emerald-500 after:rounded-full">
      {children}
    </h2>
    {subtitle && <p className="text-slate-400 mt-4 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const SkillCard = ({ skill }) => (
  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 group flex items-center gap-3">
    <div className="p-2 bg-slate-900 rounded-lg text-emerald-400 group-hover:text-emerald-300 group-hover:bg-emerald-500/10 transition-colors">
      {skill.icon}
    </div>
    <span className="font-medium text-slate-200">{skill.name}</span>
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all duration-300 flex flex-col h-full group">
    <div className={`h-48 w-full bg-gradient-to-br ${project.color} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-2xl font-bold text-white drop-shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {project.title}
        </h3>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-slate-400 mb-6 flex-grow leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t, i) => (
          <span key={i} className="px-3 py-1 text-xs font-medium bg-slate-800 text-emerald-400 rounded-full border border-slate-700">
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-4 mt-auto">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors border border-slate-700"
        >
          <Github size={18} /> Code
        </a>
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20"
        >
          <ExternalLink size={18} /> Live
        </a>
      </div>
    </div>
  </div>
);

const ContactForm = () => {
  const ACCESS_KEY = process.env.NEXT_PUBLIC_MAIL_ACCESS_KEY
  // ----------------------------------------------------------------------

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null); // null, 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setResult(null);

    const formData = new FormData(e.target);
    formData.append("access_key", ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult('success');
        e.target.reset(); // Clear the form
      } else {
        console.error("Form submission error:", data);
        setResult('error');
      }
    } catch (error) {
      console.error("Network error:", error);
      setResult('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto bg-slate-800/30 p-8 rounded-2xl border border-slate-700/50">

      {result === 'success' ? (
        <div className="flex flex-col items-center justify-center text-center py-10 animate-in fade-in zoom-in">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
          <p className="text-slate-400">Thanks for reaching out. I’ll get back to you shortly.</p>
          <button
            onClick={() => setResult(null)}
            className="mt-6 text-sm text-emerald-400 hover:text-emerald-300 font-medium"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-400">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-600"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-400">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-600"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-slate-400">Message</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-600 resize-none"
              placeholder="I'd like to discuss a project..."
            ></textarea>
          </div>

          {/* Hidden inputs for Web3Forms customization */}
          <input type="hidden" name="subject" value="New Submission from Portfolio" />
          <input type="hidden" name="from_name" value="Portfolio Contact Form" />

          {result === 'error' && (
            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg text-sm">
              <AlertCircle size={16} />
              <span>Something went wrong. Please try again later.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-lg hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

const ExperienceCard = ({ job, index }) => (
  <div className="relative pl-8 md:pl-0">
    {/* Timeline Line (Desktop) */}
    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2"></div>

    {/* Timeline Dot (Desktop) */}
    <div className="hidden md:block absolute left-1/2 top-8 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-950 -translate-x-1/2 shadow-[0_0_0_4px_rgba(16,185,129,0.2)]"></div>

    {/* Timeline Line (Mobile) */}
    <div className="md:hidden absolute left-2 top-0 bottom-0 w-0.5 bg-slate-800"></div>
    {/* Timeline Dot (Mobile) */}
    <div className="md:hidden absolute left-2 top-8 w-3 h-3 rounded-full bg-emerald-500 -translate-x-[5px]"></div>

    <div className={`md:flex items-center justify-between gap-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
      {/* Date/Duration Side */}
      <div className="md:w-1/2 mb-2 md:mb-0">
        <div className={`text-slate-400 text-sm md:text-base mb-1 md:mb-0 flex items-center gap-2 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
          <Calendar size={16} className="text-emerald-500" />
          <span className="font-semibold text-slate-200">{job.period}</span>
          {/* <span className="text-slate-500">• {job.duration}</span> */}
          <span className="text-slate-500">
            • {calculateExperienceFromPeriod(job.period)}
          </span>
        </div>
      </div>

      {/* Content Side */}
      <div className="md:w-1/2">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 shadow-lg group">
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
            {job.role}
          </h3>
          <h4 className="text-lg text-slate-300 font-medium mb-2 flex items-center gap-2">
            {job.company}
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {job.type}
            </span>
          </h4>
          <div className="flex items-center text-slate-500 text-sm mb-4">
            <MapPin size={14} className="mr-1" />
            {job.location}
          </div>
          <p className="text-slate-400 mb-4 leading-relaxed text-sm">
            {job.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, i) => (
              <span key={i} className="text-xs font-medium text-emerald-300 bg-emerald-950/30 px-2 py-1 rounded border border-emerald-900/50">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ParticleNetworkHero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Configuration
    const particleCount = 60;
    const connectionDistance = 150;
    const mouseDistance = 200;

    // Handle resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Particle Class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Velocity X
        this.vy = (Math.random() - 0.5) * 0.5; // Velocity Y
        this.size = Math.random() * 2 + 1;
        this.color = 'rgba(16, 185, 129, 0.5)'; // Emerald-ish
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Check connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 - distance / connectionDistance * 0.15})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Configuration
    const particleCount = 60;
    const connectionDistance = 150;
    const mouseDistance = 200;

    // Handle resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Particle Class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Velocity X
        this.vy = (Math.random() - 0.5) * 0.5; // Velocity Y
        this.size = Math.random() * 2 + 1;
        this.color = 'rgba(16, 185, 129, 0.5)'; // Emerald-ish
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Check connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 - distance / connectionDistance * 0.15})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

// --- Layout & Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <ParticleNetwork />
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-4 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter text-slate-100 flex items-center gap-2">
            <span className="text-emerald-500">&lt;</span>
            Sharoof
            <span className="text-emerald-500">/&gt;</span>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm font-medium transition-colors hover:text-emerald-400 ${activeSection === link.id ? 'text-emerald-500' : 'text-slate-400'}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <a href={PERSONAL_INFO.github} target="_blank" className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-lg transition-colors border border-slate-700">
              <Github size={20} />
            </a>
          </ul>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-slate-200 p-2 hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950 pt-24 px-6 md:hidden animate-in fade-in slide-in-from-top-10 duration-200">
          <ul className="flex flex-col gap-6 text-center text-lg">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className={`block w-full py-4 border-b border-slate-800 ${activeSection === link.id ? 'text-emerald-500' : 'text-slate-400'}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
        {/* Background blobs */}
        {/* <ParticleNetwork /> */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium text-sm mb-6 animate-in fade-in zoom-in duration-500">
            Hello, I’m
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6 tracking-tight leading-tight animate-in slide-in-from-bottom-5 duration-700">
            {PERSONAL_INFO.name}
          </h1>
          <h2 className="text-2xl md:text-4xl font-medium text-slate-400 mb-8 h-12 animate-in slide-in-from-bottom-5 duration-700 delay-100">
            Full Stack Web Developer
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg mb-10 leading-relaxed animate-in slide-in-from-bottom-5 duration-700 delay-200">
            I build accessible, pixel-perfect, secure, and performant web applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom-5 duration-700 delay-300">
            <button
              onClick={() => scrollTo('projects')}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-900/20 transition-all hover:scale-105"
            >
              View My Work
            </button>
            <a
              href={RESUME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg border border-slate-700 transition-all hover:scale-105 flex items-center gap-2"
            >
              <FileDown size={20} />
              Download Resume
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg border border-slate-700 transition-all hover:scale-105"
            >
              Contact Me
            </button>
          </div>

          <button
            onClick={() => scrollTo('about')}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 hover:text-emerald-400 transition-colors animate-bounce"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Get to know me better">About Me</SectionHeading>

          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="w-full md:w-1/3 flex justify-center">
              {/* Image Placeholder */}
              <div className="w-64 h-64 relative rounded-2xl overflow-hidden bg-slate-800 border-4 border-slate-700 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="absolute inset-0 flex items-center justify-center text-slate-600 bg-slate-800">
                  <span className="text-6xl font-bold opacity-20">SK</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
              {/* <p className="text-slate-400 leading-relaxed">
                I started my coding journey solving problems on data structures and algorithms, which eventually led me to web development. I love the logic and creativity involved in building applications that solve real-world problems.
              </p> */}
              <p className="text-slate-400 leading-relaxed">
                Currently, I am focused on mastering the <strong>MERN Stack</strong> and exploring System Design. When I’m not coding, you can find me exploring new technologies.
              </p>

              <div className="flex gap-4 pt-4">
                <a href={PERSONAL_INFO.github} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  <Github size={24} />
                </a>
                <a href={PERSONAL_INFO.linkedin} className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-400 hover:text-red-400 transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="My professional journey">Work Experience</SectionHeading>

          <div className="max-w-4xl mx-auto flex flex-col gap-10">
            {EXPERIENCE.map((job, index) => (
              <ExperienceCard key={index} job={job} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="My technical toolkit">Tech Stack</SectionHeading>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {SKILLS.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Some things I've built">Featured Projects</SectionHeading>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Let's build something together">Get In Touch</SectionHeading>

          <div className="max-w-xl mx-auto text-center mb-10">
            <p className="text-slate-400 text-lg mb-8">
              I am currently looking for full-time opportunities. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 rounded-lg text-emerald-400 border border-slate-700 mb-8">
              <Mail size={18} />
              <span>{PERSONAL_INFO.email}</span>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>Designed & Built by {PERSONAL_INFO.name}</p>
        <p className="mt-2">© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </div>
  );
}