
export interface EmployeeProfile {
  name: string;
  currentRole: string;
  department: string;
  skillsInput: string; // Comma-separated or free text
  certificationsInput: string; // Comma-separated or free text
  interestsInput: string; // Comma-separated or free text
  currentCareerLevel: string;
  aspirationsInput: string; // Free text
}

export interface AnalyzedSkills {
  extractedSkills: string[];
  extractedAspirations: string[];
}

export interface CareerPath {
  id: string; // Unique ID for the path
  title: string;
  description: string;
  requiredSkills: string[];
  skillsToDevelop: string[];
  estimatedTimeToReach: string;
  matchScore: number; // 0-100
  growthPotential: "High" | "Medium" | "Low" | string;
  interestAlignment: "High" | "Medium" | "Low" | string;
}

export interface DevelopmentAction {
  id: string; // Unique ID for the action
  actionType: "Training" | "Mentorship" | "Project Assignment" | "Shadowing" | "Certification" | string;
  description: string;
  suggestedResource: string;
  estimatedEffort: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: Date;
  avatar?: string;
}

export interface SocialMediaLink {
  name: 'blog' | 'linkedin' | 'instagram' | 'github' | 'x' | 'youtube';
  url: string;
  icon: React.ReactNode;
}
