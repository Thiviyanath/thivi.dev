import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Menu, X, Code2, Palette, Smartphone, Database, Globe, Award, Download, ArrowUpRight, Star } from 'lucide-react';
import profileImage from './assets/Profile.jpg'; 

// ==========================================
// ENHANCED PORTFOLIO CONFIGURATION
// ==========================================
const CONFIG = {
name: "Thiviyanath Maheswaran",
title: "Software Engineering Undergraduate · Full Stack Developer",
tagline: "Building Business-Focused Software Solutions",
bio: "I build full stack, database-driven, and business-focused applications using React, Node.js, MongoDB, Firebase, and AI technologies. I am currently seeking internship opportunities to grow as a software engineer.",
  location: "Colombo, Sri Lanka",
  availableFor: ["Full-time positions", "Freelance projects", "Collaboration opportunities"],
  
  profileImage: profileImage, // Replace with your actual image URL
  resumeLink: "/Thiviyanath_Maheswaran_CV.pdf",
  
  social: {
    email: "thiviyanath15@gmail.com",
    linkedin: "https://linkedin.com/in/olaxiez-pedro",
    github: "https://github.com/Thiviyanath"
  },
  
 expertise: [
  {
    title: "Full Stack Development",
    description: "Building scalable full stack web applications with responsive frontend interfaces, backend APIs, and database integration.",
    skills: ["React", "Node.js", "Express.js", "MongoDB"]
  },
  {
    title: "Business Applications",
    description: "Developing workflow-based business systems including ERP platforms, admin dashboards, reporting systems, and CRUD operations.",
    skills: ["Odoo ERP", "PostgreSQL", "REST APIs", "Dashboard Systems"]
  },
  {
    title: "Database & Backend Systems",
    description: "Designing backend architectures, structured databases, authentication systems, and API-driven applications.",
    skills: ["MongoDB", "Firebase", "SQL", "Authentication"]
  },
  {
    title: "AI & Automation",
    description: "Building AI-powered applications using NLP, computer vision, semantic search, and automation workflows.",
    skills: ["ChatGPT API", "Hugging Face", "Google Vision API", "Python"]
  }
]
technicalSkills: {
  "Languages": ["JavaScript", "TypeScript", "Python", "C++", "SQL"],
  "Frameworks": ["React", "React Native", "Node.js", "Express.js", "Bootstrap", "Spring Boot Basic"],
  "Databases & Tools": ["MongoDB", "PostgreSQL", "Firebase", "GitHub", "REST APIs", "JSON/XML"],
  "Business & Data": ["CRUD Operations", "Dashboard Development", "Reporting Systems", "Workflow-Based Systems"],
  "AI & Automation": ["ChatGPT API", "Hugging Face", "Google Vision API", "Prompt Engineering"]
},
projects: [
  {
    title: "Business Management & ERP System",
    category: "ERP / Business Application",
    description: "Business ERP solution for inventory tracking, sales management, invoicing, tax-based workflows, reporting, and dashboard management.",
    longDescription: "Developed an Odoo ERP-based business management system focused on structured business workflows, sales records, tax calculations, reporting, and dashboard-based operations.",
    tech: ["Odoo ERP", "PostgreSQL", "Python", "Business Workflows"],
    github: "https://github.com/Thiviyanath/business-erp-system",
    live: null,
    featured: true,
    highlights: ["Inventory tracking", "Sales management", "Tax workflows", "Reporting dashboard"]
  },
  {
    title: "Ambience Studio Management System",
    category: "Full Stack",
    description: "Full stack business management system for studio booking, customer handling, authentication, and admin dashboard functionality.",
    longDescription: "Developing a studio management platform for Ambience Studio, Colombo, with booking workflows, customer records, authentication, and admin dashboard features.",
    tech: ["Node.js", "Express.js", "MongoDB", "Bootstrap"],
    github: "#",
    live: null,
    featured: true,
    highlights: ["Booking workflow", "Customer management", "Authentication", "Admin dashboard"]
  },
  {
    title: "NeuroTouch AI",
    category: "AI / Computer Vision",
    description: "AI-powered gesture control system for virtual mouse control, screenshot capture, and presentation navigation.",
    longDescription: "Developed an AI-powered gesture control system using Python, OpenCV, MediaPipe, and PyQt5 to enable hands-free desktop control through real-time hand tracking.",
    tech: ["Python", "OpenCV", "MediaPipe", "PyQt5"],
    github: "#",
    live: null,
    featured: true,
    highlights: ["Gesture control", "Virtual mouse", "Computer vision", "Presentation control"]
  },
  
  {
  title: "Portfolio Website",
  category: "Personal Portfolio",
  description: "Professional developer portfolio showcasing projects, technical skills, certifications, and achievements.",
  longDescription: "Designed and developed a responsive personal portfolio website using React to showcase software engineering projects, technical expertise, certifications, and professional achievements. Features modern UI/UX design, project filtering, GitHub integration, and responsive layouts.",
  tech: ["React", "JavaScript", "CSS3", "GitHub Pages"],
  github: "https://github.com/Thiviyanath/thivi.dev",
  live: "https://thiviyanath.github.io/thivi.dev/",
  featured: false,
  highlights: [
    "Responsive design",
    "Project showcase",
    "GitHub integration",
    "Resume download"
  ]
}
  {
    title: "PropConnect LK",
    category: "Web Platform",
    description: "Responsive real estate web platform focused on property listings, user interaction, and modern UI design.",
    longDescription: "Developed a real estate web platform for showcasing properties with responsive layouts, user-friendly navigation, and clean frontend design.",
    tech: ["React", "JavaScript", "CSS3", "GitHub Pages"],
    github: "#",
    live: "https://thiviyanath.github.io/Aura-Realtors/",
    featured: true,
    highlights: ["Property listings", "Responsive UI", "Modern design", "Live deployment"]
  },
  {
    title: "AI Smart Note App",
    category: "AI Application",
    description: "AI-powered note management app with semantic search and automated note extraction.",
    longDescription: "Built an AI-powered note management application using Google Vision API and NLP-based processing for note extraction, search, and organization.",
    tech: ["React Native", "Flask", "Google Vision API", "Hugging Face"],
    github: "#",
    live: null,
    featured: false,
    highlights: ["Semantic search", "OCR extraction", "AI APIs", "NLP processing"]
  }
],
  
  achievements: [
    { icon: Star, text: "Top performer in Advanced Software Engineering" },
    { icon: Award, text: "Led team of 4 developers in capstone project" },
    { icon: Code2, text: "Contributed to 3 open-source projects" },
    { icon: Globe, text: "Built and deployed 5+ production websites" }
  ]
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'expertise', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="portfolio">
      {/* Progress Bar */}
      <motion.div className="progress-bar" style={{ scaleX }} />

      {/* Animated Background */}
      <div className="background">
        <div className="mesh-gradient"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation 
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Expertise />
        <Skills />
        <Projects selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
        <Achievements />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {/* Styles */}
      <style>{styles}</style>
    </div>
  );
}

