
export const BRAND_CONFIG = {
  brand: {
    organizationShortName: "HERE AND NOW AI",
    organizationLongName: "HERE AND NOW AI - Artificial Intelligence Research Institute",
    website: "https://hereandnowai.com",
    email: "info@hereandnowai.com",
    mobile: "+91 996 296 1000",
    slogan: "designed with passion for innovation",
    colors: {
      primary: "#FFDF00",
      secondary: "#004040"
    },
    logo: {
      title: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png",
      favicon: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/favicon-logo-with-name.png"
    },
    chatbot: {
      avatar: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel.jpeg",
      face: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel-face.jpeg"
    },
    socialMedia: {
      blog: "https://hereandnowai.com/blog",
      linkedin: "https://www.linkedin.com/company/hereandnowai/",
      instagram: "https://instagram.com/hereandnow_ai",
      github: "https://github.com/hereandnowai",
      x: "https://x.com/hereandnow_ai",
      youtube: "https://youtube.com/@hereandnow_ai"
    }
  }
};

// Simplified Role Matrix for Demo
export const MOCK_ROLES = [
  { 
    title: "AI Research Scientist", 
    department: "R&D", 
    description: "Conducts cutting-edge research in AI, develops new algorithms, and publishes findings.",
    skills: ["Machine Learning", "Python", "Deep Learning", "NLP", "TensorFlow/PyTorch", "Research Acumen"] 
  },
  { 
    title: "Software Engineer - AI Platforms", 
    department: "Engineering", 
    description: "Builds and maintains scalable platforms for deploying AI models and applications.",
    skills: ["Python", "Kubernetes", "Docker", "Cloud Platforms (AWS/GCP/Azure)", "API Development", "System Design"] 
  },
  { 
    title: "AI Product Manager", 
    department: "Product", 
    description: "Defines AI product strategy, gathers requirements, and works with engineering to deliver AI-powered solutions.",
    skills: ["Product Strategy", "Agile Methodologies", "User Research", "AI Ethics", "Market Analysis", "Communication"] 
  },
  {
    title: "Data Scientist - Analytics",
    department: "Analytics",
    description: "Analyzes complex datasets to extract insights, build predictive models, and inform business decisions.",
    skills: ["Statistical Analysis", "R/Python", "SQL", "Data Visualization", "Machine Learning Algorithms", "Business Acumen"]
  },
  {
    title: "AI Ethics Officer",
    department: "Legal & Compliance",
    description: "Ensures responsible development and deployment of AI technologies, focusing on fairness, transparency, and accountability.",
    skills: ["AI Ethics Frameworks", "Regulatory Compliance", "Risk Assessment", "Policy Development", "Philosophy of AI", "Communication"]
  }
];

export const GEMINI_TEXT_MODEL = "gemini-2.5-flash-preview-04-17";
// export const GEMINI_IMAGE_MODEL = "imagen-3.0-generate-002"; // Not used in this app

// Ensure API_KEY is accessed via process.env.API_KEY
// The app assumes process.env.API_KEY is set in the environment.
// For local development, you might use a .env file and a bundler like Vite/Create React App
// or set it directly in your shell: export API_KEY="YOUR_API_KEY"
// For this environment, we assume it's globally available.
// DO NOT HARDCODE API KEY HERE.
