import { useState, useEffect, useRef } from "react";
import "@/App.scss";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Menu, X, ArrowRight, CheckCircle, Code, Smartphone, Palette, TrendingUp, Cpu, Mail, Phone, MapPin, Star, ChevronRight, Award, Users, Globe, Clock } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Dummy Data
const DUMMY_PROJECTS = [
  {
    id: "1",
    title: "FinTech Mobile Banking App",
    client: "Global Bank Inc.",
    category: "mobile",
    description: "A comprehensive mobile banking solution with biometric authentication, real-time transactions, and AI-powered financial insights.",
    challenge: "Complex security requirements and real-time transaction processing",
    solution: "Implemented end-to-end encryption with biometric auth",
    results: "500K+ downloads, 4.8★ rating, 40% increase in digital transactions",
    technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
    image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
    featured: true
  },
  {
    id: "2",
    title: "E-Commerce Platform Redesign",
    client: "Fashion Forward",
    category: "web",
    description: "Complete UX overhaul and development of a scalable e-commerce platform with AI-powered product recommendations.",
    challenge: "Poor user experience leading to high cart abandonment rates",
    solution: "User-centered design approach with A/B testing",
    results: "65% increase in conversions, 50% reduction in cart abandonment",
    technologies: ["React", "Next.js", "Stripe", "PostgreSQL"],
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    featured: true
  },
  {
    id: "3",
    title: "Healthcare Patient Portal",
    client: "MediCare Solutions",
    category: "web",
    description: "HIPAA-compliant patient portal for appointment scheduling, telemedicine, and medical records access.",
    challenge: "Strict compliance requirements and complex integrations",
    solution: "Built secure, scalable architecture with third-party integrations",
    results: "100K+ active users, 99.9% uptime, HIPAA certified",
    technologies: ["Angular", "Python", "AWS", "PostgreSQL"],
    image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    featured: true
  },
  {
    id: "4",
    title: "Food Delivery Mobile App",
    client: "QuickBite",
    category: "mobile",
    description: "On-demand food delivery app with real-time tracking, smart routing, and integrated payment solutions.",
    challenge: "Real-time coordination between customers, restaurants, and drivers",
    solution: "WebSocket-based real-time communication and GPS integration",
    results: "250K+ orders/month, 15-min avg delivery time, 4.7★ rating",
    technologies: ["Flutter", "Node.js", "Redis", "Google Maps API"],
    image_url: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800",
    featured: true
  },
  {
    id: "5",
    title: "AI-Powered CRM System",
    client: "SalesTech Pro",
    category: "web",
    description: "Enterprise CRM with AI-driven lead scoring, automated workflows, and predictive analytics.",
    challenge: "Manual processes and lack of data-driven insights",
    solution: "ML-powered automation and predictive modeling",
    results: "3x faster lead response, 45% increase in sales productivity",
    technologies: ["React", "Python", "TensorFlow", "MongoDB"],
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    featured: true
  },
  {
    id: "6",
    title: "Smart Home IoT Platform",
    client: "HomeTech Innovations",
    category: "ux",
    description: "Unified platform for controlling smart home devices with voice commands and automation.",
    challenge: "Fragmented device ecosystem and complex user interface",
    solution: "Created intuitive UI with unified control center",
    results: "1M+ connected devices, 4.9★ user satisfaction",
    technologies: ["React Native", "IoT", "AWS IoT", "Alexa SDK"],
    image_url: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800",
    featured: true
  }
];