// ==========================================
// NAVIGATION COMPONENT
// ==========================================
function Navigation({ activeSection, mobileMenuOpen, setMobileMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="nav-container">
        <motion.div 
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="logo-initial">T</span>
          <span className="logo-text">Thiviyanath</span>
        </motion.div>
        
        <ul className="nav-menu desktop-menu">
          {navItems.map((item, index) => (
            <motion.li 
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className={activeSection === item.id ? 'active' : ''}
              >
                {item.label}
              </button>
            </motion.li>
          ))}
        </ul>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="nav-menu mobile-menu"
        >
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={activeSection === item.id ? 'active' : ''}
              >
                {item.label}
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.nav>
  );
}

// ==========================================
// HERO SECTION
// ==========================================
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-grid">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-text"
          >
            <motion.div 
              className="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="badge-dot"></span>
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {CONFIG.name}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hero-title"
            >
              {CONFIG.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hero-tagline"
            >
              {CONFIG.tagline}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="hero-bio"
            >
              {CONFIG.bio}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="hero-buttons"
            >
              <button 
                className="btn btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
                <ArrowUpRight size={18} />
              </button>
              <a href={CONFIG.resumeLink} className="btn btn-secondary">
                <Download size={18} />
                Download Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="hero-socials"
            >
              <a href={CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="social-icon">
                <Github size={20} />
              </a>
              <a href={CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${CONFIG.social.email}`} className="social-icon">
                <Mail size={20} />
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hero-image-wrapper"
          >
            <div className="hero-image-glow"></div>
            <div className="hero-image-container">
              <img 
                src={CONFIG.profileImage} 
                alt={CONFIG.name}
                className="hero-image"
              />
              <div className="image-border"></div>
            </div>
            <div className="floating-card card-1">
              <Code2 size={20} />
              <span>Clean Code</span>
            </div>
            <div className="floating-card card-2">
              <Palette size={20} />
              <span>Great Design</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// ABOUT SECTION
// ==========================================
function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">About Me</h2>
          
          <div className="about-grid">
            <div className="about-content">
              <div className="about-text-block">
                <h3>Who I Am</h3>
                <p>
                  I'm a <strong>Software Engineer</strong> passionate about creating digital experiences that blend technical excellence with thoughtful design. My work spans <strong>web development</strong>, <strong>mobile applications</strong>, and <strong>UI/UX design</strong>.
                </p>
              </div>

              <div className="about-text-block">
                <h3>My Approach</h3>
                <p>
                  I believe great software is built at the intersection of <strong>clean code</strong>, <strong>user experience</strong>, and <strong>performance</strong>. Every project I work on is an opportunity to solve real problems while crafting something beautiful and functional.
                </p>
              </div>

              <div className="about-text-block">
                <h3>What Drives Me</h3>
                <p>
                  I'm driven by the challenge of transforming complex requirements into simple, elegant solutions. From <strong>Android applications</strong> to <strong>full-stack web systems</strong>, I approach each project with an engineer's rigor and a designer's eye.
                </p>
              </div>
            </div>

            <div className="about-highlights">
              <div className="highlight-card">
                <div className="highlight-icon">
                  <Globe size={24} />
                </div>
                <h4>Location</h4>
                <p>{CONFIG.location}</p>
              </div>

              <div className="highlight-card">
                <div className="highlight-icon">
                  <Award size={24} />
                </div>
                <h4>Focus Areas</h4>
                <ul>
                  <li>Full-Stack Development</li>
                  <li>Mobile Apps (Android)</li>
                  <li>UI/UX Design</li>
                  <li>System Architecture</li>
                </ul>
              </div>

              <div className="highlight-card">
                <div className="highlight-icon">
                  <Star size={24} />
                </div>
                <h4>Available For</h4>
                <ul>
                  {CONFIG.availableFor.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// EXPERTISE SECTION
// ==========================================
function Expertise() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="expertise" className="section expertise-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">What I Do</h2>
          
          <div className="expertise-grid">
            {CONFIG.expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="expertise-card"
                  whileHover={{ y: -5 }}
                >
                  <div className="expertise-icon">
                    <Icon size={28} />
                  </div>
                  <h3>{item.title}</h3>
                  <p className="expertise-description">{item.description}</p>
                  <div className="expertise-skills">
                    {item.skills.map(skill => (
                      <span key={skill} className="skill-pill">{skill}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// SKILLS SECTION
// ==========================================
function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Technical Skills</h2>
          
          <div className="skills-container">
            {Object.entries(CONFIG.technicalSkills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="skill-category-block"
              >
                <h3 className="skill-category-title">{category}</h3>
                <div className="skill-tags">
                  {items.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="skill-tag-enhanced"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// PROJECTS SECTION
// ==========================================
function Projects({ selectedProject, setSelectedProject }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(CONFIG.projects.map(p => p.category))];
  const filteredProjects = filter === 'all' 
    ? CONFIG.projects 
    : CONFIG.projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          
          {/* Category Filter */}
          <div className="project-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="projects-grid-enhanced">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`project-card-enhanced ${project.featured ? 'featured' : ''}`}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
              >
                {project.featured && (
                  <div className="featured-badge">
                    <Star size={14} />
                    Featured
                  </div>
                )}
                
                <div className="project-header">
                  <h3 className="project-title-enhanced">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>

                <p className="project-description-enhanced">{project.description}</p>

                <div className="project-tech-enhanced">
                  {project.tech.slice(0, 4).map(tech => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="tech-badge more">+{project.tech.length - 4}</span>
                  )}
                </div>

                <div className="project-footer">
                  <div className="project-highlights-preview">
                    {project.highlights.slice(0, 2).map((highlight, i) => (
                      <span key={i} className="highlight-dot">• {highlight}</span>
                    ))}
                  </div>
                  <button className="view-details-btn">
                    View Details
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// PROJECT MODAL
// ==========================================
function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2>{project.title}</h2>
          <span className="modal-category">{project.category}</span>
        </div>

        <div className="modal-body">
          <p className="modal-description">{project.longDescription}</p>

          <div className="modal-section">
            <h3>Technologies Used</h3>
            <div className="modal-tech">
              {project.tech.map(tech => (
                <span key={tech} className="tech-badge-large">{tech}</span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3>Key Highlights</h3>
            <ul className="modal-highlights">
              {project.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div className="modal-actions">
            {project.github && (
              <a href={project.github} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                <Github size={18} />
                View on GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ==========================================
// ACHIEVEMENTS SECTION
// ==========================================
function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section achievements-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="achievements-wrapper"
        >
          <h3 className="achievements-title">Achievements & Recognition</h3>
          <div className="achievements-grid">
            {CONFIG.achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="achievement-item"
                >
                  <Icon size={20} />
                  <span>{achievement.text}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// CONTACT SECTION
// ==========================================
function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="contact-wrapper"
        >
          <h2 className="section-title">Let's Build Something Together</h2>
          
          <div className="contact-content-grid">
            <div className="contact-text-block">
              <p className="contact-lead">
                I'm currently open to <strong> software engineering</strong>, <strong> business application</strong>, 
                and <strong>AI-related internship opportunities.</strong>.
              </p>
              <p className="contact-secondary">
                Whether you're looking to build a new product, need help with an existing project, 
                or just want to chat about technology and design — I'd love to hear from you.
              </p>
            </div>

            <div className="contact-cta">
              <a href={`mailto:${CONFIG.social.email}`} className="btn btn-primary btn-large">
                <Mail size={20} />
                Get in Touch
              </a>
              
              <div className="contact-links">
                <a href={CONFIG.social.linkedin} className="contact-link" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                  <span>Connect on LinkedIn</span>
                </a>
                <a href={CONFIG.social.github} className="contact-link" target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                  <span>Follow on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// FOOTER COMPONENT
// ==========================================
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-text">
            <p className="footer-name">© {new Date().getFullYear()} {CONFIG.name}</p>
            <p className="footer-built">Designed & Built with React + Framer Motion</p>
          </div>
          <div className="footer-links">
            <a href={CONFIG.social.github} target="_blank" rel="noopener noreferrer">
              <Github size={18} />
            </a>
            <a href={CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${CONFIG.social.email}`}>
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// STYLES
// ==========================================
const styles = `
  /* Import Premium Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    /* Colors */
    --bg-dark: #0d0d12;
    --bg-darker: #08080a;
    --bg-card: #16161d;
    --text-primary: #f5f5f7;
    --text-secondary: #8e8e93;
    --text-tertiary: #636366;
    --accent-primary: #ff6b6b;
    --accent-secondary: #4ecdc4;
    --accent-purple: #a78bfa;
    --accent-gold: #fbbf24;
    --border-subtle: rgba(255, 255, 255, 0.08);
    --border-medium: rgba(255, 255, 255, 0.12);
    
    /* Glass Effect */
    --glass-bg: rgba(22, 22, 29, 0.6);
    --glass-border: rgba(255, 255, 255, 0.1);
    
    /* Typography */
    --font-display: 'Playfair Display', serif;
    --font-body: 'Inter', -apple-system, sans-serif;
    
    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 4rem;
    --spacing-xl: 6rem;
    --spacing-2xl: 8rem;
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-base: 0.3s ease;
    --transition-slow: 0.5s ease;
  }

  body {
    font-family: var(--font-body);
    background: var(--bg-dark);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: var(--accent-primary);
    color: white;
  }

  .portfolio {
    position: relative;
    min-height: 100vh;
  }

  /* ==========================================
     PROGRESS BAR
     ========================================== */
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-purple));
    transform-origin: 0%;
    z-index: 9999;
  }

  /* ==========================================
     BACKGROUND & EFFECTS
     ========================================== */
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
  }

  .mesh-gradient {
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(at 20% 30%, rgba(255, 107, 107, 0.15) 0px, transparent 50%),
      radial-gradient(at 80% 20%, rgba(167, 139, 250, 0.15) 0px, transparent 50%),
      radial-gradient(at 50% 80%, rgba(78, 205, 196, 0.15) 0px, transparent 50%),
      radial-gradient(at 90% 70%, rgba(251, 191, 36, 0.1) 0px, transparent 50%);
    filter: blur(60px);
  }

  .floating-shapes {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.08;
    animation: float 25s ease-in-out infinite;
  }

  .shape-1 {
    width: 500px;
    height: 500px;
    background: var(--accent-primary);
    top: 10%;
    left: 5%;
    animation-delay: 0s;
  }

  .shape-2 {
    width: 400px;
    height: 400px;
    background: var(--accent-purple);
    bottom: 20%;
    right: 10%;
    animation-delay: -8s;
  }

  .shape-3 {
    width: 350px;
    height: 350px;
    background: var(--accent-secondary);
    top: 50%;
    left: 50%;
    animation-delay: -16s;
  }

  .shape-4 {
    width: 300px;
    height: 300px;
    background: var(--accent-gold);
    bottom: 10%;
    left: 20%;
    animation-delay: -24s;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(50px, -80px) rotate(120deg); }
    66% { transform: translate(-30px, 60px) rotate(240deg); }
  }

  /* ==========================================
     NAVIGATION
     ========================================== */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(13, 13, 18, 0.6);
    backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid var(--border-subtle);
    transition: all var(--transition-base);
  }

  .navbar.scrolled {
    background: rgba(13, 13, 18, 0.85);
    border-bottom-color: var(--border-medium);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  }

  .nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.25rem 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    font-weight: 700;
    cursor: pointer;
    color: var(--text-primary);
  }

  .logo-initial {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    border-radius: 8px;
    font-weight: 800;
  }

  .logo-text {
    font-family: var(--font-display);
    letter-spacing: -0.02em;
  }

  .nav-menu {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }

  .nav-menu button {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: color var(--transition-base);
    font-family: inherit;
    position: relative;
    padding: 0.25rem 0;
  }

  .nav-menu button:hover {
    color: var(--text-primary);
  }

  .nav-menu button.active {
    color: var(--accent-primary);
  }

  .nav-menu button.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--accent-primary);
    border-radius: 2px;
  }

  .mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    padding: 0.5rem;
  }

  .mobile-menu {
    flex-direction: column;
    gap: 0;
    padding: 1rem 2.5rem 2rem;
    background: rgba(13, 13, 18, 0.95);
  }

  .mobile-menu li {
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-subtle);
  }

  /* ==========================================
     LAYOUT
     ========================================== */
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2.5rem;
  }

  .section {
    padding: var(--spacing-xl) 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    margin-bottom: var(--spacing-lg);
    text-align: center;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ==========================================
     HERO SECTION
     ========================================== */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 80px;
    position: relative;
  }

  .hero-content {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2.5rem;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .hero-text {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 50px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--accent-secondary);
    width: fit-content;
    backdrop-filter: blur(10px);
  }

  .badge-dot {
    width: 8px;
    height: 8px;
    background: var(--accent-secondary);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 5rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin: 0;
  }

  .hero-title {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: var(--accent-primary);
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .hero-tagline {
    font-family: var(--font-display);
    font-size: clamp(1.25rem, 2vw, 1.75rem);
    color: var(--text-secondary);
    font-weight: 500;
    font-style: italic;
  }

  .hero-bio {
    font-size: clamp(1rem, 1.5vw, 1.125rem);
    color: var(--text-secondary);
    line-height: 1.7;
    max-width: 600px;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  .hero-socials {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 50%;
    color: var(--text-secondary);
    transition: all var(--transition-base);
    text-decoration: none;
  }

  .social-icon:hover {
    background: var(--accent-primary);
    color: white;
    border-color: var(--accent-primary);
    transform: translateY(-2px);
  }

  /* Hero Image */
  .hero-image-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hero-image-glow {
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, var(--accent-primary) 0%, transparent 70%);
    filter: blur(80px);
    opacity: 0.3;
    z-index: 0;
  }

  .hero-image-container {
    position: relative;
    width: 400px;
    height: 400px;
    z-index: 1;
  }

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    border: 3px solid var(--border-medium);
    background: var(--bg-card);
    animation: morph 8s ease-in-out infinite;
  }

  @keyframes morph {
    0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
    50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
  }

  .image-border {
    position: absolute;
    inset: -4px;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-purple));
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    z-index: -1;
    opacity: 0.5;
    filter: blur(20px);
    animation: morph 8s ease-in-out infinite;
  }

  .floating-card {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: floatCard 3s ease-in-out infinite;
  }

  .floating-card svg {
    color: var(--accent-primary);
  }

  .card-1 {
    top: 10%;
    left: -10%;
    animation-delay: 0s;
  }

  .card-2 {
    bottom: 15%;
    right: -10%;
    animation-delay: 1.5s;
  }

  @keyframes floatCard {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }

  /* ==========================================
     BUTTONS
     ========================================== */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all var(--transition-base);
    font-family: inherit;
    text-decoration: none;
    white-space: nowrap;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--accent-primary), #ff8787);
    color: white;
    box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(255, 107, 107, 0.4);
  }

  .btn-secondary {
    background: var(--glass-bg);
    color: var(--text-primary);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(10px);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--border-medium);
    transform: translateY(-2px);
  }

  .btn-large {
    padding: 1.25rem 2.5rem;
    font-size: 1.125rem;
  }

  /* ==========================================
     ABOUT SECTION
     ========================================== */
  .about-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 3rem;
  }

  .about-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .about-text-block h3 {
    font-family: var(--font-display);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--accent-primary);
  }

  .about-text-block p {
    font-size: 1.125rem;
    color: var(--text-secondary);
    line-height: 1.8;
  }

  .about-text-block strong {
    color: var(--text-primary);
    font-weight: 600;
  }

  .about-highlights {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .highlight-card {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 1.5rem;
  }

  .highlight-icon {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  .highlight-icon svg {
    color: white;
  }

  .highlight-card h4 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
  }

  .highlight-card p {
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  .highlight-card ul {
    list-style: none;
    padding: 0;
  }

  .highlight-card li {
    color: var(--text-secondary);
    font-size: 0.95rem;
    padding: 0.375rem 0;
    padding-left: 1.5rem;
    position: relative;
  }

  .highlight-card li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--accent-primary);
  }

  /* ==========================================
     EXPERTISE SECTION
     ========================================== */
  .expertise-section {
    background: linear-gradient(180deg, transparent 0%, rgba(255, 107, 107, 0.03) 50%, transparent 100%);
  }

  .expertise-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .expertise-card {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 2rem;
    transition: all var(--transition-base);
  }

  .expertise-card:hover {
    border-color: var(--accent-primary);
    box-shadow: 0 10px 40px rgba(255, 107, 107, 0.2);
  }

  .expertise-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    border-radius: 16px;
    margin-bottom: 1.5rem;
  }

  .expertise-icon svg {
    color: white;
  }

  .expertise-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }

  .expertise-description {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }

  .expertise-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-pill {
    padding: 0.375rem 0.875rem;
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.2);
    border-radius: 20px;
    font-size: 0.875rem;
    color: var(--text-primary);
    font-weight: 500;
  }

  /* ==========================================
     SKILLS SECTION
     ========================================== */
  .skills-container {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .skill-category-block {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 2rem;
  }

  .skill-category-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    color: var(--accent-secondary);
    font-family: var(--font-display);
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .skill-tag-enhanced {
    padding: 0.625rem 1.25rem;
    background: rgba(78, 205, 196, 0.08);
    border: 1px solid rgba(78, 205, 196, 0.2);
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-primary);
    transition: all var(--transition-base);
    cursor: default;
  }

  .skill-tag-enhanced:hover {
    background: rgba(78, 205, 196, 0.15);
    border-color: var(--accent-secondary);
    box-shadow: 0 4px 15px rgba(78, 205, 196, 0.2);
  }

  /* ==========================================
     PROJECTS SECTION
     ========================================== */
  .projects-section {
    background: linear-gradient(180deg, transparent 0%, rgba(78, 205, 196, 0.03) 50%, transparent 100%);
  }

  .project-filters {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 0.625rem 1.5rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 10px;
    color: var(--text-secondary);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-base);
    font-family: inherit;
  }

  .filter-btn:hover {
    color: var(--text-primary);
    border-color: var(--border-medium);
  }

  .filter-btn.active {
    background: var(--accent-primary);
    color: white;
    border-color: var(--accent-primary);
  }

  .projects-grid-enhanced {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }

  .project-card-enhanced {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 2rem;
    cursor: pointer;
    transition: all var(--transition-base);
    position: relative;
    overflow: hidden;
  }

  .project-card-enhanced::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    opacity: 0;
    transition: opacity var(--transition-base);
  }

  .project-card-enhanced:hover::before {
    opacity: 1;
  }

  .project-card-enhanced:hover {
    border-color: var(--accent-primary);
    box-shadow: 0 15px 50px rgba(255, 107, 107, 0.2);
  }

  .project-card-enhanced.featured {
    border-color: rgba(251, 191, 36, 0.3);
  }

  .featured-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.875rem;
    background: rgba(251, 191, 36, 0.15);
    border: 1px solid rgba(251, 191, 36, 0.3);
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent-gold);
    margin-bottom: 1rem;
  }

  .project-header {
    margin-bottom: 1rem;
  }

  .project-title-enhanced {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .project-category {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: rgba(167, 139, 250, 0.1);
    border-radius: 6px;
    font-size: 0.8rem;
    color: var(--accent-purple);
    font-weight: 500;
  }

  .project-description-enhanced {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .project-tech-enhanced {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .tech-badge {
    padding: 0.375rem 0.875rem;
    background: rgba(59, 130, 246, 0.08);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 8px;
    font-size: 0.8rem;
    color: var(--text-primary);
    font-weight: 500;
  }

  .tech-badge.more {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--border-subtle);
    color: var(--text-secondary);
  }

  .project-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--border-subtle);
  }

  .project-highlights-preview {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .highlight-dot {
    font-size: 0.75rem;
    color: var(--text-tertiary);
  }

  .view-details-btn {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1rem;
    background: transparent;
    border: 1px solid var(--border-medium);
    border-radius: 8px;
    color: var(--accent-primary);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-base);
    font-family: inherit;
  }

  .view-details-btn:hover {
    background: var(--accent-primary);
    color: white;
    border-color: var(--accent-primary);
  }

  /* ==========================================
     PROJECT MODAL
     ========================================== */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(10px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .modal-content {
    background: var(--bg-card);
    border: 1px solid var(--border-medium);
    border-radius: 24px;
    max-width: 700px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }

  .modal-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 50%;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-base);
    z-index: 1;
  }

  .modal-close:hover {
    background: var(--accent-primary);
    color: white;
    border-color: var(--accent-primary);
  }

  .modal-header {
    padding: 2.5rem 2.5rem 1.5rem;
    border-bottom: 1px solid var(--border-subtle);
  }

  .modal-header h2 {
    font-family: var(--font-display);
    font-size: 2rem;
    margin-bottom: 0.75rem;
    padding-right: 3rem;
  }

  .modal-category {
    display: inline-block;
    padding: 0.375rem 1rem;
    background: rgba(167, 139, 250, 0.1);
    border-radius: 8px;
    font-size: 0.875rem;
    color: var(--accent-purple);
    font-weight: 500;
  }

  .modal-body {
    padding: 2rem 2.5rem 2.5rem;
  }

  .modal-description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }

  .modal-section {
    margin-bottom: 2rem;
  }

  .modal-section h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--accent-primary);
  }

  .modal-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .tech-badge-large {
    padding: 0.625rem 1.25rem;
    background: rgba(59, 130, 246, 0.08);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 10px;
    font-size: 0.95rem;
    color: var(--text-primary);
    font-weight: 500;
  }

  .modal-highlights {
    list-style: none;
    padding: 0;
  }

  .modal-highlights li {
    padding: 0.75rem 0;
    padding-left: 1.5rem;
    color: var(--text-secondary);
    position: relative;
    line-height: 1.6;
  }

  .modal-highlights li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--accent-secondary);
    font-weight: bold;
  }

  .modal-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-subtle);
  }

  /* ==========================================
     ACHIEVEMENTS SECTION
     ========================================== */
  .achievements-section {
    padding: var(--spacing-lg) 0;
    min-height: auto;
  }

  .achievements-wrapper {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    padding: 3rem;
    text-align: center;
  }

  .achievements-title {
    font-family: var(--font-display);
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--text-primary);
  }

  .achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .achievement-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    color: var(--text-secondary);
    transition: all var(--transition-base);
  }

  .achievement-item:hover {
    border-color: var(--accent-gold);
    background: rgba(251, 191, 36, 0.05);
  }

  .achievement-item svg {
    color: var(--accent-gold);
    flex-shrink: 0;
  }

  /* ==========================================
     CONTACT SECTION
     ========================================== */
  .contact-section {
    min-height: auto;
  }

  .contact-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }

  .contact-content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }

  .contact-text-block {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .contact-lead {
    font-size: 1.25rem;
    line-height: 1.7;
    color: var(--text-secondary);
  }

  .contact-lead strong {
    color: var(--text-primary);
    font-weight: 600;
  }

  .contact-secondary {
    font-size: 1rem;
    color: var(--text-tertiary);
    line-height: 1.7;
  }

  .contact-cta {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1.25rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    transition: all var(--transition-base);
  }

  .contact-link:hover {
    background: rgba(255, 255, 255, 0.08);
    color: var(--text-primary);
    border-color: var(--border-medium);
    transform: translateX(4px);
  }

  .contact-link svg {
    flex-shrink: 0;
  }

  /* ==========================================
     FOOTER
     ========================================== */
  .footer {
    padding: 3rem 0;
    border-top: 1px solid var(--border-subtle);
    background: rgba(0, 0, 0, 0.2);
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .footer-text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-name {
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .footer-built {
    font-size: 0.875rem;
    color: var(--text-tertiary);
  }

  .footer-links {
    display: flex;
    gap: 1rem;
  }

  .footer-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 50%;
    color: var(--text-secondary);
    transition: all var(--transition-base);
    text-decoration: none;
  }

  .footer-links a:hover {
    background: var(--accent-primary);
    color: white;
    border-color: var(--accent-primary);
    transform: translateY(-2px);
  }

  /* ==========================================
     RESPONSIVE
     ========================================== */
  @media (max-width: 1024px) {
    .hero-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .hero-image-wrapper {
      order: -1;
    }

    .hero-image-container {
      width: 300px;
      height: 300px;
    }

    .about-grid {
      grid-template-columns: 1fr;
    }

    .contact-content-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  @media (max-width: 768px) {
    .desktop-menu {
      display: none;
    }

    .mobile-menu-toggle {
      display: block;
    }

    .container {
      padding: 0 1.5rem;
    }

    .section {
      padding: var(--spacing-lg) 0;
      min-height: auto;
    }

    .section-title {
      font-size: 2rem;
      margin-bottom: var(--spacing-md);
    }

    .hero-content {
      padding: 0 1.5rem;
    }

    .expertise-grid {
      grid-template-columns: 1fr;
    }

    .projects-grid-enhanced {
      grid-template-columns: 1fr;
    }

    .achievements-grid {
      grid-template-columns: 1fr;
    }

    .modal-content {
      margin: 1rem;
    }

    .modal-header,
    .modal-body {
      padding: 2rem 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .hero-buttons {
      flex-direction: column;
      width: 100%;
    }

    .hero-buttons .btn {
      width: 100%;
      justify-content: center;
    }

    .nav-container {
      padding: 1rem 1.5rem;
    }

    .hero-image-container {
      width: 250px;
      height: 250px;
    }

    .floating-card {
      display: none;
    }
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-darker);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--border-medium);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent-primary);
  }
`;

