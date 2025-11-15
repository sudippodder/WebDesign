import { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Menu, X, ArrowRight, CheckCircle, Code, Smartphone, Palette, TrendingUp, Cpu, Mail, Phone, MapPin, Star, ChevronRight } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [contactForm, setContactForm] = useState({ name: "", email: "", company: "", phone: "", message: "", service_interest: "" });
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", company: "", phone: "", project_type: "", budget: "", timeline: "", description: "" });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    fetchProjects();
    fetchTestimonials();
    fetchBlogPosts();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API}/projects?featured=true`);
      setProjects(response.data.slice(0, 6));
    } catch (e) {
      console.error("Error fetching projects:", e);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${API}/testimonials`);
      setTestimonials(response.data.slice(0, 6));
    } catch (e) {
      console.error("Error fetching testimonials:", e);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog`);
      setBlogPosts(response.data.slice(0, 3));
    } catch (e) {
      console.error("Error fetching blog posts:", e);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/contacts`, contactForm);
      toast.success("Thank you! We'll get back to you soon.");
      setContactForm({ name: "", email: "", company: "", phone: "", message: "", service_interest: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/quotes`, quoteForm);
      toast.success("Quote request submitted successfully!");
      setQuoteForm({ name: "", email: "", company: "", phone: "", project_type: "", budget: "", timeline: "", description: "" });
    } catch (error) {
      toast.error("Failed to submit quote request. Please try again.");
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/newsletter`, { email: newsletterEmail });
      toast.success("Successfully subscribed to newsletter!");
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
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description: "Custom web applications, CMS solutions, e-commerce platforms using MEAN/MERN stack, PHP frameworks, and modern technologies.",
      technologies: ["React", "Node.js", "Python", "PHP", "MongoDB"]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for Android and iOS using React Native, Flutter, and native technologies.",
      technologies: ["React Native", "Flutter", "iOS", "Android", "Xamarin"]
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UX/UI Design",
      description: "User-centered design solutions including wireframing, prototyping, user research, and interactive design that engages users.",
      technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Digital Marketing",
      description: "Comprehensive digital marketing services including SEO, inbound marketing, email campaigns, and social media strategy.",
      technologies: ["SEO", "Google Ads", "Social Media", "Email Marketing", "Analytics"]
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Emerging Technologies",
      description: "Cutting-edge solutions in IoT, AI chatbots, AR/VR experiences, and Big Data analytics to future-proof your business.",
      technologies: ["IoT", "AI/ML", "AR/VR", "Blockchain", "Big Data"]
    }
  ];

  const techStack = [
    { category: "Frontend", items: ["React", "Angular", "Vue.js", "Next.js", "TypeScript"] },
    { category: "Backend", items: ["Node.js", "Python", "PHP", "Java", ".NET"] },
    { category: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin", "Xamarin"] },
    { category: "Database", items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"] },
    { category: "Cloud", items: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"] },
    { category: "CMS", items: ["WordPress", "Drupal", "Contentful", "Strapi", "Sanity"] }
  ];

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent" data-testid="logo">DevAgency</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection("home")} className="nav-link" data-testid="nav-home">Home</button>
              <button onClick={() => scrollToSection("services")} className="nav-link" data-testid="nav-services">Services</button>
              <button onClick={() => scrollToSection("portfolio")} className="nav-link" data-testid="nav-portfolio">Portfolio</button>
              <button onClick={() => scrollToSection("about")} className="nav-link" data-testid="nav-about">About</button>
              <button onClick={() => scrollToSection("blog")} className="nav-link" data-testid="nav-blog">Blog</button>
              <button onClick={() => scrollToSection("contact")} className="nav-link" data-testid="nav-contact">Contact</button>
            </div>

            <div className="hidden md:block">
              <Button onClick={() => scrollToSection("quote")} className="bg-blue-600 hover:bg-blue-700" data-testid="nav-quote-btn">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" data-testid="hero-title">
              Transforming Ideas Into
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto" data-testid="hero-description">
              Award-winning web & mobile development agency delivering innovative solutions across 70+ countries since 2011.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection("contact")} className="bg-blue-600 hover:bg-blue-700 text-white px-8" data-testid="hero-cta-primary">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("portfolio")} className="border-blue-600 text-blue-600 hover:bg-blue-50" data-testid="hero-cta-secondary">
                View Our Work
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center" data-testid="trust-indicators">
            <div>
              <div className="text-3xl font-bold text-blue-600" data-testid="stat-projects">500+</div>
              <div className="text-sm text-gray-600">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600" data-testid="stat-countries">70+</div>
              <div className="text-sm text-gray-600">Countries Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600" data-testid="stat-awards">25+</div>
              <div className="text-sm text-gray-600">International Awards</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600" data-testid="stat-years">13+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title" data-testid="services-title">Our Services</h2>
            <p className="section-description" data-testid="services-description">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="service-card" data-testid={`service-card-${index}`}>
                <CardHeader>
                  <div className="mb-4 text-blue-600" data-testid={`service-icon-${index}`}>{service.icon}</div>
                  <CardTitle className="text-xl mb-2" data-testid={`service-title-${index}`}>{service.title}</CardTitle>
                  <CardDescription className="text-sm" data-testid={`service-description-${index}`}>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs" data-testid={`service-tech-${index}-${idx}`}>{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20" data-testid="portfolio-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title" data-testid="portfolio-title">Our Work</h2>
            <p className="section-description" data-testid="portfolio-description">
              Showcasing our best projects and success stories
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={project.id} className="portfolio-card" data-testid={`portfolio-card-${index}`}>
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 rounded-t-lg" data-testid={`portfolio-image-${index}`}>
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover rounded-t-lg" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge data-testid={`portfolio-category-${index}`}>{project.category}</Badge>
                    </div>
                    <CardTitle className="text-lg" data-testid={`portfolio-title-${index}`}>{project.title}</CardTitle>
                    <CardDescription className="text-sm" data-testid={`portfolio-client-${index}`}>{project.client}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4" data-testid={`portfolio-description-${index}`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs" data-testid={`portfolio-tech-${index}-${idx}`}>{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500" data-testid="portfolio-empty">
              Portfolio projects will appear here
            </div>
          )}
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 bg-gray-50" data-testid="technologies-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title" data-testid="technologies-title">Technologies We Master</h2>
            <p className="section-description" data-testid="technologies-description">
              Leveraging cutting-edge technologies to build robust solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((stack, index) => (
              <Card key={index} data-testid={`tech-card-${index}`}>
                <CardHeader>
                  <CardTitle className="text-lg" data-testid={`tech-category-${index}`}>{stack.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item, idx) => (
                      <Badge key={idx} variant="secondary" data-testid={`tech-item-${index}-${idx}`}>{item}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20" data-testid="about-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-left" data-testid="about-title">About DevAgency</h2>
              <p className="text-gray-600 mb-6" data-testid="about-description">
                Founded in 2011, DevAgency has been at the forefront of digital innovation, delivering exceptional web and mobile solutions to clients across 70+ countries. Our team of expert developers, designers, and strategists work together to transform your vision into reality.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1" data-testid="about-point-1-title">Award-Winning Team</h3>
                    <p className="text-sm text-gray-600" data-testid="about-point-1-desc">25+ international awards for excellence in design and development</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1" data-testid="about-point-2-title">Agile Methodology</h3>
                    <p className="text-sm text-gray-600" data-testid="about-point-2-desc">Flexible and iterative approach ensuring timely delivery</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1" data-testid="about-point-3-title">Google Partner</h3>
                    <p className="text-sm text-gray-600" data-testid="about-point-3-desc">Certified Google partner with proven expertise</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl" data-testid="about-image">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600" 
                  alt="Team collaboration" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title" data-testid="testimonials-title">What Our Clients Say</h2>
            <p className="section-description" data-testid="testimonials-description">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={testimonial.id} data-testid={`testimonial-card-${index}`}>
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" data-testid={`testimonial-star-${index}-${i}`} />
                      ))}
                    </div>
                    <CardDescription className="text-sm" data-testid={`testimonial-content-${index}`}>"{testimonial.content}"</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <div className="font-semibold" data-testid={`testimonial-name-${index}`}>{testimonial.client_name}</div>
                      <div className="text-sm text-gray-600" data-testid={`testimonial-role-${index}`}>{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500" data-testid="testimonials-empty">
              Client testimonials will appear here
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20" data-testid="blog-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title" data-testid="blog-title">Latest Insights</h2>
            <p className="section-description" data-testid="blog-description">
              Stay updated with the latest trends in web and mobile development
            </p>
          </div>

          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Card key={post.id} className="blog-card" data-testid={`blog-card-${index}`}>
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 rounded-t-lg" data-testid={`blog-image-${index}`}>
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover rounded-t-lg" />
                  </div>
                  <CardHeader>
                    <Badge className="w-fit mb-2" data-testid={`blog-category-${index}`}>{post.category}</Badge>
                    <CardTitle className="text-lg" data-testid={`blog-title-${index}`}>{post.title}</CardTitle>
                    <CardDescription className="text-sm" data-testid={`blog-author-${index}`}>By {post.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600" data-testid={`blog-excerpt-${index}`}>{post.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500" data-testid="blog-empty">
              Blog posts will appear here
            </div>
          )}
        </div>
      </section>

      {/* Quote Request Section */}
      <section id="quote" className="py-20 bg-gray-50" data-testid="quote-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title" data-testid="quote-title">Request a Quote</h2>
            <p className="section-description" data-testid="quote-description">
              Tell us about your project and we'll get back to you with a detailed proposal
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <Input
                      required
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      placeholder="Your name"
                      data-testid="quote-name-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      placeholder="your@email.com"
                      data-testid="quote-email-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company *</label>
                    <Input
                      required
                      value={quoteForm.company}
                      onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                      placeholder="Company name"
                      data-testid="quote-company-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <Input
                      required
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      placeholder="+1 234 567 890"
                      data-testid="quote-phone-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Type *</label>
                    <Input
                      required
                      value={quoteForm.project_type}
                      onChange={(e) => setQuoteForm({ ...quoteForm, project_type: e.target.value })}
                      placeholder="Web, Mobile, Design, etc."
                      data-testid="quote-project-type-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range *</label>
                    <Input
                      required
                      value={quoteForm.budget}
                      onChange={(e) => setQuoteForm({ ...quoteForm, budget: e.target.value })}
                      placeholder="$10k - $50k"
                      data-testid="quote-budget-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Timeline *</label>
                  <Input
                    required
                    value={quoteForm.timeline}
                    onChange={(e) => setQuoteForm({ ...quoteForm, timeline: e.target.value })}
                    placeholder="Expected timeline"
                    data-testid="quote-timeline-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Project Description *</label>
                  <Textarea
                    required
                    rows={5}
                    value={quoteForm.description}
                    onChange={(e) => setQuoteForm({ ...quoteForm, description: e.target.value })}
                    placeholder="Tell us about your project..."
                    data-testid="quote-description-textarea"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" data-testid="quote-submit-btn">
                  Submit Quote Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20" data-testid="contact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title" data-testid="contact-title">Get In Touch</h2>
            <p className="section-description" data-testid="contact-description">
              Have a question or want to work together? We'd love to hear from you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <Input
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Your name"
                        data-testid="contact-name-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="your@email.com"
                        data-testid="contact-email-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Company</label>
                      <Input
                        value={contactForm.company}
                        onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                        placeholder="Company name (optional)"
                        data-testid="contact-company-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Service Interest</label>
                      <Input
                        value={contactForm.service_interest}
                        onChange={(e) => setContactForm({ ...contactForm, service_interest: e.target.value })}
                        placeholder="Web, Mobile, Design, etc."
                        data-testid="contact-service-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <Textarea
                        required
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell us about your project..."
                        data-testid="contact-message-textarea"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" data-testid="contact-submit-btn">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-6" data-testid="contact-info-title">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <div className="font-medium" data-testid="contact-email-label">Email</div>
                      <div className="text-gray-600" data-testid="contact-email-value">hello@devagency.com</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <div className="font-medium" data-testid="contact-phone-label">Phone</div>
                      <div className="text-gray-600" data-testid="contact-phone-value">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <div className="font-medium" data-testid="contact-address-label">Address</div>
                      <div className="text-gray-600" data-testid="contact-address-value">123 Innovation Street, Tech City, TC 12345</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4" data-testid="newsletter-title">Subscribe to Our Newsletter</h3>
                <p className="text-gray-600 mb-4" data-testid="newsletter-description">Get the latest insights and updates delivered to your inbox</p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1"
                    data-testid="newsletter-email-input"
                  />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700" data-testid="newsletter-submit-btn">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4" data-testid="footer-brand">DevAgency</h3>
              <p className="text-gray-400 text-sm" data-testid="footer-tagline">
                Transforming ideas into digital excellence since 2011.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4" data-testid="footer-services-title">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white" data-testid="footer-service-web">Web Development</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white" data-testid="footer-service-mobile">Mobile Development</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white" data-testid="footer-service-design">UX/UI Design</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white" data-testid="footer-service-marketing">Digital Marketing</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" data-testid="footer-company-title">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection("about")} className="hover:text-white" data-testid="footer-about">About Us</button></li>
                <li><button onClick={() => scrollToSection("portfolio")} className="hover:text-white" data-testid="footer-portfolio">Portfolio</button></li>
                <li><button onClick={() => scrollToSection("blog")} className="hover:text-white" data-testid="footer-blog">Blog</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="hover:text-white" data-testid="footer-contact">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" data-testid="footer-legal-title">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white" data-testid="footer-privacy">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white" data-testid="footer-terms">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white" data-testid="footer-cookies">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400" data-testid="footer-copyright">
            <p>© 2024 DevAgency. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;