/**
 * Vinothkumar V — Personal Portfolio Data Configuration
 * Centralized data source for Full Stack Developer portfolio
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Vinothkumar V",
    firstName: "Vinothkumar",
    lastName: "V",
    role: "Full Stack Developer",
    titles: [
      "Full Stack Developer",
      "Python & Django Specialist",
      "React.js Web Craftsperson",
      "IoT & Embedded Developer",
      "UI/UX & Web Designer"
    ],
    tagline: "Building Secure, Scalable & High-Performance Web Applications & Intelligent Systems",
    bio: "Full Stack Developer skilled in Python, Django, Java, React, SQL, HTML, CSS, JavaScript, Bootstrap, Git, and modern web development technologies. Experienced in developing responsive, secure, and scalable web applications with strong knowledge of database design, REST APIs, and software development principles. Passionate about writing clean, efficient code, solving real-world problems, and continuously learning emerging technologies.",
    location: "Virudhunagar, Tamil Nadu, India",
    email: "vinoth9415@gmail.com",
    phone: "+91 8015969415",
    github: "https://github.com/vinoth9415-coder",
    linkedin: "https://www.linkedin.com/in/vinothkumar-v-60b0b5343",
    portfolioUrl: "https://vinothkumarv.vercel.app",
    stats: [
      { label: "Projects Completed", value: "6+", icon: "fa-rocket" },
      { label: "Tech Stack Mastered", value: "15+", icon: "fa-code" },
      { label: "Hackathon Wins", value: "1st Place", icon: "fa-trophy" },
      { label: "Certifications", value: "4 Earned", icon: "fa-certificate" }
    ]
  },

  skills: [
    {
      category: "Languages",
      icon: "fa-code",
      items: [
        { name: "Python", level: 90, color: "#3776AB", iconClass: "fa-brands fa-python" },
        { name: "Java", level: 80, color: "#ED8B00", iconClass: "fa-brands fa-java" },
        { name: "JavaScript (ES6+)", level: 85, color: "#F7DF1E", iconClass: "fa-brands fa-js" },
        { name: "SQL", level: 82, color: "#00758F", iconClass: "fa-solid fa-database" }
      ]
    },
    {
      category: "Frameworks & Libraries",
      icon: "fa-cubes",
      items: [
        { name: "Django", level: 88, color: "#092E20", iconClass: "fa-solid fa-server" },
        { name: "React.js", level: 85, color: "#61DAFB", iconClass: "fa-brands fa-react" },
        { name: "Bootstrap 5", level: 92, color: "#7952B3", iconClass: "fa-brands fa-bootstrap" },
        { name: "Tailwind CSS", level: 88, color: "#06B6D4", iconClass: "fa-solid fa-wind" }
      ]
    },
    {
      category: "Web Technologies",
      icon: "fa-globe",
      items: [
        { name: "HTML5", level: 95, color: "#E34F26", iconClass: "fa-brands fa-html5" },
        { name: "CSS3", level: 92, color: "#1572B6", iconClass: "fa-brands fa-css3-alt" },
        { name: "REST API Design", level: 86, color: "#00E5FF", iconClass: "fa-solid fa-network-wired" },
        { name: "Responsive Web Design", level: 94, color: "#3B82F6", iconClass: "fa-solid fa-laptop-code" }
      ]
    },
    {
      category: "Databases & Cloud",
      icon: "fa-database",
      items: [
        { name: "MySQL", level: 84, color: "#4479A1", iconClass: "fa-solid fa-database" },
        { name: "Database Design", level: 82, color: "#8B5CF6", iconClass: "fa-solid fa-sitemap" },
        { name: "Oracle Cloud AI", level: 78, color: "#F80000", iconClass: "fa-solid fa-cloud" }
      ]
    },
    {
      category: "Tools & Platforms",
      icon: "fa-wrench",
      items: [
        { name: "Git & GitHub", level: 88, color: "#F05032", iconClass: "fa-brands fa-github" },
        { name: "VS Code", level: 92, color: "#007ACC", iconClass: "fa-solid fa-code" },
        { name: "PyCharm", level: 85, color: "#21D789", iconClass: "fa-solid fa-terminal" },
        { name: "Canva", level: 88, color: "#00C4CC", iconClass: "fa-solid fa-palette" }
      ]
    },
    {
      category: "Design & Hardware",
      icon: "fa-pen-ruler",
      items: [
        { name: "Figma (UI/UX)", level: 82, color: "#F24E1E", iconClass: "fa-brands fa-figma" },
        { name: "DaVinci Resolve", level: 80, color: "#FF5C00", iconClass: "fa-solid fa-video" },
        { name: "Arduino / IoT", level: 85, color: "#00979D", iconClass: "fa-solid fa-microchip" },
        { name: "Problem Solving", level: 90, color: "#00E5FF", iconClass: "fa-solid fa-brain" }
      ]
    }
  ],

  internships: [
    {
      role: "Web Development Intern",
      company: "Techvolt Software",
      location: "Coimbatore, Tamil Nadu",
      period: "May 2024 – July 2024",
      description: "Worked on developing full-stack web applications using Python. Designed user authentication, product catalog management, and online shopping cart functionality for an e-commerce platform.",
      highlights: [
        "Developed Furniture Hub e-commerce website using Python & web technologies.",
        "Implemented secure user authentication and product management modules.",
        "Collaborated on responsive UI design and backend logic integration."
      ]
    }
  ],

  projects: [
    {
      id: "smart-banking",
      title: "Smart Banking System",
      category: "Full Stack / Django",
      subtitle: "Enterprise-grade secure banking application with real-time transaction tracking",
      description: "A comprehensive full-stack banking application built with Django featuring secure user authentication, account management, instant fund transfers, transaction history tracking, and security controls.",
      image: "/assets/images/gateway.png",
      gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))",
      tags: ["Django", "Python", "MySQL", "REST API", "Bootstrap 5", "HTML5/CSS3"],
      github: "https://github.com/vinoth9415-coder/BankingSystem",
      demo: "#",
      featured: true
    },
    {
      id: "furniture-hub",
      title: "Furniture Hub E-Commerce",
      category: "E-Commerce / Python",
      subtitle: "Responsive furniture store platform with cart and checkout integration",
      description: "A feature-rich e-commerce platform designed and built during the internship at Techvolt Software. Includes product browsing, dynamic filtering, shopping cart, customer accounts, and order processing.",
      image: "/assets/images/ecommerce.png",
      gradient: "linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(59, 130, 246, 0.2))",
      tags: ["Python", "Django", "JavaScript", "HTML5/CSS3", "Bootstrap", "MySQL"],
      github: "https://github.com/vinoth9415-coder/Furnitureshop",
      demo: "#",
      featured: true
    },
    {
      id: "college-magazine",
      title: "College Magazine Project",
      category: "Design & Publishing / UI",
      subtitle: "Official RIT College Magazine design, layout architecture, and digital publishing",
      description: "Designed and published the official Ramco Institute of Technology college magazine. Created creative editorial layouts, typography systems, vector graphic assets, cover art, and digital publication media.",
      image: "/assets/images/analytics.png",
      gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))",
      tags: ["Canva", "Figma", "Editorial Design", "UI/UX", "Typography", "Digital Publishing"],
      github: "https://github.com/vinoth9415-coder/Magazine",
      demo: "https://github.com/vinoth9415-coder",
      featured: true
    },
    {
      id: "line-follower-robot",
      title: "IoT Line Follower Robot",
      category: "Robotics / IoT",
      subtitle: "Autonomous path-finding line follower robot engineered with Arduino",
      description: "Built an autonomous line-following robot using Arduino microcontroller hardware and infrared (IR) sensor arrays for real-time line detection, differential drive motor navigation, and obstacle awareness.",
      image: "/assets/images/order-system.png",
      gradient: "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))",
      tags: ["Arduino", "C++", "IR Sensors", "Motor Driver", "IoT", "Robotics"],
      github: "https://github.com/vinoth9415-coder/Line-Follower-Robot",
      demo: "#",
      featured: true
    }
  ],

  education: [
    {
      degree: "B.Tech in Computer Science and Business Systems (CSBS)",
      institution: "Ramco Institute of Technology, Rajapalayam",
      period: "2023 – 2027",
      grade: "CGPA: 6.50",
      description: "Specializing in Computer Science core fundamentals, Data Structures, Algorithms, Software Engineering, Database Systems, Business Systems, and Modern Web Application Architectures."
    },
    {
      degree: "Higher Secondary Education (12th Grade)",
      institution: "Sri Sowdambika Convent Matriculation Higher Secondary School",
      period: "2022 – 2023",
      grade: "Percentage: 57.17%",
      description: "Completed Higher Secondary Education focusing on Mathematics, Physics, Chemistry, and Computer Science."
    }
  ],

  certifications: [
    {
      title: "Foundations: Data, Data, Everywhere",
      issuer: "Google",
      year: "2024",
      icon: "fa-brands fa-google",
      color: "#4285F4",
      badge: "Analytics"
    },
    {
      title: "Cloud AI Foundation Associate",
      issuer: "Oracle",
      year: "2024",
      icon: "fa-solid fa-cloud",
      color: "#F80000",
      badge: "Cloud AI"
    },
    {
      title: "Blockchain Foundation",
      issuer: "Kerala Blockchain Academy",
      year: "2024",
      icon: "fa-solid fa-link",
      color: "#8B5CF6",
      badge: "Web3"
    },
    {
      title: "Project – HR Plan for a Start-up!",
      issuer: "Infosys",
      year: "2026",
      icon: "fa-solid fa-building-user",
      color: "#007CC3",
      badge: "Enterprise Project"
    }
  ],

  achievements: [
    {
      title: "Winner – Cybersecurity Hackathon",
      detail: "Secured 1st place in a competitive Cybersecurity Hackathon, demonstrating exceptional problem-solving skills, vulnerability identification, and security concept applications.",
      icon: "fa-trophy",
      highlight: "1st Place Winner"
    },
    {
      title: "Official College Magazine Designer & Publisher",
      detail: "Conceptualized, designed, formatted, and published the official college magazine utilizing graphic design tools like Figma and Canva.",
      icon: "fa-newspaper",
      highlight: "Published Lead Designer"
    }
  ],

  services: [
    {
      title: "Frontend Web Development",
      description: "Crafting highly responsive, interactive, and visually captivating frontend web interfaces using HTML5, CSS3, JavaScript, React.js, and modern CSS frameworks.",
      icon: "fa-laptop-code",
      accent: "#00E5FF"
    },
    {
      title: "Full Stack Web Engineering",
      description: "Building robust web solutions using Python and Django backend APIs integrated seamlessly with modern responsive frontend components and SQL databases.",
      icon: "fa-layer-group",
      accent: "#3B82F6"
    },
    {
      title: "Responsive Web & UI Design",
      description: "Designing sleek mobile-first websites with smooth grid layouts, dark mode themes, glassmorphism UI components, custom typography, and fluid micro-interactions.",
      icon: "fa-mobile-screen-button",
      accent: "#8B5CF6"
    },
    {
      title: "React Application Development",
      description: "Building high-performance single page applications (SPAs) with state management, modular components, smooth page transitions, and interactive animations.",
      icon: "fa-brands fa-react",
      accent: "#61DAFB"
    },
    {
      title: "Personal Portfolio & Landing Pages",
      description: "Creating award-winning, Awwwards-style developer portfolios, agency landing pages, and interactive product showcases optimized for maximum engagement.",
      icon: "fa-wand-magic-sparkles",
      accent: "#EC4899"
    },
    {
      title: "IoT & Embedded System Prototyping",
      description: "Prototyping microcontroller hardware projects using Arduino, IR sensor arrays, motor controllers, and sensor telemetry systems for real-time automation.",
      icon: "fa-microchip",
      accent: "#10B981"
    }
  ]
};

if (typeof window !== 'undefined') {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
