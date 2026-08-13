export const sampleResume = {
  personalInfo: {
    fullName: "Alex Morgan",
    jobTitle: "Senior Full-Stack Engineer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "alexmorgan.dev",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    summary: "Results-driven Senior Full-Stack Engineer with 7+ years of experience crafting high-performance web applications, scalable cloud microservices, and modern frontend platforms. Proven track record leading agile engineering teams, improving user engagement by 40%, and maintaining 99.99% system reliability."
  },
  experience: [
    {
      id: "exp-1",
      title: "Senior Full-Stack Engineer",
      company: "Apex Tech Labs",
      location: "San Francisco, CA",
      startDate: "2021-03",
      endDate: "",
      current: true,
      highlights: [
        "Architected and deployed a multi-tenant React dashboard serving 250,000+ monthly active enterprise users.",
        "Engineered real-time data streaming backend with Node.js, WebSockets, and Redis, reducing latency by 65%.",
        "Led a cross-functional squad of 8 engineers and introduced automated CI/CD pipelines reducing deployment time by 50%."
      ]
    },
    {
      id: "exp-2",
      title: "Software Engineer",
      company: "CloudScale Systems",
      location: "Austin, TX",
      startDate: "2018-06",
      endDate: "2021-02",
      current: false,
      highlights: [
        "Developed responsive frontend modules using TypeScript and Tailwind CSS with 98% test coverage.",
        "Refactored legacy REST APIs to GraphQL, cutting frontend payload sizes by 40%.",
        "Collaborated closely with UX designers to build an accessible design system conforming to WCAG AA standards."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2014-08",
      endDate: "2018-05",
      gpa: "3.8 / 4.0",
      honors: "Magna Cum Laude"
    }
  ],
  skills: [
    {
      id: "sk-1",
      category: "Frontend",
      items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux Toolkit", "HTML5/CSS3"]
    },
    {
      id: "sk-2",
      category: "Backend & Databases",
      items: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "GraphQL", "Redis"]
    },
    {
      id: "sk-3",
      category: "DevOps & Tools",
      items: ["AWS (S3, EC2)", "Docker", "Git", "GitHub Actions", "Jest", "Vite"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "DevPulse Analytics Platform",
      role: "Creator & Maintainer",
      link: "https://devpulse.io",
      description: "An open-source developer metrics dashboard analyzing GitHub repository commit velocity and PR throughput.",
      technologies: ["React", "TypeScript", "Node.js", "GraphQL", "Chart.js"]
    },
    {
      id: "proj-2",
      name: "SwiftDoc AI Assistant",
      role: "Lead Developer",
      link: "https://swiftdoc.app",
      description: "Client-side document summarization tool utilizing web workers and offline browser storage.",
      technologies: ["React", "Web Workers", "IndexedDB", "Tailwind CSS"]
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023"
    },
    {
      id: "cert-2",
      name: "Meta Certified Professional Frontend Developer",
      issuer: "Meta",
      date: "2022"
    }
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native / Native" },
    { id: "lang-2", name: "Spanish", proficiency: "Professional Working" }
  ]
};

export const defaultStyleSettings = {
  template: "modern", // "modern" | "executive" | "creative"
  fontFamily: "Inter", // "Inter" | "Outfit" | "Playfair Display" | "Fira Code" | "Roboto"
  accentColor: "#2563eb", // hex code
  fontSize: "medium", // "small" | "medium" | "large"
  spacing: "normal", // "compact" | "normal" | "spacious"
  showPhoto: true
};