const DUMMY_TESTIMONIALS = [
  {
    id: "1",
    client_name: "Sarah Johnson",
    company: "TechCorp International",
    role: "CTO",
    content: "DevAgency transformed our digital presence completely. Their team's expertise in modern technologies and dedication to quality is unmatched. The mobile app they developed exceeded all our expectations.",
    rating: 5,
    image_url: null
  },
  {
    id: "2",
    client_name: "Michael Chen",
    company: "RetailMax",
    role: "VP of Digital",
    content: "Working with DevAgency was a game-changer for our e-commerce platform. They delivered a solution that not only looks stunning but also increased our conversion rates by 65%. Highly recommended!",
    rating: 5,
    image_url: null
  },
  {
    id: "3",
    client_name: "Emily Rodriguez",
    company: "HealthFirst",
    role: "Product Manager",
    content: "The patient portal DevAgency built for us is exceptional. They understood our complex compliance requirements and delivered a HIPAA-compliant solution that our patients love. Outstanding work!",
    rating: 5,
    image_url: null
  },
  {
    id: "4",
    client_name: "David Park",
    company: "FinanceHub",
    role: "CEO",
    content: "DevAgency's attention to detail and commitment to security made them the perfect partner for our fintech app. The result is a robust, user-friendly platform that our customers trust.",
    rating: 5,
    image_url: null
  },
  {
    id: "5",
    client_name: "Lisa Thompson",
    company: "MarketingPro",
    role: "Marketing Director",
    content: "The SEO and digital marketing strategies DevAgency implemented tripled our organic traffic in just 6 months. Their team is knowledgeable, responsive, and truly cares about results.",
    rating: 5,
    image_url: null
  },
  {
    id: "6",
    client_name: "James Williams",
    company: "StartupX",
    role: "Founder",
    content: "As a startup, we needed a reliable tech partner who could scale with us. DevAgency delivered beyond expectations, providing both technical excellence and strategic guidance.",
    rating: 5,
    image_url: null
  }
];

