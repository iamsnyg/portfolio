'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Palette, Settings, Cloud, Database, Wrench, Star,
  ShoppingCart, CheckSquare, MessageCircle, CloudRain,
  Mail, Linkedin, Github, Twitter, Menu, X,
  Code2, Laptop, Rocket, TrendingUp, Instagram
} from 'lucide-react';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(end * progress));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}</span>;
};

// Animated Skill Bar Component
const SkillBar = ({ skill, level, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`mb-4 animate-slide-up`} style={{animationDelay: `${index * 0.1}s`}}>
      <div className="flex justify-between mb-2">
        <span className="text-gray-300 font-medium">{skill}</span>
        <span className="text-blue-400">{level}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-linear-to-r from-blue-500 to-cyan-500 h-full transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${level}%` : '0%',
          }}
        ></div>
      </div>
    </div>
  );
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ submitting: false, success: null, message: '' });
  const [toastVisible, setToastVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (submitStatus.message && toastVisible) {
      const timer = setTimeout(() => setToastVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus.message, toastVisible]);

  const skills = [
    { name: 'React', level: 95 },
    { name: 'Next.js', level: 90 },
    { name: 'Node.js', level: 88 },
    { name: 'Docker', level: 85 },
    { name: 'Kubernetes', level: 82 },
    { name: 'TypeScript', level: 92 },
    { name: 'AWS', level: 80 },
    { name: 'PostgreSQL', level: 87 },
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Built during internship: Full-stack e-commerce application with product listings, shopping cart, and payment integration using Stripe.',
      tech: ['React', 'Node.js', 'MongoDB'],
      icon: ShoppingCart,
      color: 'from-purple-600 to-pink-600',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Learning project: Built a collaborative task management application with real-time updates, user authentication, and a clean UI.',
      tech: ['Next.js', 'Firebase', 'Tailwind CSS', 'REST API'],
      icon: CheckSquare,
      color: 'from-blue-600 to-cyan-600',
    },
    {
      id: 3,
      title: 'Real-Time Chat Application',
      description: 'Developed a chat application demonstrating WebSocket integration, user authentication, and real-time message delivery.',
      tech: ['Next.js', 'Node.js', 'PostgreSQL'],
      icon: MessageCircle,
      color: 'from-green-600 to-emerald-600',
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'Academic project integrating OpenWeather API to display real-time weather data with responsive design and location search.',
      tech: ['React', 'API Integration', 'Tailwind CSS', 'Geolocation'],
      icon: CloudRain,
      color: 'from-orange-600 to-red-600',
    },
  ];

  const experience = [
    {
      year: '2024 - Present',
      company: 'Tech Startup XYZ',
      position: 'Frontend Development Intern',
      description: 'Building responsive web interfaces with React. Learning modern web development practices and collaborating with senior developers.',
    },
    {
      year: '2024 Summer',
      company: 'Cloud Solutions Ltd',
      position: 'Backend Development Intern',
      description: 'Developed REST APIs with Node.js and worked with databases. Contributed to backend features and learned deployment practices.',
    },
    {
      year: '2023 - 2024',
      company: 'Self-Directed Learning',
      position: 'Developer in Training',
      description: 'Built personal projects to master full-stack development. Completed online courses and developed a strong foundation in web technologies.',
    },
  ];

  const techLogos = {
    // Only files that exist in /public
    'Next.js': '/Next.js.png',
    'Tailwind CSS': '/Tailwind CSS.png',
    JavaScript: '/JavaScript.png',
    HTML5: '/HTML5.png',
    CSS3: '/CSS3.png',
    Docker: '/Docker.png',
    Kubernetes: '/Kubernetes.png',
    AWS: '/AWS.png',
    Linux: '/Linux.png',
    MongoDB: '/MongoDB.png',
    Express: '/Express.png',
    Python: '/Python.png',
    GitLab: '/GitLab.png',
    Ansible: '/Ansible.png',
    'Argo CD': '/Argo CD.png',
    Jenkins: '/Jenkins.png',
    React: '/React.png',
    TypeScript: '/TypeScript.png',
    'Node.js': '/Node.js.png',
    PostgreSQL: '/PostgresSQL.png',
    'GitHub Actions': '/GitHub Actions.png',
    Terraform: '/HashiCorp Terraform.png',
    MySQL: '/MySQL.png',
    Git: '/Git.png',
  };

  const validateForm = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10) errs.message = 'Message should be at least 10 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitStatus({ submitting: true, success: null, message: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitStatus({ submitting: false, success: true, message: data.message || 'Thanks! I will reply soon.' });
        setForm({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        setSubmitStatus({ submitting: false, success: false, message: data.error || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      setSubmitStatus({ submitting: false, success: false, message: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="bg-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur ${scrolled ? 'bg-slate-900/95 shadow-lg shadow-blue-500/10 border-b border-slate-700' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
            iamsnyg
          </div>
          <div className="hidden md:flex gap-10 font-medium">
            {['Home', 'About', 'Projects', 'Contact'].map((item, idx) => (
              <a key={idx} href={`#${item.toLowerCase()}`} className="relative group hover:text-blue-400 transition">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
          <button className="px-6 py-2 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-105">
            Resume
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center pt-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-6  lg:px-8  w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-left">
              <div className="space-y-4">
                <p className="text-blue-400 font-semibold text-lg animate-fade-in">Welcome to my portfolio</p>
                <h1 className="text-6xl md:text-7xl font-bold leading-tight animate-slide-up" style={{animationDelay: '0.1s'}}>
                  Fresher <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">Full Stack</span> & <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">Cloud</span> Developer
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl animate-slide-up" style={{animationDelay: '0.2s'}}>
                  Building modern web applications and learning cloud infrastructure. Passionate about clean code, open source, and continuous learning.
                </p>
              </div>
              <div className="flex gap-4 animate-slide-up" style={{animationDelay: '0.3s'}}>
                <a href="#projects" className="px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition transform hover:scale-105 active:scale-95">
                  View My Work
                </a>
                <a href="#contact" className="px-8 py-4 border-2 border-blue-400/50 text-white rounded-lg font-semibold hover:border-blue-400 hover:bg-blue-400/10 transition transform hover:scale-105">
                  Get In Touch
                </a>
              </div>
              <div className="flex gap-6 pt-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
                {[
                  { Icon: Instagram, href: '' },
                  { Icon: Linkedin, href: 'https://www.linkedin.com/in/sunny-gupta-5691ab249/' },
                  { Icon: Github, href: '#' }
                ].map(({ Icon }, idx) => (
                  <a key={idx} href="#" className="text-gray-400 hover:text-blue-400 transition transform hover:scale-125 hover:-translate-y-1">
                    <Icon size={28} />
                  </a>
                ))}
              </div>
            </div>
            <div className="relative h-64 sm:h-72 md:h-96 animate-slide-right">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/25 to-cyan-500/25 rounded-full opacity-50 blur-2xl animate-glow"></div>
              <div className="relative mx-auto rounded-full bg-linear-to-br from-blue-600 to-cyan-600 flex items-center justify-center border-[0.5px] border-blue-500/30 animate-bounce-in overflow-hidden w-56 h-56 sm:w-64 sm:h-64 md:w-96 md:h-96">
                {/* Ambient radial glow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.25),transparent_60%)] blur-xl w-65 h-65 sm:w-80 sm:h-80 md:w-105 md:h-105"></div>
                {/* Spinning ambient glow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(34,211,238,0.18),transparent_25%,rgba(59,130,246,0.18),transparent_65%)] animate-[spin_18s_linear_infinite] blur-xl opacity-40 w-65 h-65 sm:w-80 sm:h-80 md:w-105 md:h-105"></div>
                {/* Spinning conic gradient ring */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(59,130,246,0.8),rgba(34,211,238,0.8),rgba(59,130,246,0.8))] animate-[spin_12s_linear_infinite] opacity-30 w-60 h-60 sm:w-75 sm:h-75 md:w-95 md:h-95"></div>
                {/* Mask to create ring thickness */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900/80 w-55 h-55 sm:w-70 sm:h-70 md:w-86 md:h-86"></div>
                <div className="absolute inset-3 sm:inset-4 md:inset-6 rounded-full border-[0.5px] border-cyan-200/40 blur-xl"></div>
                <Image
                  src="/iamsnyg.jpg"
                  alt="Portrait of Suraj"
                  width={360}
                  height={360}
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, 360px"
                  priority
                  className="relative z-10 object-cover rounded-full shadow-2xl shadow-cyan-500/30 border-[0.5px] border-cyan-100/60 w-55 h-55 sm:w-70 sm:h-70 md:w-90 md:h-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-linear-to-b from-slate-900/50 via-slate-950 to-slate-900/50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-slide-up">
            <span className="inline-block px-4 py-2 rounded-full bg-linear-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/50 text-blue-300 text-sm font-semibold mb-6">
              GET TO KNOW ME
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Building the future, one line of code at a time</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Left side - Bio */}
            <div className="space-y-6 animate-slide-left">
              {/* Main bio card with gradient border */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl opacity-75 group-hover:opacity-100 blur transition-opacity"></div>
                <div className="relative bg-slate-900 p-8 rounded-3xl border border-slate-700">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-linear-to-br from-blue-600 to-cyan-600 shadow-lg">
                      <Rocket size={28} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">My Journey</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg mb-4">
                    I'm a passionate fresher developer eager to launch my career in full-stack development and cloud technologies. I have a solid foundation in modern web development with hands-on experience through internships and personal projects.
                  </p>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    I'm actively learning and growing my expertise in React, Node.js, and cloud platforms. I love solving problems, building cool applications, and continuously expanding my technical skillset.
                  </p>
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 8, label: 'Projects Built', Icon: TrendingUp, gradient: 'from-purple-600 to-pink-600', bgGradient: 'from-purple-500/20 to-pink-500/20' },
                  { value: 4, label: 'Internships', Icon: Laptop, gradient: 'from-blue-600 to-cyan-600', bgGradient: 'from-blue-500/20 to-cyan-500/20' },
                ].map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="group relative overflow-hidden animate-count-up hover:scale-105 transition-transform duration-300" 
                    style={{animationDelay: `${idx * 0.1}s`}}
                  >
                    <div className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity`}></div>
                    <div className={`relative bg-linear-to-br ${stat.bgGradient} to-slate-800/40 p-6 rounded-2xl border border-slate-700/50 group-hover:border-slate-600 backdrop-blur-sm`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-linear-to-br ${stat.gradient}`}>
                          <stat.Icon size={20} className="text-white" />
                        </div>
                        <p className={`text-4xl font-bold bg-linear-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                          <AnimatedCounter end={stat.value} />
                          <span className="text-xl">+</span>
                        </p>
                      </div>
                      <p className="text-gray-300 font-semibold text-sm">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Skills */}
            <div className="space-y-6 animate-slide-right">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-linear-to-br from-purple-600 to-pink-600 shadow-lg">
                  <Code2 size={28} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">Technical Skills</h3>
              </div>
              
              <div className="space-y-6">
                {skills.map((skill, idx) => (
                  <div key={idx} className="animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-200 font-semibold text-lg">{skill.name}</span>
                      <span className="text-transparent bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text font-bold text-lg">{skill.level}%</span>
                    </div>
                    <div className="relative h-3 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700">
                      <div
                        className="h-full bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-1000 ease-out relative"
                        style={{
                          width: `${skill.level}%`,
                        }}
                      >
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                      <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-cyan-500 opacity-30 blur-md" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="animate-slide-up">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 text-purple-300 text-sm font-semibold mb-6">
                MY JOURNEY
              </span>
              <h3 className="text-4xl font-bold text-white mb-4">Work Experience</h3>
            </div>
            
            <div className="space-y-8 relative">
              {/* Timeline line with gradient */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500 via-purple-500 to-cyan-500 hidden md:block"></div>
              
              {experience.map((exp, idx) => (
                <div key={idx} className={`flex gap-6 pb-8 last:pb-0 animate-slide-up`} style={{animationDelay: `${idx * 0.1}s`}}>
                  <div className="shrink-0 hidden md:block">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-linear-to-br from-blue-600 via-purple-600 to-cyan-600 border-4 border-slate-900 relative z-10 hover:scale-125 transition shadow-lg shadow-blue-500/50">
                      <span className="text-white font-bold text-sm">{idx + 1}</span>
                    </div>
                  </div>
                  <div className="grow group relative">
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600/0 via-purple-600/0 to-cyan-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-cyan-600/10 rounded-2xl transition-all blur-xl"></div>
                    <div className="relative bg-slate-800/50 p-8 rounded-2xl border border-slate-700 group-hover:border-purple-500/50 transition-all backdrop-blur-sm">
                      <span className="inline-block px-3 py-1 rounded-full bg-linear-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 text-blue-300 text-xs font-semibold mb-3">{exp.year}</span>
                      <h4 className="text-2xl font-bold text-white mt-2 mb-1 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition">{exp.position}</h4>
                      <p className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                        {exp.company}
                      </p>
                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-400 to-cyan-400 mx-auto animate-gradient-shift rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className={`group bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 transition-all duration-300 cursor-pointer animate-slide-up`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                <div className={`h-48 bg-linear-to-br ${project.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                  <project.icon size={80} className="text-white" />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>
                <div className="p-8 relative">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600/0 to-cyan-600/0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"></div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition">{project.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIdx) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 bg-slate-700/50 text-gray-300 rounded-full text-sm font-medium border border-slate-600 hover:border-blue-500/50 transition transform hover:scale-110`}
                        style={{animationDelay: `${techIdx * 0.05}s`}}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-6">
                    {['View Live', 'GitHub'].map((label, linkIdx) => (
                      <a
                        key={linkIdx}
                        href="#"
                        className="text-blue-400 font-semibold hover:text-cyan-400 transition flex items-center gap-2 group/link"
                      >
                        {label}
                        <span className="group-hover/link:translate-x-1 transition">→</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section - Modern Cards */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Technologies & Tools
            </h2>
            <p className="text-gray-400 text-lg">Expertise in modern web development, cloud infrastructure, and DevOps</p>
          </div>

          {/* Tech Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Frontend',
                description: 'Building responsive and interactive UIs',
                items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
                gradient: 'from-blue-600 to-cyan-500',
                Icon: Palette
              },
              {
                title: 'Backend',
                description: 'Scalable server-side development',
                items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Python', 'REST APIs'],
                gradient: 'from-purple-600 to-pink-500',
                Icon: Settings
              },
              {
                title: 'Cloud & DevOps',
                description: 'Infrastructure and deployment',
                items: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Linux', 'Terraform'],
                gradient: 'from-orange-600 to-red-500',
                Icon: Cloud
              },
              {
                title: 'Databases',
                description: 'Data storage and management',
                items: ['MongoDB', 'PostgreSQL', 'MySQL'],
                gradient: 'from-green-600 to-emerald-500',
                Icon: Database
              },
              {
                title: 'Tools',
                description: 'Development productivity tools',
                items: ['Git', 'VS Code', 'Postman'],
                gradient: 'from-indigo-600 to-purple-500',
                Icon: Wrench
              },
              {
                title: 'Other Skills',
                description: 'Additional technical expertise',
                items: [ 'Testing', 'CI/CD',  'API Design'],
                gradient: 'from-pink-600 to-rose-500',
                Icon: Star
              }
            ].map((category, idx) => (
              <div
                key={idx}
                className="group relative animate-slide-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                {/* Gradient Border */}
                <div className={`absolute inset-0 bg-linear-to-br ${category.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Card Content */}
                <div className="relative bg-slate-900 rounded-2xl p-8 h-full border border-slate-800 group-hover:border-transparent transition-all duration-300">
                  {/* Icon */}
                  <category.Icon size={48} className="mb-4 text-white" />
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all">
                    {category.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-6 group-hover:text-gray-300 transition">
                    {category.description}
                  </p>
                  
                  {/* Tech Items */}
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => {
                      const logoSrc = techLogos[item];
                      if (!logoSrc) return null;
                      return (
                        <div
                          key={item}
                          className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 text-gray-100 text-xs font-semibold rounded-lg border border-slate-700 group-hover:border-slate-600 group-hover:bg-slate-700/60 transition-all duration-300"
                        >
                          <div className="w-8 h-8 flex items-center justify-center bg-slate-900 rounded-md overflow-hidden border border-slate-700/60">
                            <Image src={logoSrc} alt={`${item} logo`} width={32} height={32} className="object-contain" />
                          </div>
                          <span className="text-sm font-semibold text-gray-200">{item}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${category.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Skills Summary */}
          <div className="mt-20 pt-16 border-t border-slate-800">
            <h3 className="text-3xl font-bold text-white mb-12 text-center">Skill Proficiency</h3>
            <div className="grid md:grid-cols-2 gap-12">
              {[
                { skill: 'Frontend Development', level: 95, color: 'from-blue-600 to-cyan-500' },
                { skill: 'Backend Development', level: 88, color: 'from-purple-600 to-pink-500' },
                { skill: 'Cloud & DevOps', level: 85, color: 'from-orange-600 to-red-500' },
                { skill: 'Database Design', level: 82, color: 'from-green-600 to-emerald-500' },
              ].map((item, idx) => (
                <div key={idx} className="group animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-200">{item.skill}</h4>
                    <span className={`text-lg font-bold bg-linear-to-r ${item.color} bg-clip-text text-transparent`}>{item.level}%</span>
                  </div>
                  <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div
                      className={`h-full bg-linear-to-r ${item.color} shadow-lg transition-all duration-1000 ease-out`}
                      style={{ width: `${item.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl font-bold mb-4">Let's Work Together</h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-400 to-cyan-400 mx-auto animate-gradient-shift rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8 animate-slide-left">
              <p className="text-xl text-gray-400 leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. Feel free to reach out through any of these channels.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: Mail, label: 'Email', value: 'sunnygupta6497@gmail.com', href: 'mailto:sunnygupta6497@gmail.com' },
                  { Icon: Linkedin, label: 'LinkedIn', value: 'www.linkedin.com/in/sunny-gupta-5691ab249', href: "https://www.linkedin.com/in/sunny-gupta-5691ab249/" },
                  { Icon: Github, label: 'GitHub', value: 'iamsnyg', href: 'https://github.com/iamsnyg' },
                  // { Icon: Twitter, label: 'Twitter', value: '@suraj_dev', href: '#' },
                  { Icon: Instagram, label: 'Instagram', value: '@iamsnyg', href: '#' },
                ].map((contact, idx) => (
                  <a
                    key={idx}
                    href={contact.href}
                    className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 transition group transform hover:scale-105 hover:-translate-y-1 animate-slide-up"
                    style={{animationDelay: `${idx * 0.1}s`}}
                  >
                    <contact.Icon size={32} className="text-blue-400 transform group-hover:scale-125 transition" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{contact.label}</p>
                      <p className="text-gray-300 font-semibold group-hover:text-blue-400 transition">{contact.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <form
              className="space-y-6 bg-slate-800/50 p-8 rounded-2xl border border-slate-700 animate-slide-right hover:border-blue-500/30 transition"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                  className={`w-full px-4 py-3 bg-slate-700/50 border ${errors.name ? 'border-red-500' : 'border-slate-600'} text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                  className={`w-full px-4 py-3 bg-slate-700/50 border ${errors.email ? 'border-red-500' : 'border-slate-600'} text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  aria-invalid={!!errors.message}
                  aria-describedby="message-error"
                  className={`w-full px-4 py-3 bg-slate-700/50 border ${errors.message ? 'border-red-500' : 'border-slate-600'} text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none`}
                ></textarea>
                {errors.message && (
                  <p id="message-error" className="mt-2 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {submitStatus.message && toastVisible && (
                <div className={`p-4 rounded-lg text-sm flex items-center justify-between ${submitStatus.success ? 'bg-green-900/30 text-green-300 border border-green-700/50' : 'bg-red-900/30 text-red-300 border border-red-700/50'}`}>
                  <span>{submitStatus.message}</span>
                  <button
                    type="button"
                    onClick={() => setToastVisible(false)}
                    className="ml-4 font-bold hover:opacity-70 transition"
                    aria-label="Close notification"
                  >
                    ✕
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={submitStatus.submitting}
                className={`w-full px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg transition transform active:scale-95 ${submitStatus.submitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105'}`}
              >
                {submitStatus.submitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-gray-400 py-12 border-t border-slate-800 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              { title: 'Suraj', desc: 'Full Stack Developer & DevOps Engineer' },
              { title: 'Quick Links', links: ['Home', 'About', 'Projects'] },
              { title: 'Social', links: ['Twitter', 'GitHub', 'LinkedIn'] },
            ].map((col, idx) => (
              <div key={idx} className="hover:translate-y-2 transition">
                <p className="font-semibold text-white mb-2 md:mb-4">{col.title}</p>
                {col.desc && <p className="text-sm">{col.desc}</p>}
                {col.links && (
                  <div className="space-y-2 text-sm">
                    {col.links.map((link) => (
                      <p key={link}>
                        <a href="#" className="hover:text-blue-400 transition">
                          {link}
                        </a>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm hover:text-blue-400 transition">
            <p>© 2025 Suraj. All rights reserved. </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