const DUMMY_BLOG_POSTS = [
  {
    id: "1",
    title: "The Future of Progressive Web Apps in 2024",
    slug: "future-of-pwa-2024",
    author: "Alex Martinez",
    category: "web-development",
    excerpt: "Explore how PWAs are revolutionizing mobile experiences with offline capabilities, push notifications, and app-like performance without the App Store.",
    content: "Full article content...",
    image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    published: true
  },
  {
    id: "2",
    title: "10 UX Design Principles Every Developer Should Know",
    slug: "ux-design-principles",
    author: "Sophie Chen",
    category: "ux-design",
    excerpt: "Understanding core UX principles can dramatically improve your development process. Learn the essential design patterns that create intuitive user experiences.",
    content: "Full article content...",
    image_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    published: true
  },
  {
    id: "3",
    title: "React Native vs Flutter: A 2024 Comparison",
    slug: "react-native-vs-flutter",
    author: "Ryan Kumar",
    category: "mobile",
    excerpt: "An in-depth comparison of the two leading cross-platform frameworks. Which one should you choose for your next mobile project?",
    content: "Full article content...",
    image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    published: true
  }
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState(DUMMY_PROJECTS);
  const [testimonials, setTestimonials] = useState(DUMMY_TESTIMONIALS);
  const [blogPosts, setBlogPosts] = useState(DUMMY_BLOG_POSTS);
  const [contactForm, setContactForm] = useState({ name: "", email: "", company: "", phone: "", message: "", service_interest: "" });
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", company: "", phone: "", project_type: "", budget: "", timeline: "", description: "" });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Reveal animations on scroll
      const reveals = document.querySelectorAll('.scroll-reveal');
      reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          element.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/contacts`, contactForm);
      toast.success("Thank you! We'll get back to you within 24 hours.");
      setContactForm({ name: "", email: "", company: "", phone: "", message: "", service_interest: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/quotes`, quoteForm);
      toast.success("Quote request submitted! Our team will contact you shortly.");
      setQuoteForm({ name: "", email: "", company: "", phone: "", project_type: "", budget: "", timeline: "", description: "" });
    } catch (error) {
      toast.error("Failed to submit quote request. Please try again.");
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/newsletter`, { email: newsletterEmail });
      toast.success("Successfully subscribed! Check your inbox for confirmation.");
      setNewsletterEmail("");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to subscribe. Please try again.");
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const services = [
    {
      icon: <Code className="w-10 h-10" />,
      title: "Web Development",
      description: "Build scalable, high-performance web applications using cutting-edge technologies. From single-page apps to complex enterprise solutions.",
      technologies: ["React", "Next.js", "Node.js", "Python", "PHP", "MongoDB"]
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile solutions that deliver exceptional user experiences on iOS and Android devices.",
      technologies: ["React Native", "Flutter", "iOS", "Android", "Xamarin"]
    },
    {
      icon: <Palette className="w-10 h-10" />,
      title: "UX/UI Design",
      description: "Create intuitive, engaging user experiences through research-driven design, prototyping, and continuous iteration.",
      technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle"]
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Digital Marketing",
      description: "Drive growth with data-driven marketing strategies including SEO, content marketing, and social media campaigns.",
      technologies: ["SEO", "Google Ads", "Social Media", "Email Marketing", "Analytics"]
    },
    {
      icon: <Cpu className="w-10 h-10" />,
      title: "Emerging Technologies",
      description: "Stay ahead with cutting-edge solutions in AI, IoT, AR/VR, and blockchain to future-proof your business.",
      technologies: ["AI/ML", "IoT", "AR/VR", "Blockchain", "Big Data"]
    }
  ];

  const techStack = [
    { category: "Frontend", items: ["React", "Angular", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "Python", "PHP", "Java", ".NET", "Ruby"] },
    { category: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin", "Xamarin"] },
    { category: "Database", items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "DynamoDB"] },
    { category: "Cloud & DevOps", items: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "CI/CD"] },
    { category: "CMS & Tools", items: ["WordPress", "Drupal", "Contentful", "Strapi", "Sanity", "Shopify"] }
  ];

  const clientLogos = [
    "TechCorp", "RetailMax", "HealthFirst", "FinanceHub", "MarketingPro", "StartupX", "GlobalBank", "FashionForward"
  ];

  return (
    <div className="App">
      <div className="animated-bg"></div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 ${scrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold gradient-text" data-testid="logo">DevAgency</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection("home")} className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} data-testid="nav-home">Home</button>
              <button onClick={() => scrollToSection("services")} className={`nav-link ${activeSection === 'services' ? 'active' : ''}`} data-testid="nav-services">Services</button>
              <button onClick={() => scrollToSection("portfolio")} className={`nav-link ${activeSection === 'portfolio' ? 'active' : ''}`} data-testid="nav-portfolio">Portfolio</button>
              <button onClick={() => scrollToSection("about")} className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} data-testid="nav-about">About</button>
              <button onClick={() => scrollToSection("blog")} className={`nav-link ${activeSection === 'blog' ? 'active' : ''}`} data-testid="nav-blog">Blog</button>
              <button onClick={() => scrollToSection("contact")} className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} data-testid="nav-contact">Contact</button>
            </div>

            <div className="hidden md:block">
              <Button onClick={() => scrollToSection("quote")} className="bg-blue-600 hover:bg-blue-700 btn-primary" data-testid="nav-quote-btn">
                Get a Quote
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="mobile-menu-toggle">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t" data-testid="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection("home")} className="mobile-nav-link" data-testid="mobile-nav-home">Home</button>
              <button onClick={() => scrollToSection("services")} className="mobile-nav-link" data-testid="mobile-nav-services">Services</button>
              <button onClick={() => scrollToSection("portfolio")} className="mobile-nav-link" data-testid="mobile-nav-portfolio">Portfolio</button>
              <button onClick={() => scrollToSection("about")} className="mobile-nav-link" data-testid="mobile-nav-about">About</button>
              <button onClick={() => scrollToSection("blog")} className="mobile-nav-link" data-testid="mobile-nav-blog">Blog</button>
              <button onClick={() => scrollToSection("contact")} className="mobile-nav-link" data-testid="mobile-nav-contact">Contact</button>
              <Button onClick={() => scrollToSection("quote")} className="w-full bg-blue-600 hover:bg-blue-700" data-testid="mobile-nav-quote-btn">
                Get a Quote
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section" data-testid="hero-section">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 hero-content">
          <div className="text-center">
            <div className="hero-title">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" data-testid="hero-title">
                Transforming Ideas Into
                <span className="block gradient-text">
                  Digital Excellence
                </span>
              </h1>
            </div>
            <div className="hero-description">
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="hero-description">
                Award-winning web & mobile development agency delivering innovative, scalable solutions across 70+ countries since 2011. Let's build something extraordinary together.
              </p>
            </div>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection("contact")} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg btn-primary" data-testid="hero-cta-primary">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("portfolio")} className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg" data-testid="hero-cta-secondary">
                View Our Work
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center" data-testid="trust-indicators">
            <div className="scroll-reveal">
              <div className="stat-number" data-testid="stat-projects">500+</div>
              <div className="text-sm text-gray-600 font-medium mt-2">Projects Delivered</div>
            </div>
            <div className="scroll-reveal">
              <div className="stat-number" data-testid="stat-countries">70+</div>
              <div className="text-sm text-gray-600 font-medium mt-2">Countries Served</div>
            </div>
            <div className="scroll-reveal">
              <div className="stat-number" data-testid="stat-awards">25+</div>
              <div className="text-sm text-gray-600 font-medium mt-2">International Awards</div>
            </div>
            <div className="scroll-reveal">
              <div className="stat-number" data-testid="stat-years">13+</div>
              <div className="text-sm text-gray-600 font-medium mt-2">Years Experience</div>
            </div>
          </div>

          {/* Client Logos */}
          <div className="mt-20 scroll-reveal">
            <p className="text-center text-gray-500 mb-8 text-sm uppercase tracking-wider font-semibold">Trusted by Leading Companies</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              {clientLogos.map((logo, idx) => (
                <div key={idx} className="text-gray-600 font-semibold text-lg hover:text-blue-600 transition-colors duration-300">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="section-title" data-testid="services-title">Our Services</h2>
            <p className="section-description mt-6" data-testid="services-description">
              Comprehensive digital solutions tailored to your business needs. From concept to deployment, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="service-card scroll-reveal" style={{transitionDelay: `${index * 100}ms`}} data-testid={`service-card-${index}`}>
                <CardHeader>
                  <div className="mb-6 text-blue-600 service-icon" data-testid={`service-icon-${index}`}>{service.icon}</div>
                  <CardTitle className="text-xl mb-3 font-bold" data-testid={`service-title-${index}`}>{service.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-gray-600" data-testid={`service-description-${index}`}>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs tech-badge" data-testid={`service-tech-${index}-${idx}`}>{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-gray-50" data-testid="portfolio-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="section-title" data-testid="portfolio-title">Our Work</h2>
            <p className="section-description mt-6" data-testid="portfolio-description">
              Showcasing our best projects and success stories. Real results for real businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={project.id} className="portfolio-card scroll-reveal" style={{transitionDelay: `${index * 100}ms`}} data-testid={`portfolio-card-${index}`}>
                <div className="portfolio-image-wrapper aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 rounded-t-lg overflow-hidden" data-testid={`portfolio-image-${index}`}>
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                  <div className="portfolio-overlay">
                    <span className="view-project">View Project →</span>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-3">
                    <Badge className="capitalize" data-testid={`portfolio-category-${index}`}>{project.category}</Badge>
                  </div>
                  <CardTitle className="text-lg font-bold" data-testid={`portfolio-title-${index}`}>{project.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600" data-testid={`portfolio-client-${index}`}>{project.client}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed" data-testid={`portfolio-description-${index}`}>{project.description}</p>
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs font-semibold text-green-800 mb-1">Results:</p>
                    <p className="text-xs text-green-700">{project.results}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs" data-testid={`portfolio-tech-${index}-${idx}`}>{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-24 bg-white" data-testid="technologies-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="section-title" data-testid="technologies-title">Technologies We Master</h2>
            <p className="section-description mt-6" data-testid="technologies-description">
              Leveraging cutting-edge technologies to build robust, scalable solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((stack, index) => (
              <Card key={index} className="scroll-reveal" style={{transitionDelay: `${index * 100}ms`}} data-testid={`tech-card-${index}`}>
                <CardHeader>
                  <CardTitle className="text-lg font-bold" data-testid={`tech-category-${index}`}>{stack.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="tech-badge" data-testid={`tech-item-${index}-${idx}`}>{item}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50" data-testid="about-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <h2 className="section-title text-left" data-testid="about-title">About DevAgency</h2>
              <p className="text-gray-600 mt-6 mb-8 leading-relaxed text-lg" data-testid="about-description">
                Founded in 2011, DevAgency has been at the forefront of digital innovation, delivering exceptional web and mobile solutions to clients across 70+ countries. Our team of 50+ expert developers, designers, and strategists work together to transform your vision into reality.
              </p>
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors duration-300">
                    <Award className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1" data-testid="about-point-1-title">Award-Winning Team</h3>
                    <p className="text-sm text-gray-600 leading-relaxed" data-testid="about-point-1-desc">25+ international awards for excellence in design, development, and innovation</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors duration-300">
                    <Users className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1" data-testid="about-point-2-title">Agile Methodology</h3>
                    <p className="text-sm text-gray-600 leading-relaxed" data-testid="about-point-2-desc">Flexible and iterative approach ensuring timely delivery and continuous improvement</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors duration-300">
                    <Globe className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1" data-testid="about-point-3-title">Global Reach</h3>
                    <p className="text-sm text-gray-600 leading-relaxed" data-testid="about-point-3-desc">Certified Google Partner serving clients in 70+ countries worldwide</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative scroll-reveal">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl overflow-hidden shadow-2xl" data-testid="about-image">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800" 
                  alt="Team collaboration" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-3xl font-bold gradient-text">13+</div>
                <div className="text-sm text-gray-600 font-medium">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="section-title" data-testid="testimonials-title">What Our Clients Say</h2>
            <p className="section-description mt-6" data-testid="testimonials-description">
              Don't just take our word for it - hear from our satisfied clients around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.id} className="testimonial-card scroll-reveal" style={{transitionDelay: `${index * 100}ms`}} data-testid={`testimonial-card-${index}`}>
                <CardHeader>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" data-testid={`testimonial-star-${index}-${i}`} />
                    ))}
                  </div>
                  <CardDescription className="text-sm leading-relaxed text-gray-700 relative z-10" data-testid={`testimonial-content-${index}`}>"{testimonial.content}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                      {testimonial.client_name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold" data-testid={`testimonial-name-${index}`}>{testimonial.client_name}</div>
                      <div className="text-sm text-gray-600" data-testid={`testimonial-role-${index}`}>{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 bg-gray-50" data-testid="blog-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="section-title" data-testid="blog-title">Latest Insights</h2>
            <p className="section-description mt-6" data-testid="blog-description">
              Stay updated with the latest trends, tips, and insights from our experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={post.id} className="blog-card scroll-reveal" style={{transitionDelay: `${index * 100}ms`}} data-testid={`blog-card-${index}`}>
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 rounded-t-lg overflow-hidden" data-testid={`blog-image-${index}`}>
                  <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-3 capitalize" data-testid={`blog-category-${index}`}>{post.category.replace('-', ' ')}</Badge>
                  <CardTitle className="text-lg font-bold leading-snug" data-testid={`blog-title-${index}`}>{post.title}</CardTitle>
                  <CardDescription className="text-xs text-gray-500 mt-2" data-testid={`blog-author-${index}`}>By {post.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4" data-testid={`blog-excerpt-${index}`}>{post.excerpt}</p>
                  <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center group">
                    Read More 
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Request Section */}
      <section id="quote" className="py-24 bg-white" data-testid="quote-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="section-title" data-testid="quote-title">Request a Quote</h2>
            <p className="section-description mt-6" data-testid="quote-description">
              Tell us about your project and we'll get back to you with a detailed proposal within 24 hours
            </p>
          </div>

          <Card className="scroll-reveal">
            <CardContent className="pt-8 px-8 pb-8">
              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Name *</label>
                    <Input
                      required
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      placeholder="Your name"
                      className="form-input"
                      data-testid="quote-name-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Email *</label>
                    <Input
                      type="email"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      placeholder="your@email.com"
                      className="form-input"
                      data-testid="quote-email-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Company *</label>
                    <Input
                      required
                      value={quoteForm.company}
                      onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                      placeholder="Company name"
                      className="form-input"
                      data-testid="quote-company-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Phone *</label>
                    <Input
                      required
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      placeholder="+1 234 567 890"
                      className="form-input"
                      data-testid="quote-phone-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Project Type *</label>
                    <Input
                      required
                      value={quoteForm.project_type}
                      onChange={(e) => setQuoteForm({ ...quoteForm, project_type: e.target.value })}
                      placeholder="Web, Mobile, Design, etc."
                      className="form-input"
                      data-testid="quote-project-type-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Budget Range *</label>
                    <Input
                      required
                      value={quoteForm.budget}
                      onChange={(e) => setQuoteForm({ ...quoteForm, budget: e.target.value })}
                      placeholder="$10k - $50k"
                      className="form-input"
                      data-testid="quote-budget-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Timeline *</label>
                  <Input
                    required
                    value={quoteForm.timeline}
                    onChange={(e) => setQuoteForm({ ...quoteForm, timeline: e.target.value })}
                    placeholder="Expected timeline (e.g., 2-3 months)"
                    className="form-input"
                    data-testid="quote-timeline-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Project Description *</label>
                  <Textarea
                    required
                    rows={5}
                    value={quoteForm.description}
                    onChange={(e) => setQuoteForm({ ...quoteForm, description: e.target.value })}
                    placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                    className="form-input"
                    data-testid="quote-description-textarea"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg btn-primary" data-testid="quote-submit-btn">
                  Submit Quote Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50" data-testid="contact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="section-title" data-testid="contact-title">Get In Touch</h2>
            <p className="section-description mt-6" data-testid="contact-description">
              Have a question or want to work together? We'd love to hear from you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="scroll-reveal">
              <CardContent className="pt-8 px-8 pb-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Name *</label>
                    <Input
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Your name"
                      className="form-input"
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Email *</label>
                    <Input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="your@email.com"
                      className="form-input"
                      data-testid="contact-email-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Company</label>
                    <Input
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      placeholder="Company name (optional)"
                      className="form-input"
                      data-testid="contact-company-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Service Interest</label>
                    <Input
                      value={contactForm.service_interest}
                      onChange={(e) => setContactForm({ ...contactForm, service_interest: e.target.value })}
                      placeholder="Web, Mobile, Design, etc."
                      className="form-input"
                      data-testid="contact-service-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Message *</label>
                    <Textarea
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell us about your project..."
                      className="form-input"
                      data-testid="contact-message-textarea"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg btn-primary" data-testid="contact-submit-btn">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8 scroll-reveal">
              <div>
                <h3 className="text-2xl font-bold mb-8" data-testid="contact-info-title">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors duration-300">
                      <Mail className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg" data-testid="contact-email-label">Email</div>
                      <div className="text-gray-600" data-testid="contact-email-value">hello@devagency.com</div>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors duration-300">
                      <Phone className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg" data-testid="contact-phone-label">Phone</div>
                      <div className="text-gray-600" data-testid="contact-phone-value">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors duration-300">
                      <MapPin className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg" data-testid="contact-address-label">Address</div>
                      <div className="text-gray-600" data-testid="contact-address-value">123 Innovation Street, Tech City, TC 12345</div>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors duration-300">
                      <Clock className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">Business Hours</div>
                      <div className="text-gray-600">Mon - Fri: 9AM - 6PM EST</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold mb-4" data-testid="newsletter-title">Subscribe to Our Newsletter</h3>
                <p className="text-gray-600 mb-6 text-sm" data-testid="newsletter-description">Get the latest insights, tips, and updates delivered to your inbox every week</p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 form-input"
                    data-testid="newsletter-email-input"
                  />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 btn-primary" data-testid="newsletter-submit-btn">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-text" data-testid="footer-brand">DevAgency</h3>
              <p className="text-gray-400 text-sm leading-relaxed" data-testid="footer-tagline">
                Transforming ideas into digital excellence since 2011. Building the future, one project at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg" data-testid="footer-services-title">Services</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors" data-testid="footer-service-web">Web Development</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors" data-testid="footer-service-mobile">Mobile Development</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors" data-testid="footer-service-design">UX/UI Design</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors" data-testid="footer-service-marketing">Digital Marketing</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg" data-testid="footer-company-title">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors" data-testid="footer-about">About Us</button></li>
                <li><button onClick={() => scrollToSection("portfolio")} className="hover:text-white transition-colors" data-testid="footer-portfolio">Portfolio</button></li>
                <li><button onClick={() => scrollToSection("blog")} className="hover:text-white transition-colors" data-testid="footer-blog">Blog</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors" data-testid="footer-contact">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg" data-testid="footer-legal-title">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-privacy">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-terms">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-cookies">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400" data-testid="footer-copyright">
            <p>© 2024 DevAgency. All rights reserved. Built with ❤️ by our team.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;